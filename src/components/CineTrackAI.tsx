"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function CineTrackAI() {
  const { messages, sendMessage, status, stop } = useChat();

  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const isStreaming =
    status === "submitted" || status === "streaming";

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container || !isAtBottom) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, isAtBottom]);

  function handleScroll() {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setIsAtBottom(distanceFromBottom < 80);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const text = input.trim();

    if (!text || isStreaming) return;

    setInput("");

    setIsAtBottom(true);

    await sendMessage({
      role: "user",
      parts: [{ type: "text", text }],
    });
  }

  function jumpToLatest() {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;
    setIsAtBottom(true);
  }

  return (
    <section
      className="cinetrack-ai"
      aria-labelledby="ai-title"
    >
      <div className="cinetrack-ai__header">
        <p className="cinetrack-ai__eyebrow">
          CineTrack AI
        </p>

        <h2 id="ai-title">
          Find your next movie
        </h2>

        <p>
          Tell me what you&apos;re in the mood for and I&apos;ll
          help you find something to watch.
        </p>
      </div>

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="cinetrack-ai__messages"
        aria-live="polite"
        aria-label="Movie assistant conversation"
      >
        {messages.length === 0 && (
          <div className="cinetrack-ai__empty">
            <p>Try asking:</p>

            <ul>
              <li>
                &quot;Recommend me a funny movie.&quot;
              </li>

              <li>
                &quot;I want a mind-bending thriller.&quot;
              </li>

              <li>
                &quot;What should I watch this weekend?&quot;
              </li>
            </ul>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`cinetrack-ai__message cinetrack-ai__message--${message.role}`}
          >
            <span className="cinetrack-ai__label">
              {message.role === "user"
                ? "You"
                : "CineTrack AI"}
            </span>

            <div className="cinetrack-ai__bubble">
              {message.parts.map((part, index) => {
                if (part.type !== "text") return null;

                return (
                  <span key={`${message.id}-${index}`}>
                    {part.text}
                  </span>
                );
              })}
            </div>
          </div>
        ))}

        {status === "submitted" && (
          <div className="cinetrack-ai__message cinetrack-ai__message--assistant">
            <span className="cinetrack-ai__label">
              CineTrack AI
            </span>

            <div className="cinetrack-ai__bubble cinetrack-ai__thinking">
              <span className="cinetrack-ai__dot" />
              <span className="cinetrack-ai__dot" />
              <span className="cinetrack-ai__dot" />

              <span className="sr-only">
                CineTrack AI is thinking
              </span>
            </div>
          </div>
        )}
      </div>

      {!isAtBottom && (
        <button
          type="button"
          className="cinetrack-ai__jump"
          onClick={jumpToLatest}
        >
          Jump to latest
        </button>
      )}

      <form
        className="cinetrack-ai__form"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="cinetrack-ai-input"
          className="sr-only"
        >
          Ask CineTrack AI
        </label>

        <input
          id="cinetrack-ai-input"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          placeholder="Ask for a movie recommendation..."
          disabled={isStreaming}
          autoComplete="off"
        />

        {isStreaming ? (
          <button
            type="button"
            className="cinetrack-ai__stop"
            onClick={stop}
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
          >
            Send
          </button>
        )}
      </form>
    </section>
  );
}