import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import type { LLMStatus } from "@/hooks/use-llm";

interface ModelProgressOverlayProps {
  status: LLMStatus;
  downloadProgress: number;
  error: string | null;
  colors: { text: string; background: string; tint: string; icon: string };
}

export function ModelProgressOverlay({
  status,
  downloadProgress,
  error,
  colors,
}: ModelProgressOverlayProps) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  const isVisible = status === "downloading" || status === "loading";

  useEffect(() => {
    if (status === "loading") {
      const loop = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loop.start();
      return () => loop.stop();
    } else {
      spinAnim.setValue(0);
    }
  }, [status, spinAnim]);

  if (!isVisible) return null;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const pct = Math.round(downloadProgress * 100);
  const isDownloading = status === "downloading";

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <View style={[styles.card, { backgroundColor: colors.background }]}>
        {isDownloading ? (
          <Ionicons
            name="cloud-download-outline"
            size={22}
            color={colors.tint}
          />
        ) : (
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="sync-outline" size={22} color={colors.tint} />
          </Animated.View>
        )}

        <View style={styles.textCol}>
          <ThemedText style={styles.label}>
            {isDownloading ? "Downloading model..." : "Loading model..."}
          </ThemedText>
          {isDownloading && (
            <ThemedText style={[styles.sub, { color: colors.icon }]}>
              {pct}% · ~2.6 GB
            </ThemedText>
          )}
          {!isDownloading && (
            <ThemedText style={[styles.sub, { color: colors.icon }]}>
              Initializing engine
            </ThemedText>
          )}
        </View>
      </View>

      {isDownloading && (
        <View
          style={[styles.barOuter, { backgroundColor: colors.icon + "20" }]}
        >
          <View
            style={[
              styles.barInner,
              { width: `${pct}%`, backgroundColor: colors.tint },
            ]}
          />
        </View>
      )}

      {!isDownloading && (
        <View
          style={[styles.barOuter, { backgroundColor: colors.icon + "20" }]}
        >
          <Animated.View
            style={[
              styles.barInner,
              styles.barIndeterminate,
              { backgroundColor: colors.tint },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 100,
    elevation: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  textCol: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  sub: {
    fontSize: 12,
    marginTop: 2,
  },
  barOuter: {
    height: 4,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    overflow: "hidden",
  },
  barInner: {
    height: "100%",
  },
  barIndeterminate: {
    width: "30%",
    // The indeterminate animation is handled by the spinning icon instead
    // This just shows a static accent strip
  },
});
