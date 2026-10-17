import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-stone-800 bg-[#1e1e24] shadow-md text-stone-100 font-mono text-xs">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#141418] border-b border-stone-800 text-[11px] text-stone-400">
        <span className="flex items-center gap-1.5 font-semibold text-emerald-400 lowercase">
          <Terminal className="w-3.5 h-3.5" />
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded bg-stone-800/80 hover:bg-stone-700 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto leading-relaxed text-[12.5px] font-mono text-stone-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Format inline markdown text: bold, italics, inline code, links
 */
function renderInlineFormatting(text) {
  if (!text) return null;

  // Split on code tokens first: `code`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, pIdx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={pIdx}
          className="px-1.5 py-0.5 rounded text-[11.5px] font-mono bg-stone-200 dark:bg-stone-800 text-sage-800 dark:text-sage-300 font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold (**text**)
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length >= 4) {
        return (
          <strong key={`${pIdx}-${bIdx}`} className="font-bold text-stone-900 dark:text-white">
            {bPart.slice(2, -2)}
          </strong>
        );
      }

      // Italic (*text*)
      const italicParts = bPart.split(/(\*[^*]+\*)/g);
      return italicParts.map((iPart, iIdx) => {
        if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length >= 2) {
          return <em key={`${pIdx}-${bIdx}-${iIdx}`}>{iPart.slice(1, -1)}</em>;
        }
        return iPart;
      });
    });
  });
}

/**
 * Full Markdown block renderer supporting code blocks, lists, quotes, and headers
 */
export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Split content into code blocks and normal text blocks
  // Regex matches ```[language]\n[code]```
  const codeBlockRegex = /```([a-zA-Z0-9_\-+]*)\n([\s\S]*?)```/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const textBefore = content.substring(lastIndex, match.index);
    if (textBefore) {
      elements.push({ type: 'text', content: textBefore });
    }

    elements.push({
      type: 'code',
      language: match[1] || 'plaintext',
      code: match[2].trimEnd()
    });

    lastIndex = match.index + match[0].length;
  }

  const remaining = content.substring(lastIndex);
  if (remaining) {
    elements.push({ type: 'text', content: remaining });
  }

  return (
    <div className="markdown-body space-y-2 text-sm leading-relaxed">
      {elements.map((el, idx) => {
        if (el.type === 'code') {
          return <CodeBlock key={idx} language={el.language} code={el.code} />;
        }

        // Render text section by lines and paragraphs
        const lines = el.content.split('\n');
        const renderedLines = [];
        let currentList = [];
        let listType = null; // 'ul' | 'ol'

        const flushList = (listKey) => {
          if (currentList.length > 0) {
            if (listType === 'ol') {
              renderedLines.push(
                <ol key={`ol-${listKey}`} className="list-decimal pl-5 space-y-1 my-2">
                  {currentList.map((item, itemIdx) => (
                    <li key={itemIdx}>{renderInlineFormatting(item)}</li>
                  ))}
                </ol>
              );
            } else {
              renderedLines.push(
                <ul key={`ul-${listKey}`} className="list-disc pl-5 space-y-1 my-2">
                  {currentList.map((item, itemIdx) => (
                    <li key={itemIdx}>{renderInlineFormatting(item)}</li>
                  ))}
                </ul>
              );
            }
            currentList = [];
            listType = null;
          }
        };

        lines.forEach((line, lIdx) => {
          const trimmed = line.trim();

          // Header: ###
          if (trimmed.startsWith('### ')) {
            flushList(lIdx);
            renderedLines.push(
              <h4 key={lIdx} className="font-bold text-stone-900 dark:text-white text-base mt-2 mb-1">
                {renderInlineFormatting(trimmed.substring(4))}
              </h4>
            );
            return;
          }

          // Header: ##
          if (trimmed.startsWith('## ')) {
            flushList(lIdx);
            renderedLines.push(
              <h3 key={lIdx} className="font-bold text-stone-900 dark:text-white text-lg mt-3 mb-1">
                {renderInlineFormatting(trimmed.substring(3))}
              </h3>
            );
            return;
          }

          // Header: #
          if (trimmed.startsWith('# ')) {
            flushList(lIdx);
            renderedLines.push(
              <h2 key={lIdx} className="font-extrabold text-stone-900 dark:text-white text-xl mt-3 mb-1">
                {renderInlineFormatting(trimmed.substring(2))}
              </h2>
            );
            return;
          }

          // Blockquote: >
          if (trimmed.startsWith('> ')) {
            flushList(lIdx);
            renderedLines.push(
              <blockquote
                key={lIdx}
                className="border-l-4 border-sage-500 pl-3 py-1 italic my-2 text-stone-600 dark:text-sand-300 bg-sand-100/50 dark:bg-darkbg-surface/50 rounded-r"
              >
                {renderInlineFormatting(trimmed.substring(2))}
              </blockquote>
            );
            return;
          }

          // Ordered list: 1. , 2.
          const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
          if (olMatch) {
            if (listType !== 'ol') flushList(lIdx);
            listType = 'ol';
            currentList.push(olMatch[2]);
            return;
          }

          // Unordered list: - or *
          const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
          if (ulMatch) {
            if (listType !== 'ul') flushList(lIdx);
            listType = 'ul';
            currentList.push(ulMatch[1]);
            return;
          }

          // Blank line
          if (!trimmed) {
            flushList(lIdx);
            renderedLines.push(<div key={lIdx} className="h-1" />);
            return;
          }

          // Standard paragraph line
          flushList(lIdx);
          renderedLines.push(
            <p key={lIdx} className="my-1">
              {renderInlineFormatting(line)}
            </p>
          );
        });

        flushList('end');
        return <div key={idx}>{renderedLines}</div>;
      })}
    </div>
  );
}
