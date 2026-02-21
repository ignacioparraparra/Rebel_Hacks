import { createPortal } from "react-dom";
import "./PurchaseModal.css";

function PurchaseModal({ isOpen, onClose, onConfirm, item, successMessage, onDismissSuccess }) {
  // Success popup — shown after a purchase completes
  if (successMessage) {
    return createPortal(
      <div className="modal-overlay">
        <div className="modal-backdrop" onClick={onDismissSuccess} />
        <div className="modal-box">
          <div className="modal-success-icon">🎉</div>
          <div className="modal-text">
            <h3>Redeemed!</h3>
            <p className="modal-sub">{successMessage}</p>
          </div>
          <div className="modal-buttons">
            <button className="modal-btn-confirm" onClick={onDismissSuccess}>
              Dismiss
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  if (!isOpen || !item) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-box">
        <div className="modal-icon">
          <img src={item.icon} alt={item.title} />
        </div>
        <div className="modal-text">
          <h3>Confirm Purchase</h3>
          <p className="modal-sub">Are you sure you want to redeem</p>
          <p className="modal-title">{item.title}</p>
        </div>
        <div className="modal-cost">
          <p className="modal-cost-label">Cost</p>
          <p className="modal-cost-amount">{item.cost}</p>
        </div>
        <div className="modal-buttons">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn-confirm"
            onClick={() => {
              onConfirm(item);
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PurchaseModal;