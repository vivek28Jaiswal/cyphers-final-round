import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const Page3 = () => {
  const data = [
    { title: "app web dev" },
    { title: "creative web dev" },
    { title: "augmented reality" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef([]);
  const isAnimating = useRef(false);

  const playSound = () => {
    const audio = new Audio("imgs/page3/hover-effect-dich.mp3");
    audio.play();
    audio.volume = 1;
  };

  // Handle circular navigation
  const goToSlide = (direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrentIndex((prev) => (prev + direction + data.length) % data.length);
  };

  // Animation effect with responsive spacing
  useEffect(() => {
    const animationPromises = itemsRef.current.map((item, index) => {
      const position = (index - currentIndex + data.length) % data.length;
      const isCenter = position === 0;
      const isLeft = position === data.length - 1;
      const isRight = position === 1;

      if (isCenter || isLeft || isRight) {
        // Responsive spacing - smaller on mobile
        const xPosition = window.innerWidth < 768 
          ? (position === data.length - 1 ? -150 : position * 150)
          : (position === data.length - 1 ? -400 : position * 400);

        // Get the SVG elements
        const mainSvg = item.querySelector(".main-svg polygon");
        const innerSvg = item.querySelector(".inner-svg polygon");
        const colorBar = item.querySelector(".color-bar");

        // Create timeline for this item
        const tl = gsap.timeline();

        // Position and scale animations
        tl.to(item, {
          x: xPosition,
          scale: isCenter ? 1 : 0.85,
          opacity: isCenter ? 1 : 0.2,
          zIndex: isCenter ? 10 : 1,
          duration: 0.2,
          ease: "power2.out",
        });

        // Color animations
        tl.to(
          colorBar,
          {
            backgroundColor: isCenter ? "#9D2117" : "#808080",
            duration: 0.2,
          },
          0
        );

        tl.to(
          mainSvg,
          {
            stroke: isCenter ? "#9D2117" : "#808080",
            duration: 0.2,
          },
          0
        );

        tl.to(
          innerSvg,
          {
            stroke: isCenter ? "#9D2117" : "#808080",
            duration: 0.2,
          },
          0
        );

        tl.eventCallback("onComplete", () => {
          if (isCenter) isAnimating.current = false;
        });

        return tl;
      }
      return Promise.resolve();
    });

    Promise.all(animationPromises);
  }, [currentIndex]);

  return (
    <div className="py-[2vh] md:py-[5vh] font-[Minecraft] lg:min-h-[100vh] w-full overflow-hidden relative">
      <h1 className="lg:text-center uppercase text-[#9D2117] text-3xl md:text-5xl px-4">
        what's in the <span className="text-white">menu</span> for you
      </h1>

      {/* Slider container */}
      <div className="relative w-full mt-10 md:mt-28 h-[50vh] md:h-[60vh]">
        {/* Navigation buttons */}
        <button
          onClick={() => {
            playSound();
            goToSlide(-1);
          }}
          className="absolute left-2 md:left-10 cursor-pointer text-[#9D2117] scale-[150%] top-1/2 z-20 -translate-y-1/2 duration-300 p-2 rounded-full hover:scale-[200%] transition-transform w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
        >
          <i className="ri-arrow-right-wide-fill"></i>
        </button>
        <button
          onClick={() => {
            playSound();
            goToSlide(1);
          }}
          className="absolute right-2 md:right-10 cursor-pointer text-[#9D2117] scale-[150%] top-1/2 z-20 -translate-y-1/2 duration-300 p-2 rounded-full hover:scale-[200%] transition-transform w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
        >
          <i className="ri-arrow-left-wide-line"></i>
        </button>

        {/* Slider track */}
        <div className="flex items-center justify-center h-full w-full">
          {data.map((val, index) => {
            const position = (index - currentIndex + data.length) % data.length;
            const isVisible = position <= 1 || position === data.length - 1;
            const isCenter = position === 0;

            return (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`absolute h-[40vh] md:h-[55vh] w-[70%] lg:w-[25%] transition-all duration-300`}
                style={{
                  display: isVisible ? "block" : "none",
                  pointerEvents: isCenter ? "auto" : "none",
                }}
              >
                {/* Shadow image with conditional opacity */}
                <img
                  className={`w-full h-full scale-[130%] ${
                    isCenter ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                  src="/imgs/page3/Rectangle 29.png"
                  alt=""
                />
                <img
                  className={`absolute w-[120%] scale-[110%] -left-10 md:-left-20 -top-10 md:-top-20 transition-opacity duration-300 ${
                    isCenter ? "opacity-100" : "opacity-0"
                  }`}
                  src="/imgs/page3/image.png"
                  alt=""
                />
                <img
                  className={`absolute w-[90%] scale-[130%] -left-8 md:-left-15 -top-2 md:-top-4 transition-opacity duration-300 ${
                    isCenter ? "opacity-0" : "opacity-100"
                  }`}
                  src="/imgs/page3/ChatGPT_Image_May_18__2025__05_23_06_AM-removebg-preview.png"
                  alt=""
                />

                <div className="absolute inset-0 [clip-path:polygon(0%_0%,75%_0%,100%_25%,100%_100%,25%_100%,0%_75%)]">
                  <div
                    className="absolute w-[1vw] h-[15vh] md:h-[20vh] bottom-0 right-0 color-bar"
                    style={{
                      backgroundColor: isCenter ? "#9D2117" : "#808080",
                    }}
                  ></div>

                  <div className="absolute top-[-15%] md:top-[-20%] right-[-5%] md:right-[-10%] scale-[40%] h-full w-[90%] [clip-path:polygon(0%_0%,75%_0%,100%_25%,100%_100%,25%_100%,0%_75%)]">
                    <img
                      className="h-full w-full object-cover"
                      src="/imgs/page3/img.jpg"
                      alt=""
                    />
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none inner-svg"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="0,0 75,0 100,25 100,100 25,100 0,75"
                        fill="none"
                        stroke={isCenter ? "#9D2117" : "#808080"}
                        strokeWidth="15"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  <div className="h-full w-full flex flex-col p-3 md:p-5 justify-end items-end font-[Aux-Mono] uppercase text-white text-sm md:text-base">
                    <h1 className="text-lg md:text-xl w-[50%] mb-[30%] md:mb-[40%] mr-[50%] font-[Aux-Mono]">
                      {val.title}
                    </h1>
                    <h1>bold & artistic</h1>
                    <h1>sleek & professional</h1>
                    <h1>energetic & trendy</h1>

                    <button className="relative mt-3 md:mt-5 px-4 md:px-8 py-2 md:py-3 border-none text-white font-[Minecraft] uppercase cursor-pointer [clip-path:polygon(0%_0%,95%_0%,100%_20%,100%_100%,5%_100%,0%_80%)] text-xs md:text-sm group hover:bg-[#9D2117] duration-400 transition-colors">
                      KNOW MORE
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="0,0 95,0 100,20 100,100 5,100 0,80"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none main-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 75,0 100,25 100,100 25,100 0,75"
                    fill="none"
                    stroke={isCenter ? "#9D2117" : "#808080"}
                    strokeWidth="5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page3;
