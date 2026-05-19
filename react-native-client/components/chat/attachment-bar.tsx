import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import type { Attachment } from "@/types/chat";

interface AttachmentBarProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

export function AttachmentBar({ attachments, onRemove }: AttachmentBarProps) {
  if (attachments.length === 0) return null;

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {attachments.map((att) => (
        <View key={att.id} style={styles.chip}>
          {att.type === "image" && (
            <Image
              source={{ uri: att.uri }}
              style={styles.thumbnail}
              contentFit="cover"
            />
          )}
          {att.type === "audio" && (
            <View style={styles.audioChip}>
              <ThemedText style={styles.audioText}>🎤</ThemedText>
            </View>
          )}
          <Pressable
            style={styles.removeBtn}
            onPress={() => onRemove(att.id)}
            accessibilityLabel={`Remove ${att.type} attachment`}
            accessibilityRole="button"
          >
            <ThemedText style={styles.removeBtnText}>✕</ThemedText>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chip: {
    marginRight: 8,
    position: "relative",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  audioChip: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  audioText: {
    fontSize: 24,
  },
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#ff4444",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
