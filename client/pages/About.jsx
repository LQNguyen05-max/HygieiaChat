import { useState, useRef, useEffect } from "react";

const slides = [
  {
    title: "World Class Healthcare",
    description:
      "HygieiaChat brings expert healthcare advice to anyone, anywhere, anytime.",
    image: "/slide1.png",
  },
  {
    title: "Easy Appointments",
    description:
      "Schedule appointments and manage your health records with just a few clicks.",
    image: "/slide2.png",
  },
  {
    title: "Personalized Care",
    description:
      "Receive personalized care and recommendations tailored to your needs.",
    image: "/slide3.png",
  },
  {
    title: "Join Our Team",
    description: (
      <>
        Are you a talented individual ready to join a team that is
        revolutionizing healthcare?{" "}
        <a href="/apply" className="text-mint-700 font-bold hover:underline">
          Apply Here
        </a>
      </>
    ),
    image: "/slide4.png",
  },
];

const About = () => {
  const [current, setCurrent] = useState(0);
  const rightRef = useRef(null);

  // Handle scroll to change slides
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        // Scroll down
        setCurrent((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.deltaY < 0) {
        // Scroll up
        setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    const rightDiv = rightRef.current;
    if (rightDiv) {
      rightDiv.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (rightDiv) {
        rightDiv.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-mint-100 to-green-50">
      {/* Left: Navbar */}
      <div className="flex flex-col w-1/5 h-screen bg-gradient-to-b from-mint-200 to-green-100 p-10 border-r-2 border-mint-300 shadow-lg">
        <h2 className="text-2xl font-extrabold mb-12 text-mint-800 tracking-wide text-center">
          About Us
        </h2>
        <div className="flex flex-col gap-6">
          {slides.map((slide, idx) => (
            <button
              key={slide.title}
              onClick={() => setCurrent(idx)}
              className={`
                group flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200
                ${
                  current === idx
                    ? "bg-mint-700 text-white shadow-xl scale-105"
                    : "bg-white text-mint-800 hover:bg-mint-100"
                }
              `}
              style={{ position: "relative" }}
            >
              {/* Accent bar for active tab */}
              <span
                className={`block w-2 h-6 rounded-full mr-2 transition-all duration-200 ${
                  current === idx ? "bg-mint-400" : "bg-transparent"
                }`}
              />
              {slide.title}
            </button>
          ))}
        </div>
      </div>
      {/* Right: Full Background Image & Description */}
      <div
        className="flex-1 h-screen relative overflow-hidden"
        ref={rightRef}
        tabIndex={0}
        style={{ outline: "none" }}
      >
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute bottom-0 left-0 w-full p-10">
          <div className="bg-white bg-opacity-80 rounded-xl shadow p-6 max-w-xl mx-auto">
            <p className="text-xl text-gray-700 text-center">
              {slides[current].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
