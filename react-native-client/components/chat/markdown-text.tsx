import { Fragment } from "react";
import { StyleSheet, Text, type TextStyle } from "react-native";

interface MarkdownTextProps {
  children: string;
  style?: TextStyle;
  color?: string;
}

/**
 * Lightweight markdown renderer supporting:
 * - **bold**
 * - *italic*
 * - ### headings (lines starting with ###)
 * - bullet points (lines starting with - or *)
 */
export function MarkdownText({ children, style, color }: MarkdownTextProps) {
  const lines = children.split("\n");

  return (
    <Text style={style}>
      {lines.map((line, lineIdx) => {
        const isLast = lineIdx === lines.length - 1;
        const trimmed = line.trimStart();

        // ### Heading
        if (trimmed.startsWith("### ")) {
          return (
            <Fragment key={lineIdx}>
              <Text style={[styles.heading, color ? { color } : undefined]}>
                {renderInline(trimmed.slice(4), color)}
              </Text>
              {!isLast && "\n"}
            </Fragment>
          );
        }

        // Bullet point: - or *  (but not ** which is bold)
        if (/^[-*]\s/.test(trimmed)) {
          return (
            <Fragment key={lineIdx}>
              <Text style={color ? { color } : undefined}>
                {"  • "}
                {renderInline(trimmed.slice(2), color)}
              </Text>
              {!isLast && "\n"}
            </Fragment>
          );
        }

        // Normal line
        return (
          <Fragment key={lineIdx}>
            {renderInline(line, color)}
            {!isLast && "\n"}
          </Fragment>
        );
      })}
    </Text>
  );
}

/** Parse **bold** and *italic* within a line */
function renderInline(text: string, color?: string) {
  // Match **bold** or *italic* (non-greedy)
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      parts.push(
        <Text
          key={match.index}
          style={[styles.bold, color ? { color } : undefined]}
        >
          {match[2]}
        </Text>,
      );
    } else if (match[3]) {
      // *italic*
      parts.push(
        <Text
          key={match.index}
          style={[styles.italic, color ? { color } : undefined]}
        >
          {match[3]}
        </Text>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
  },
  bold: {
    fontWeight: "700",
  },
  italic: {
    fontStyle: "italic",
  },
});
