import { useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

type SwipeCarouselProps<T> = {
  items: T[];

  renderItem: (item: T, index: number) => ReactNode;

  itemWidth?: number;
  gap?: number;

  className?: string;

  onItemClick?: (item: T, index: number) => void;
};

export default function SwipeCarousel<T>({
  items,
  renderItem,
  itemWidth = 200,
  gap = 12,
  className = "",
  onItemClick,
}: SwipeCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);

  const [dragStartX, setDragStartX] = useState(0);

  const [dragOffset, setDragOffset] = useState(0);

  const hasDragged = useRef(false);

  const STEP = itemWidth + gap;

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) {
      return;
    }

    hasDragged.current = false;

    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const distance = e.clientX - dragStartX;

    if (Math.abs(distance) > 5) {
      hasDragged.current = true;
    }

    let offset = distance;

    const maxIndex = items.length - 1;

    // Resistance at beginning
    if (currentIndex === 0 && distance > 0) {
      offset = distance * 0.25;
    }

    // Resistance at end
    if (currentIndex === maxIndex && distance < 0) {
      offset = distance * 0.25;
    }

    setDragOffset(offset);
  };

  const finishDrag = () => {
    if (!isDragging) return;

    const movedCards = Math.round(-dragOffset / STEP);

    setCurrentIndex((prev) => {
      const next = prev + movedCards;

      return Math.max(0, Math.min(items.length - 1, next));
    });

    setDragOffset(0);
    setIsDragging(false);
  };

  const handleClick = (item: T, index: number) => {
    if (hasDragged.current) return;

    setCurrentIndex(index);

    onItemClick?.(item, index);
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className={`
          w-full
          overflow-hidden
          select-none
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{
          touchAction: "pan-y",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className={`
            flex
            items-center
            will-change-transform
            ${
              isDragging
                ? ""
                : "transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            }
          `}
          style={{
            gap: `${gap}px`,
            transform: `translate3d(
              ${-(currentIndex * STEP) + dragOffset}px,
              0,
              0
            )`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${itemWidth}px`,
              }}
              className="shrink-0"
              onClick={() => handleClick(item, index)}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
