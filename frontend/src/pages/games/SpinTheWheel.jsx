import { Wheel } from "react-custom-roulette";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SpinTheWheel.css";

const data = [
  { option: "Food Voucher" },
  { option: "School Shirt" },
  { option: "Food Voucher" },
  { option: "Free Dress" },
];

export default function SpinTheWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [result, setResult] = useState(null);

  function handleSpin() {
    const index = Math.floor(Math.random() * data.length);
    setPrizeIndex(index);
    setMustSpin(true);
  }

  return (
    <div className="stw-container">
      <Link to="/prizes">
        <button className="stw-back-btn">← Back to Prizes</button>
      </Link>
      <h1>Spin the Wheel</h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeIndex}
        data={data}
        spinDuration={0.5}
        onStopSpinning={() => {
          setMustSpin(false);
          setResult(data[prizeIndex].option);
        }}
      />
      <button className="stw-btn" onClick={handleSpin} disabled={mustSpin}>
        {mustSpin ? "Spinning..." : "Spin!"}
      </button>
      {result && (
        <div className="stw-result">
          You got: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}
