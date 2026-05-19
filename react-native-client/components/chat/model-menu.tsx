import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import type { LLMStatus } from "@/hooks/use-llm";

interface ModelMenuProps {
  status: LLMStatus;
  downloadProgress: number;
  error: string | null;
  activeBackend: "cpu" | "gpu" | null;
  onDownload: () => void;
  onLoadCPU: () => void;
  onLoadGPU: () => void;
  onDelete: () => void;
  colors: { text: string; background: string; tint: string; icon: string };
}

export function ModelMenu({
  status,
  downloadProgress,
  error,
  activeBackend,
  onDownload,
  onLoadCPU,
  onLoadGPU,
  onDelete,
  colors,
}: ModelMenuProps) {
  const [visible, setVisible] = useState(false);

  const statusLabel: Record<LLMStatus, string> = {
    idle: "⚪ Not loaded",
    downloading: `⬇️ Downloading ${Math.round(downloadProgress * 100)}%`,
    loading: "⏳ Loading model...",
    ready: `🟢 Ready (${activeBackend?.toUpperCase() ?? "CPU"})`,
    error: "🔴 Error",
  };

  const isBusy = status === "downloading" || status === "loading";

  const act = (fn: () => void) => {
    fn();
    setVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={styles.headerBtn}
        accessibilityLabel="Model menu"
        accessibilityRole="button"
      >
        <Ionicons
          name="hardware-chip-outline"
          size={22}
          color={status === "ready" ? "#34C759" : colors.tint}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <Pressable
            style={[styles.menu, { backgroundColor: colors.background }]}
          >
            <ThemedText style={styles.title}>Gemma 4 E2B</ThemedText>
            <ThemedText style={[styles.statusText, { color: colors.icon }]}>
              {statusLabel[status]}
            </ThemedText>

            {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

            {isBusy && downloadProgress > 0 && downloadProgress < 1 && (
              <View style={styles.progressBarOuter}>
                <View
                  style={[
                    styles.progressBarInner,
                    {
                      width: `${Math.round(downloadProgress * 100)}%`,
                      backgroundColor: colors.tint,
                    },
                  ]}
                />
              </View>
            )}

            <View style={styles.actions}>
              <MenuItem
                icon="cloud-download-outline"
                label="Download"
                sublabel="~2.6 GB from HuggingFace"
                onPress={() => act(onDownload)}
                disabled={isBusy}
                colors={colors}
              />
              <MenuItem
                icon="speedometer-outline"
                label="Load CPU"
                sublabel="Slower, always available"
                onPress={() => act(onLoadCPU)}
                disabled={isBusy}
                colors={colors}
              />
              <MenuItem
                icon="flash-outline"
                label="Load GPU"
                sublabel="Faster, needs compatible device"
                onPress={() => act(onLoadGPU)}
                disabled={isBusy}
                colors={colors}
              />
              <MenuItem
                icon="trash-outline"
                label="Delete"
                sublabel="Remove model from device"
                onPress={() => act(onDelete)}
                disabled={isBusy}
                colors={colors}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function MenuItem({
  icon,
  label,
  sublabel,
  onPress,
  disabled,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel?: string;
  onPress: () => void;
  disabled?: boolean;
  colors: { text: string; icon: string };
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.menuItem, disabled && styles.menuItemDisabled]}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Ionicons
        name={icon}
        size={20}
        color={disabled ? colors.icon + "50" : colors.icon}
      />
      <View style={styles.menuItemText}>
        <ThemedText
          style={[styles.menuItemLabel, disabled && { opacity: 0.4 }]}
        >
          {label}
        </ThemedText>
        {sublabel && (
          <ThemedText style={[styles.menuItemSub, { color: colors.icon }]}>
            {sublabel}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerBtn: {
    padding: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    width: 300,
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 13,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#ff4444",
    marginBottom: 8,
  },
  progressBarOuter: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(128,128,128,0.2)",
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarInner: {
    height: "100%",
    borderRadius: 2,
  },
  actions: {
    gap: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 12,
    borderRadius: 8,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 14,
  },
  menuItemSub: {
    fontSize: 11,
    marginTop: 1,
  },
});
