import React, { useState, useEffect } from 'react';

export default function CarouselList( {cards} ) {

  const slides = cards

  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === slides.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(slides.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);
  return (
    <main className="grid place-items-center md:grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl">
      <div
        className={`w-full justify-center items-center transition-transform ease-in-out duration-300 md:rounded-2xl p-6 md:p-0`}
      >
        {slides.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "w-full transition-all duration-300 ease-in-out"
                : "hidden"
            }`}
          >
            <img
              src={elem}
              alt=""
              width={400}
              height={400}
              className="w-full h-full h-auto"
            />
          </div>
        ))}
      </div>

    </main>
  );
}

