import type { ReactNode } from "react";
import type { EditorialBlock, EditorialSection } from "@/lib/editorial/types";

type Props = {
  pageKey: string;
  sections: EditorialSection[];
};

function renderInline(text: string): ReactNode[] {
  const tokenPattern = /\[([^\]]+)\]\((\/(?!\/)[^)]+|https:\/\/[^)]+)\)|\*\*([^*]+)\*\*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) {
      nodes.push(
        <a
          key={match.index}
          href={match[2]}
          {...(match[2].startsWith("https://")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={match.index}>{match[3]}</strong>);
    }
    lastIndex = tokenPattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBlock(block: EditorialBlock, index: number): ReactNode {
  if (block.type === "heading") {
    return block.level === 3 ? (
      <h3 key={index}>{renderInline(block.text)}</h3>
    ) : (
      <h4 key={index}>{renderInline(block.text)}</h4>
    );
  }
  if (block.type === "paragraph") {
    return <p key={index}>{renderInline(block.text)}</p>;
  }
  return (
    <ul key={index}>
      {block.items.map((item, itemIndex) => (
        <li key={itemIndex}>{renderInline(item)}</li>
      ))}
    </ul>
  );
}

export default function EditorialContent({ pageKey, sections }: Props) {
  if (!sections.length) return null;

  return (
    <div className="space-y-8" data-editorial-page={pageKey}>
      {sections.map((section) => (
        <section
          key={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="mx-auto max-w-3xl px-4 py-8 prose prose-neutral"
        >
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          {section.content.map(renderBlock)}
        </section>
      ))}
    </div>
  );
}
