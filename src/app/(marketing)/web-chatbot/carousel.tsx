import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeatureCard {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  cards: FeatureCard[];
}

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const extendedCards = [...cards, ...cards];

  const [isTransitioning, setIsTransitioning] = useState(false);

useEffect(() => {
  if (wrapperRef.current && extendedCards.length > 0) {
    const cardWidth = wrapperRef.current.children[0].clientWidth + 24;
    const translateValue = -currentIndex * cardWidth;

    setIsTransitioning(true);
    wrapperRef.current.style.transition = "transform 0.5s ease-in-out";
    wrapperRef.current.style.transform = `translateX(${translateValue}px)`;

    const transitionDuration = 500;
    const timer = setTimeout(() => {
      setIsTransitioning(false); // re-enable after transition
    }, transitionDuration);

    if (currentIndex === cards.length) {
      setTimeout(() => {
        wrapperRef.current!.style.transition = "none";
        setCurrentIndex(0);
      }, transitionDuration);
    }

    if (currentIndex === -1) {
      setTimeout(() => {
        wrapperRef.current!.style.transition = "none";
        setCurrentIndex(cards.length - 1);
      }, transitionDuration);
    }

    return () => clearTimeout(timer);
  }
}, [currentIndex, cards.length, extendedCards.length]);



  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrev = () => setCurrentIndex((prev) => prev - 1);

  return (
    <section className="relative w-full">
      <div className="relative overflow-hidden">
        {/* Card wrapper */}
        <div
          ref={wrapperRef}
          className="flex transition-transform duration-500 ease-in-out gap-6"
        >
          {extendedCards.map((card, index) => (
            <div
              key={index}
              className="w-[500px] md:w-[450px] lg:w-[520px] flex-shrink-0 rounded-2xl shadow-xl bg-neutral-900 border border-neutral-800 overflow-hidden"
            >
              {/* Image */}
              <div className="h-64 sm:h-64 md:h-72 lg:h-80 w-full bg-neutral-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Text */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
  onClick={handlePrev}
  disabled={isTransitioning}
  className={`absolute top-1/2 left-2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition ${
    isTransitioning
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-white hover:bg-gray-200 text-neutral-900"
  }`}
>
  <ChevronLeft size={22} />
</button>

<button
  onClick={handleNext}
  disabled={isTransitioning}
  className={`absolute top-1/2 right-2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition ${
    isTransitioning
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-white hover:bg-gray-200 text-neutral-900"
  }`}
>
  <ChevronRight size={22} />
</button>
      </div>
    </section>
  );
};

export default Carousel;
