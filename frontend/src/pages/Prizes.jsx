import { useState, useEffect } from "react";
import PurchaseModal from "../components/PurchaseModal";
import { apiFetch } from "../utils/api";
import { Wheel } from "react-custom-roulette";
import "./prizes.css";

import hwPass from "../assets/prize-icons/hw-pass-icon.png";
import hoodie from "../assets/prize-icons/hoodie-icon.png";
import foodVoucher from "../assets/prize-icons/food-voucher.png";
import mystery from "../assets/prize-icons/mystery-icon.png";

const wheelData = [
  { option: "Food Voucher" },
  { option: "School Hoodie" },
  { option: "Homework Pass" },
  { option: "Free Dress" },
];

const shopItems = [
  { id: 1, icon: hwPass, title: "Homework Pass", cost: 15 },
  { id: 2, icon: hoodie, title: "School Hoodie", cost: 25 },
  { id: 3, icon: foodVoucher, title: "Food Voucher", cost: 5 },
];

const SPIN_COST = 10;

function Prizes() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [student, setStudent] = useState(null);
  const [chips, setChips] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [wheelResult, setWheelResult] = useState(null);

  useEffect(() => {
    Promise.all([apiFetch("/student/info"), apiFetch("/student/chips")]).then(
      async ([infoRes, chipsRes]) => {
        if (!infoRes || !chipsRes) return;
        const info = await infoRes.json();
        const chipData = await chipsRes.json();
        setStudent(info);
        setChips(chipData.current_balance);
      },
    );
  }, []);

  const handleConfirm = async (item) => {
    if (!student) return;

    if (chips < item.cost) {
      setError(
        `You need ${item.cost - chips} more chips to redeem ${item.title}.`,
      );
      return;
    }

    const { student_id } = student;
    console.log(student_id)
    await apiFetch(`/transaction/chips/${student_id}`, {
      method: "POST",
      body: JSON.stringify({ amount: -item.cost }),
    });
    console.log(`Purchase: ${item.title} for ${item.cost} chips`);

    setChips((prev) => prev - item.cost);
    setError(null);

    if (item.isSpin) {
      const index = Math.floor(Math.random() * wheelData.length);
      setPrizeIndex(index);
      setWheelResult(null);
      setMustSpin(true);
      // Success popup is shown after the wheel stops (see onStopSpinning)
    } else {
      setSuccessMessage(`You redeemed: ${item.title}`);
    }
  };

  const canAffordSpin = chips !== null && chips >= SPIN_COST;

  return (
    <>
      <div className="shop-page">
        {/* balance */}
        <div className="shop-balance">
          <span>Available Chips</span>
          <div className="shop-balance-count">
            <img src="/favicon.webp" alt="chip" className="shop-chip-icon" />
            <span>
              {chips !== null ? Number(chips).toLocaleString() : "..."}
            </span>
          </div>
        </div>

        {error && <div className="shop-error">{error}</div>}

        {/* prize shop section */}
        <section className="shop-section">
          <h2 className="section-title">Prize Shop</h2>
          <div className="shop-container">
            {shopItems.map((item) => {
              const canAfford = chips !== null && chips >= item.cost;
              return (
                <div
                  className={`shop-item ${!canAfford ? "shop-item-disabled" : ""}`}
                  key={item.id}
                >
                  <div className="item-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <p className="item-title">{item.title}</p>
                  <button
                    className={`redeem-btn ${!canAfford ? "redeem-btn-disabled" : ""}`}
                    onClick={() => {
                      setError(null);
                      setSelectedItem(item);
                    }}
                    disabled={!canAfford}
                  >
                    {item.cost} chips
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* feeling lucky section */}
        <section className="shop-section">
          <h2 className="section-title">Feeling Lucky?</h2>
          <div className="lucky-card">
            <div className="lucky-left">
              <h3 className="lucky-title">Mystery Prize Wheel</h3>
              <p className="lucky-desc">
                Spend {SPIN_COST} chips for a chance to win something big!
              </p>
              {wheelResult && (
                <p className="wheel-result">
                  🎉 You won: <strong>{wheelResult}</strong>
                </p>
              )}
              <button
                className={`redeem-btn ${!canAffordSpin ? "redeem-btn-disabled" : ""}`}
                onClick={() => {
                  setError(null);
                  setWheelResult(null);
                  setSelectedItem({
                    id: 6,
                    title: "Mystery Prize",
                    cost: SPIN_COST,
                    isSpin: true,
                    icon: mystery,
                  });
                }}
                disabled={!canAffordSpin || mustSpin}
              >
                {mustSpin ? "Spinning..." : `Spin for ${SPIN_COST} chips`}
              </button>
            </div>
            <div className="lucky-right">
              <div className="wheel-wrapper">
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeIndex}
                  data={wheelData}
                  spinDuration={0.5}
                  backgroundColors={[
                    "#002B49",
                    "#F5A623",
                    "#1B5E8C",
                    "#E8871A",
                  ]}
                  textColors={["#ffffff"]}
                  outerBorderColor="#002B49"
                  outerBorderWidth={4}
                  innerRadius={15}
                  innerBorderColor="#002B49"
                  innerBorderWidth={8}
                  radiusLineColor="#ffffff"
                  radiusLineWidth={2}
                  fontSize={18}
                  fontWeight="bold"
                  perpendicularText={false}
                  textDistance={60}
                  onStopSpinning={() => {
                    const won = wheelData[prizeIndex].option;
                    setMustSpin(false);
                    setWheelResult(won);
                    setSuccessMessage(`You won: ${won}! 🎉`);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <PurchaseModal
        isOpen={!!selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setError(null);
        }}
        onConfirm={handleConfirm}
        item={selectedItem}
        successMessage={successMessage}
        onDismissSuccess={() => setSuccessMessage(null)}
      />
    </>
  );
}

export default Prizes;