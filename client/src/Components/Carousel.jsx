import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, imageUrl: 'https://i.ibb.co/C1n3K6s/Screenshot-2024-06-18-113529.png' },
  { id: 2, imageUrl: 'https://i.ibb.co/hsdnR29/Screenshot-2024-06-18-113548.png' },
  { id: 3, imageUrl: 'https://i.ibb.co/HH3Dzkh/Screenshot-2024-06-18-113608.png' },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-68  rounded-md">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-68 flex-shrink-0">
            <img
              src={slide.imageUrl}
              alt={`Slide ${slide.id}`}
              className="w-full h-68 object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center p-4">
        <button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))}
          className="bg-white text-black rounded-full p-2 shadow-md"
        >
          &#8592;
        </button>
        <button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
          className="bg-white text-black rounded-full p-2 shadow-md"
        >
          &#8594;
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
