import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useHeroSlider = (slides: any[]) => {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const CARD_STEP = 216;

    const dragStartX = useRef(0);
    const currentDragOffset = useRef(0);
    const hasDragged = useRef(false);

    const handlePointerDown = (
        e: React.PointerEvent<HTMLDivElement>
    ) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;

        dragStartX.current = e.clientX;
        currentDragOffset.current = 0;
        hasDragged.current = false;

        setIsDragging(true);
        setDragOffset(0);
    };

    const handlePointerMove = (
        e: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!isDragging) return;

        const distance = e.clientX - dragStartX.current;

        currentDragOffset.current = distance;

        if (Math.abs(distance) > 5) {
            hasDragged.current = true;
        }

        setDragOffset(distance);
    };

    const handleCardClick = (slideId: number) => {
        console.log("CARD CLICK:", slideId);

        if (hasDragged.current) {
            console.log("IGNORED BECAUSE DRAG");

            hasDragged.current = false;
            return;
        }

        console.log("NAVIGATING:", slideId);

        navigate(`/slide/${slideId}`);
    };

    const finishDrag = (
        e: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!isDragging) return;

        const distance = currentDragOffset.current;
        const threshold = 50;

        if (Math.abs(distance) > threshold) {
            if (distance < 0) {
                setCurrentIndex((prev) =>
                    Math.min(prev + 1, slides.length - 1)
                );
            } else {
                setCurrentIndex((prev) =>
                    Math.max(prev - 1, 0)
                );
            }
        }

        setDragOffset(0);
        currentDragOffset.current = 0;
        setIsDragging(false);

        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    const active = slides[currentIndex];

    return {
        currentIndex,
        isDragging,
        dragOffset,
        CARD_STEP,
        active,

        handlePointerDown,
        handlePointerMove,
        handleCardClick,
        finishDrag,
        handlePrev,
        handleNext,
    };
};

export default useHeroSlider;

