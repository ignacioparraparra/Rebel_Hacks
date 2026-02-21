import { useState } from "react";
import PurchaseModal from "../components/PurchaseModal";
import "./prizes.css";
import waow from "../assets/waow.jpg";

const shopItems = [
  { id: 1, icon: waow, title: "Homework Pass", cost: 15 },
  { id: 2, icon: waow, title: "School Hoodie", cost: 25 },
  { id: 3, icon: waow, title: "Food Voucher", cost: 5 },
  { id: 6, icon: waow, title: "Spin The Wheel", cost: 10 },
];

function Prizes() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleConfirm = (item) => {
    console.log("Purchased:", item);
  };

  return (
    <>
      <div className="shop-page">
        <h1>Prizes</h1>
        <div className="shop-container">
          {shopItems.map((item) => (
            <div className="shop-item" key={item.id}>
              <div className="item-icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <p className="item-title">{item.title}</p>
              <button className="redeem-btn" onClick={() => setSelectedItem(item)}>
                {item.cost}
              </button>
            </div>
          ))}
        </div>
      </div>

      <PurchaseModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={handleConfirm}
        item={selectedItem}
      />
    </>
  );
}

export default Prizes;