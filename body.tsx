import React from "react";

const BodyImageInteractive = () => {
  const handleClick = (part) => {
    alert(`Du klickade på ${part}`);
  };

  return (
    <div style={{ position: "relative", width: "300px", height: "600px" }}>
      {/* Bilden */}
      <img
        src="/path-to-image.jpg" // Byt ut mot den faktiska sökvägen till bilden
        alt="Human Body"
        style={{ width: "100%", height: "auto" }}
      />

      {/* Klickbara områden */}
      {/* Huvud */}
      <div
        onClick={() => handleClick("huvudet")}
        style={{
          position: "absolute",
          top: "5%",
          left: "35%",
          width: "30%",
          height: "15%",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      ></div>

      {/* Bål */}
      <div
        onClick={() => handleClick("bålen")}
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: "40%",
          height: "40%",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      ></div>

      {/* Vänster arm */}
      <div
        onClick={() => handleClick("vänster arm")}
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "20%",
          height: "30%",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      ></div>

      {/* Höger arm */}
      <div
        onClick={() => handleClick("höger arm")}
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "20%",
          height: "30%",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      ></div>

      {/* Vänster ben */}
      <div
        onClick={() => handleClick("vänster ben")}
        style={{
          position: "absolute",
          top: "65%",
          left: "35%",
          width: "12%",
          height: "30%",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      ></div>

      {/* Höger ben */}
      <div
        onClick={() => handleClick("höger ben")}
        style={{
          position: "absolute",
          top: "65%",
          right: "35%",
          width: "12%",
          height: "30%",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
};

export default BodyImageInteractive;
