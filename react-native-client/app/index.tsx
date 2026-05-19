import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    View,
} from "react-native";

import { ChatInput } from "@/components/chat/chat-input";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ModelMenu } from "@/components/chat/model-menu";
import { ModelProgressOverlay } from "@/components/chat/model-progress-overlay";
import { StatusBar } from "@/components/chat/status-bar";
import { ThemedText } from "@/components/themed-text";
import { useLLM } from "@/hooks/use-llm";
import { useP2P } from "@/hooks/use-p2p";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { Attachment, ChatMessage } from "@/types/chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const llm = useLLM();
  const p2p = useP2P(
    llm.status,
    llm.status === "ready"
      ? (text, onToken) =>
          new Promise((resolve) => {
            llm.sendMessageStreaming(text, (token, done) => {
              onToken(token, done);
              if (done) resolve();
            });
          })
      : undefined,
  );

  const colors = {
    text: useThemeColor({}, "text"),
    background: useThemeColor({}, "background"),
    tint: useThemeColor({}, "tint"),
    icon: useThemeColor({}, "icon"),
  };

  const scrollToEnd = useCallback(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const handleStop = useCallback(() => {
    llm.stopGeneration();
  }, [llm]);

  const sendMessage = useCallback(
    async (text: string, attachments: Attachment[]) => {
      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        text,
        attachments,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      scrollToEnd();
      setIsGenerating(true);
      setStreamingText("");
      llm.stopRequestedRef.current = false;

      try {
        let responseText = "";

        if (llm.status === "ready") {
          const hasImage = attachments.find((a) => a.type === "image");
          const hasAudio = attachments.find((a) => a.type === "audio");

          if (hasImage && llm.isMultimodalSupported) {
            responseText = await llm.sendMessageWithImage(
              text || "Describe this image.",
              hasImage.uri,
            );
          } else if (hasAudio && llm.isMultimodalSupported) {
            responseText = await llm.sendMessageWithAudio(
              text || "Transcribe this audio.",
              hasAudio.uri,
            );
          } else {
            responseText = await new Promise<string>((resolve) => {
              let accumulated = "";
              llm.sendMessageStreaming(text, (token, done) => {
                if (llm.stopRequestedRef.current) {
                  resolve(accumulated || "(stopped)");
                  return;
                }
                accumulated += token;
                setStreamingText(accumulated);
                scrollToEnd();
                if (done) resolve(accumulated);
              });
            });
          }
        } else {
          // P2P requester mode
          responseText = await new Promise<string>((resolve, reject) => {
            let accumulated = "";
            p2p.sendTask(
              text,
              "other",
              (token) => {
                accumulated += token;
                setStreamingText(accumulated);
                scrollToEnd();
              },
              () => {
                resolve(accumulated || "(no response)");
              },
              (err) => {
                reject(new Error(err));
              },
            );
          });
        }

        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now()}-resp`,
          role: "assistant",
          text: responseText,
          attachments: [],
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        scrollToEnd();
      } catch (err: any) {
        const errMsg: ChatMessage = {
          id: `msg-${Date.now()}-err`,
          role: "assistant",
          text: `Error: ${err?.message ?? "Something went wrong"}`,
          attachments: [],
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsGenerating(false);
        setStreamingText("");
      }
    },
    [scrollToEnd, llm, p2p],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    llm.resetConversation();
  }, [llm]);

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => (
      <MessageBubble message={item} colors={colors} />
    ),
    [colors],
  );

  const displayMessages: ChatMessage[] =
    isGenerating && streamingText
      ? [
          ...messages,
          {
            id: "streaming",
            role: "assistant",
            text: streamingText,
            attachments: [],
            timestamp: Date.now(),
          },
        ]
      : messages;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Gemma 4 Chat",
          headerRight: () => (
            <ModelMenu
              status={llm.status}
              downloadProgress={llm.downloadProgress}
              error={llm.error}
              activeBackend={llm.activeBackend}
              onDownload={llm.downloadModel}
              onLoadCPU={() => llm.loadModel("cpu")}
              onLoadGPU={() => llm.loadModel("gpu")}
              onDelete={llm.deleteModel}
              colors={colors}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 24}
      >
        <StatusBar
          peerId={p2p.peerId}
          status={p2p.status}
          mode={p2p.mode}
          providerCount={p2p.providerCount}
          heartbeatTime={p2p.heartbeatTime}
        />
        <View style={styles.content}>
          {displayMessages.length === 0 ? (
            <View style={styles.empty}>
              <ThemedText style={styles.emptyIcon}>✦</ThemedText>
              <ThemedText style={styles.emptyTitle}>Gemma 4 E2B</ThemedText>
              <ThemedText
                style={[styles.emptySubtitle, { color: colors.icon }]}
              >
                Send text, images, or audio
              </ThemedText>
              {llm.status !== "ready" && (
                <ThemedText style={[styles.emptyHint, { color: colors.icon }]}>
                  Tap the chip icon in the header to load the model
                </ThemedText>
              )}
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={displayMessages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              onContentSizeChange={scrollToEnd}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
            />
          )}

          {isGenerating && !streamingText && (
            <View style={styles.typingRow}>
              <ThemedText style={[styles.typingText, { color: colors.icon }]}>
                Gemma is thinking...
              </ThemedText>
            </View>
          )}
        </View>

        {/* Floating stop button while generating */}
        {isGenerating && (
          <View style={styles.stopRow}>
            <Pressable
              onPress={handleStop}
              style={[styles.stopBtn, { backgroundColor: colors.tint }]}
              accessibilityLabel="Stop generating"
              accessibilityRole="button"
            >
              <Ionicons name="stop" size={14} color="#fff" />
              <ThemedText style={styles.stopBtnText}>Stop</ThemedText>
            </Pressable>
          </View>
        )}

        <ChatInput
          onSend={sendMessage}
          disabled={isGenerating}
          colors={colors}
        />

        {messages.length > 0 && !isGenerating && (
          <Pressable
            style={[styles.clearBtn, { backgroundColor: colors.icon + "20" }]}
            onPress={clearChat}
            accessibilityLabel="Clear chat"
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={16} color={colors.icon} />
          </Pressable>
        )}

        <ModelProgressOverlay
          status={llm.status}
          downloadProgress={llm.downloadProgress}
          error={llm.error}
          colors={colors}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  emptySubtitle: {
    fontSize: 15,
  },
  emptyHint: {
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  typingRow: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  typingText: {
    fontSize: 13,
    fontStyle: "italic",
  },
  stopRow: {
    alignItems: "center",
    paddingVertical: 6,
  },
  stopBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stopBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  clearBtn: {
    position: "absolute",
    top: 8,
    right: 12,
    padding: 8,
    borderRadius: 20,
  },
});
