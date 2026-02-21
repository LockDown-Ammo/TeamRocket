import { useState } from "react";

function Help() {
  const images = [
     "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleClick = (index) => {
    if (selected.includes(index)) return;

    const updated = [...selected, index];
    setSelected(updated);

    if (updated.length === 5) {
      setAttempts((prev) => prev + 1);

      setTimeout(() => {
        setSelected([]);
        nextImage();
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg scale-110"
        style={{ backgroundImage: `url(${currentImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative bg-black/80 p-8 rounded-xl shadow-2xl border border-red-500">

        <h1 className="text-2xl text-center text-red-400 mb-4">
          I'm Not A Robot
        </h1>

        <p className="text-center mb-6">
          Select all boxes that contain Pokémon parts.
        </p>

        <div className="grid grid-cols-3 gap-2 w-72 mx-auto">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-24 h-24 border cursor-pointer transition
                ${
                  selected.includes(index)
                    ? "border-red-400 scale-95"
                    : "border-gray-700 hover:border-red-400"
                }`}
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: "300% 300%",
                backgroundPosition: `
                  ${(index % 3) * 50}% ${(Math.floor(index / 3)) * 50}%
                `
              }}
            />
          ))}
        </div>

        <p className="text-center mt-4 text-sm">
          Attempts: {attempts}
        </p>

      </div>
    </div>
  );
}

export default Help;