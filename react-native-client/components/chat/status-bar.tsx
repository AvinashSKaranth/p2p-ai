import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

interface StatusBarProps {
  peerId: string | null;
  status: string;
  mode: string;
  providerCount: number;
  heartbeatTime: string;
}

export function StatusBar({ peerId, status, mode, providerCount, heartbeatTime }: StatusBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Peer:</ThemedText>
        <ThemedText style={styles.value}>{peerId || "-"}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Status:</ThemedText>
        <ThemedText style={styles.value}>{status}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Mode:</ThemedText>
        <ThemedText style={styles.value}>{mode}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Providers:</ThemedText>
        <ThemedText style={styles.value}>{providerCount}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Heartbeat:</ThemedText>
        <ThemedText style={styles.value}>{heartbeatTime}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#161b22",
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  label: {
    fontSize: 12,
    color: "#8b949e",
  },
  value: {
    fontSize: 12,
    color: "#c9d1d9",
  },
});
