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
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Duplicate cards for infinite loop
  const extendedCards = [...cards, ...cards];

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Handle looping transition
  useEffect(() => {
    if (!wrapperRef.current || extendedCards.length === 0) return;

    const cardWidth =
      wrapperRef.current.children[0].clientWidth + 24; // 24 = gap-6
    const translateValue = -currentIndex * cardWidth;

    setIsTransitioning(true);
    wrapperRef.current.style.transition = "transform 0.5s ease-in-out";
    wrapperRef.current.style.transform = `translateX(${translateValue}px)`;

    const transitionDuration = 500;
    const timer = setTimeout(() => setIsTransitioning(false), transitionDuration);

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
  }, [currentIndex, cards.length, extendedCards.length]);

  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrev = () => setCurrentIndex((prev) => prev - 1);

  return (
    <section className="relative w-full bg-neutral-950 py-12">
      <div className="relative max-w-7xl mx-auto px-4 overflow-hidden">
        {/* Card wrapper */}
        <div
          ref={wrapperRef}
          className="flex transition-transform duration-500 ease-in-out gap-6"
        >
          {extendedCards.map((card, index) => (
            <div
              key={index}
              className={`flex-shrink-0 rounded-2xl shadow-lg bg-neutral-900 border border-neutral-800 overflow-hidden
                w-[500px] md:w-[450px] lg:w-[520px]`}
            >
              {/* Image */}
              <div className="h-52 md:h-64 lg:h-72 w-full bg-neutral-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Text */}
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-lg md:text-xl font-semibold text-violet-400 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className={`absolute top-1/2 left-2 -translate-y-1/2 z-10 p-3 rounded-full bg-violet-500 text-white shadow-lg hover:bg-violet-600 transition disabled:opacity-40`}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className={`absolute top-1/2 right-2 -translate-y-1/2 z-10 p-3 rounded-full bg-violet-500 text-white shadow-lg hover:bg-violet-600 transition disabled:opacity-40`}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
