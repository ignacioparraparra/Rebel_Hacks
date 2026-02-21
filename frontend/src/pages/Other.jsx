import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Other.css";

const resources = [
  {
    category: "Food Assistance",
    icon: "bi-basket-fill",
    color: "var(--spirit-teal)",
    items: [
      { name: "Three Square Food Bank", address: "4190 N Pecos Rd, Las Vegas, NV 89115", phone: "(702) 644-3663", desc: "Southern Nevada's largest food bank. Free groceries and meals." },
      { name: "Catholic Charities of Southern Nevada", address: "1501 Las Vegas Blvd N, Las Vegas, NV 89101", phone: "(702) 385-2662", desc: "Hot meals served daily, no ID required." },
      { name: "The Salvation Army", address: "35 W Owens Ave, Las Vegas, NV 89030", phone: "(702) 649-8240", desc: "Food pantry and meal services for families." },
    ],
  },
  {
    category: "Water & Essentials",
    icon: "bi-droplet-fill",
    color: "var(--spirit-purple)",
    items: [
      { name: "HELP of Southern Nevada", address: "1640 E Flamingo Rd #100, Las Vegas, NV 89119", phone: "(702) 369-4357", desc: "Emergency assistance including water, hygiene kits, and utility help." },
      { name: "Nevada 211", address: "Dial 2-1-1", phone: "211", desc: "Free hotline connecting you to local resources for water, food, and more." },
    ],
  },
  {
    category: "Shelter & Housing",
    icon: "bi-house-heart-fill",
    color: "var(--spirit-red)",
    items: [
      { name: "Nevada Partnership for Homeless Youth", address: "4981 Shirley St, Las Vegas, NV 89119", phone: "(702) 383-1332", desc: "Safe shelter and services for homeless youth ages 16-24." },
      { name: "Shannon West Homeless Youth Center", address: "1650 E Flamingo Rd, Las Vegas, NV 89119", phone: "(702) 455-5000", desc: "Emergency and transitional housing for young people." },
      { name: "The Shade Tree", address: "1 W Owens Ave, Las Vegas, NV 89030", phone: "(702) 385-0072", desc: "Shelter for women, children, and families in crisis." },
    ],
  },
  {
    category: "Mental Health & Counseling",
    icon: "bi-heart-pulse-fill",
    color: "var(--accent)",
    items: [
      { name: "Crisis Support Services of Nevada", address: "Call or Text", phone: "988", desc: "24/7 suicide and crisis lifeline. Free, confidential support." },
      { name: "CCSD School Counselors", address: "Your school", phone: "Ask your front office", desc: "Free counseling available at every CCSD campus." },
    ],
  },
];

const contacts = [
  { label: "School Main Office", value: "(702) 555-0100", icon: "bi-telephone-fill" },
  { label: "Attendance Office", value: "(702) 555-0101", icon: "bi-calendar-check" },
  { label: "School Counselor", value: "(702) 555-0102", icon: "bi-person-heart" },
  { label: "ScholarChips Support", value: "support@scholarchips.org", icon: "bi-envelope-fill" },
];

function Other() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="other-page">
      <section className="other-hero anim-fade-up">
        <h1 className="other-title">Resources & Contact</h1>
        <p className="other-subtitle">
          Summerlin Campus &middot; School ID #2
        </p>
      </section>

      <section className="other-contacts anim-fade-up anim-delay-1">
        <h2 className="other-section-title">Contact Information</h2>
        <div className="other-contacts-grid">
          {contacts.map((c, i) => (
            <div className="glass other-contact-card" key={i}>
              <i className={`bi ${c.icon} other-contact-icon`}></i>
              <div className="other-contact-info">
                <span className="other-contact-label">{c.label}</span>
                <span className="other-contact-value">{c.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="other-resources anim-fade-up anim-delay-2">
        <h2 className="other-section-title">Local Resources</h2>
        <p className="other-resources-desc">
          If you or someone you know needs help, these local organizations are here for you.
        </p>

        <div className="other-resource-tabs">
          {resources.map((r, i) => (
            <button
              key={i}
              className={`other-tab${activeCategory === i ? " active" : ""}`}
              onClick={() => setActiveCategory(i)}
            >
              <i className={`bi ${r.icon}`}></i>
              <span>{r.category}</span>
            </button>
          ))}
        </div>

        <div className="other-resource-list">
          {resources[activeCategory].items.map((item, i) => (
            <div className="glass other-resource-card" key={i}>
              <div className="other-resource-header">
                <i
                  className={`bi ${resources[activeCategory].icon}`}
                  style={{ color: resources[activeCategory].color }}
                ></i>
                <h3>{item.name}</h3>
              </div>
              <p className="other-resource-desc">{item.desc}</p>
              <div className="other-resource-details">
                <span><i className="bi bi-geo-alt-fill"></i> {item.address}</span>
                <span><i className="bi bi-telephone-fill"></i> {item.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Other;
