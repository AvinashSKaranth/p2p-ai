import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { MarkdownText } from "@/components/chat/markdown-text";
import { ThemedText } from "@/components/themed-text";
import type { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  colors: { text: string; background: string; tint: string };
}

export function MessageBubble({ message, colors }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.bubbleUser, { backgroundColor: colors.tint }]
            : [
                styles.bubbleAssistant,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.tint + "30",
                },
              ],
        ]}
      >
        {message.attachments.map((att) => (
          <View key={att.id} style={styles.attachmentContainer}>
            {att.type === "image" && (
              <Image
                source={{ uri: att.uri }}
                style={styles.attachmentImage}
                contentFit="cover"
              />
            )}
            {att.type === "audio" && (
              <View
                style={[
                  styles.audioTag,
                  { backgroundColor: colors.tint + "20" },
                ]}
              >
                <ThemedText style={styles.audioTagText}>
                  🎤 {att.name}
                </ThemedText>
              </View>
            )}
          </View>
        ))}
        {message.text.length > 0 &&
          (isUser ? (
            <ThemedText style={[styles.messageText, { color: "#fff" }]}>
              {message.text}
            </ThemedText>
          ) : (
            <MarkdownText style={styles.messageText} color={colors.text}>
              {message.text}
            </MarkdownText>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
  },
  bubbleUser: {
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  attachmentContainer: {
    marginBottom: 8,
  },
  attachmentImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  audioTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  audioTagText: {
    fontSize: 13,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
});
