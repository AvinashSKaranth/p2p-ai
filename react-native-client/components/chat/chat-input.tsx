import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
    Alert,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AttachmentBar } from "@/components/chat/attachment-bar";
import type { Attachment } from "@/types/chat";

interface ChatInputProps {
  onSend: (text: string, attachments: Attachment[]) => void;
  disabled?: boolean;
  colors: { text: string; background: string; tint: string; icon: string };
}

let idCounter = 0;
function nextId() {
  return `att-${Date.now()}-${idCounter++}`;
}

export function ChatInput({ onSend, disabled, colors }: ChatInputProps) {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setAttachments((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "image",
          uri: asset.uri,
          name: asset.fileName ?? "image.jpg",
        },
      ]);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      try {
        await recordingRef.current?.stopAndUnloadAsync();
        const uri = recordingRef.current?.getURI();
        if (uri) {
          setAttachments((prev) => [
            ...prev,
            { id: nextId(), type: "audio", uri, name: "recording.m4a" },
          ]);
        }
      } catch (e) {
        console.warn("Failed to stop recording", e);
      }
      recordingRef.current = null;
      setIsRecording(false);
    } else {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            "Permission required",
            "Microphone access is needed to record audio.",
          );
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        recordingRef.current = recording;
        setIsRecording(true);
      } catch (e) {
        console.warn("Failed to start recording", e);
      }
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;
    onSend(trimmed, attachments);
    setText("");
    setAttachments([]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const canSend = text.trim().length > 0 || attachments.length > 0;

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderTopColor: colors.icon + "30",
          paddingBottom: insets.bottom || 8,
        },
      ]}
    >
      <AttachmentBar attachments={attachments} onRemove={removeAttachment} />
      <View style={styles.row}>
        <Pressable
          onPress={pickImage}
          style={styles.iconBtn}
          accessibilityLabel="Attach image"
          accessibilityRole="button"
        >
          <Ionicons name="image-outline" size={24} color={colors.icon} />
        </Pressable>

        <Pressable
          onPress={toggleRecording}
          style={styles.iconBtn}
          accessibilityLabel={isRecording ? "Stop recording" : "Record audio"}
          accessibilityRole="button"
        >
          <Ionicons
            name={isRecording ? "stop-circle" : "mic-outline"}
            size={24}
            color={isRecording ? "#ff4444" : colors.icon}
          />
        </Pressable>

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.background,
              borderColor: colors.icon + "40",
            },
          ]}
          value={text}
          onChangeText={setText}
          placeholder="Message Gemma 4..."
          placeholderTextColor={colors.icon}
          multiline
          maxLength={4096}
          editable={!disabled}
          onSubmitEditing={Platform.OS === "web" ? handleSend : undefined}
          accessibilityLabel="Message input"
        />

        <Pressable
          onPress={handleSend}
          disabled={disabled || !canSend}
          style={[
            styles.sendBtn,
            {
              backgroundColor:
                canSend && !disabled ? colors.tint : colors.icon + "30",
            },
          ]}
          accessibilityLabel="Send message"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-up" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
  },
  iconBtn: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    maxHeight: 120,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
