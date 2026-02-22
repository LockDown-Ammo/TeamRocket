import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("form");
  const [message, setMessage] = useState("");

  // Game config
  const GRID_SIZE = 9;
  const GAME_DURATION = 30;
  const TARGET_SCORE = 15;

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeIndex, setActiveIndex] = useState(null);

  const spawnIntervalRef = useRef(null);
  const timerRef = useRef(null);

  // ---------------- GAME LOGIC ----------------

  useEffect(() => {
    if (stage !== "game") return;

    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveIndex(null);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          clearInterval(spawnIntervalRef.current);

          if (score >= TARGET_SCORE) {
            setStage("submitted");
          } else {
            setStage("retry");
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnIntervalRef.current);
    };
  }, [stage, score]);

  useEffect(() => {
    if (stage !== "game") return;

    function spawnDigglet() {
      const randomIndex = Math.floor(Math.random() * GRID_SIZE);
      setActiveIndex(randomIndex);
    }

    const spawnRate = timeLeft > 10 ? 700 : 450;

    spawnIntervalRef.current = setInterval(spawnDigglet, spawnRate);

    return () => clearInterval(spawnIntervalRef.current);
  }, [stage, timeLeft]);

  function handleWhack(index) {
    if (index === activeIndex) {
      setScore((prev) => prev + 1);
      setActiveIndex(null);
    }
  }

  function handleMouseEnter(index) {
    if (index === activeIndex) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * GRID_SIZE);
      } while (newIndex === index);
      setActiveIndex(newIndex);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Pokéball Background */}
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="flex-1 bg-red-500"></div>
        <div className="h-3 bg-black"></div>
        <div className="flex-1 bg-white"></div>
      </div>

      {/* Pokéball Center Circle */}
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-red-200 mx-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-600">
            Pokémon Support Portal
          </h1>

          <button
            onClick={() => navigate("/feed")}
            className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Back to Feed
          </button>
        </div>

        <div className="relative my-4">
          <div className="h-1 bg-black w-full"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-black rounded-full"></div>
        </div>

        {/* ---------------- FORM ---------------- */}
        {stage === "form" && (
          <>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-400"
              rows="4"
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={() => setStage("game")}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Submit Ticket
            </button>
          </>
        )}

        {/* ---------------- GAME ---------------- */}
        {stage === "game" && (
          <>
            <h2 className="text-lg font-semibold text-center mb-2 text-red-600">
              Digglet Verification
            </h2>

            <p className="text-sm text-gray-500 text-center mb-4">
              Score {TARGET_SCORE} hits within {GAME_DURATION} seconds.
            </p>

            <div className="flex justify-between mb-6 text-sm font-medium">
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: GRID_SIZE }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleWhack(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className="relative h-20 bg-[#3fa34d] rounded-md flex items-center justify-center cursor-pointer border border-[#2e7d32] shadow-inner hover:bg-[#388e3c] transition"
                >
                  {activeIndex === index && (
                    <img
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"
                      alt="Digglet"
                      className="w-32 h-32"
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ---------------- RETRY ---------------- */}
        {stage === "retry" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Verification Incomplete
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Your reflex score did not meet verification standards.
            </p>
            <button
              onClick={() => setStage("game")}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ---------------- SUCCESS ---------------- */}
        {stage === "submitted" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Ticket Submitted
            </h2>
            <p className="text-gray-500 text-sm">
              Estimated response time: 6 to 8 business years.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}