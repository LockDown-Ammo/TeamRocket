import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SecretTrigger() {
  const navigate = useNavigate();

  useEffect(() => {
    let buffer = "";

    const handleKeyPress = (e) => {
      buffer += e.key.toLowerCase();

      if (buffer.length > 22) {
        buffer = buffer.slice(-22);
      }

      if (buffer.includes("isbaarhumfailnahihonge")) {
        navigate("/prepare-for-trouble");
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  return null;
}

export default SecretTrigger;