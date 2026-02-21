import { useState } from "react";

function Help() {

  const challenges = [
    {
      image: "/image1.jpg",
      correctBoxes: [0, 1, 3, 4]
    },
    {
      image: "/image2.jpg",
      correctBoxes: [0 , 1 , 3 , 4 , 5]
    },
    {
      image: "/image3.jpg",
      correctBoxes: [1, 4, 5]
    },
    {
      image: "/image4.jpg",
      correctBoxes: [3 , 4 , 7]
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const currentChallenge = challenges[currentIndex];

  const handleClick = (index) => {
    if (selected.includes(index)) return;

    const updated = [...selected, index];
    setSelected(updated);

    // When user selected enough boxes
    if (updated.length === currentChallenge.correctBoxes.length) {

      const isCorrect =
        updated.length === currentChallenge.correctBoxes.length &&
        updated.every(box =>
          currentChallenge.correctBoxes.includes(box)
        );

      if (isCorrect) {
        setMessage("✔ Correct! Loading next verification...");
      } else {
        setMessage("✖ Incorrect selection. Loading new challenge...");
      }

      setAttempts(prev => prev + 1);

      setTimeout(() => {
        setSelected([]);
        setMessage("");
        setCurrentIndex((prev) => (prev + 1) % challenges.length);
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
        style={{ backgroundImage: `url(${currentChallenge.image})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative bg-black/80 p-8 rounded-xl shadow-2xl border border-red-500">

        <h1 className="text-2xl text-center text-red-400 mb-4">
          I'm Not A Robot
        </h1>

        <p className="text-center mb-6">
          Select all boxes that contain Pokémon parts.
        </p>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 w-72 mx-auto">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-24 h-24 border cursor-pointer transition
                ${
                  selected.includes(index)
                    ? "border-green-400 scale-95"
                    : "border-gray-700 hover:border-red-400"
                }`}
              style={{
                backgroundImage: `url(${currentChallenge.image})`,
                backgroundSize: "300% 300%",
                backgroundPosition: `
                  ${(index % 3) * 50}% ${(Math.floor(index / 3)) * 50}%
                `,
                backgroundRepeat: "no-repeat"
              }}
            />
          ))}
        </div>

        <p className="text-center mt-6 text-yellow-400">{message}</p>

        <p className="text-center mt-2 text-sm">
          Attempts: {attempts}
        </p>

      </div>
    </div>
  );
}

export default Help;