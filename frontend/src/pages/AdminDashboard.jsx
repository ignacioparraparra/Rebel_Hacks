import { useState } from "react";
import "./AdminDashboard.css";

const API = "http://localhost:7777";
const SCHOOL_ID = 2;

function AdminDashboard() {
  const [rosterFile, setRosterFile] = useState(null);
  const [rosterMsg, setRosterMsg] = useState("");

  const [attendanceFile, setAttendanceFile] = useState(null);
  const [attendanceMsg, setAttendanceMsg] = useState("");

  const [studentId, setStudentId] = useState("");
  const [chipAmount, setChipAmount] = useState("");
  const [chipMsg, setChipMsg] = useState("");

  async function uploadRoster(e) {
    e.preventDefault();
    if (!rosterFile) return;
    const fd = new FormData();
    fd.append("roster", rosterFile);
    try {
      const res = await fetch(`${API}/school/${SCHOOL_ID}/roster`, { method: "POST", body: fd });
      const data = await res.json();
      setRosterMsg(res.ok ? `Roster uploaded — ${data.inserted} students added` : (data.message || "Upload failed"));
    } catch {
      setRosterMsg("Network error");
    }
  }

  async function uploadAttendance(e) {
    e.preventDefault();
    if (!attendanceFile) return;
    const fd = new FormData();
    fd.append("roster", attendanceFile);
    try {
      const res = await fetch(`${API}/school/${SCHOOL_ID}/attendance`, { method: "POST", body: fd });
      const data = await res.json();
      setAttendanceMsg(res.ok ? `Attendance processed — ${data.total_chips_awarded} chips awarded` : (data.message || "Upload failed"));
    } catch {
      setAttendanceMsg("Network error");
    }
  }

  async function sendChips(e) {
    e.preventDefault();
    if (!studentId || !chipAmount) return;
    try {
      const res = await fetch(`${API}/transaction/chips/${SCHOOL_ID}/${studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(chipAmount) }),
      });
      const data = await res.json();
      setChipMsg(res.ok ? `Sent ${chipAmount} chips!` : (data.message || "Transaction failed"));
      if (res.ok) setChipAmount("");
    } catch {
      setChipMsg("Network error");
    }
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title anim-fade-up">
        admin dashboard for cool people
      </h1>

      {/* roster */}
      <section className="glass admin-section anim-fade-up anim-delay-1">
        <h2 className="section-title">Upload Roster CSV</h2>
        <form onSubmit={uploadRoster} className="admin-form">
          <input type="file" accept=".csv" onChange={e => setRosterFile(e.target.files[0])} />
          <button className="btn btn-primary" type="submit" disabled={!rosterFile}>Upload Roster</button>
        </form>
        {rosterMsg && <p className="admin-msg">{rosterMsg}</p>}
      </section>

      {/* attendance */}
      <section className="glass admin-section anim-fade-up anim-delay-2">
        <h2 className="section-title">Upload Attendance CSV</h2>
        <form onSubmit={uploadAttendance} className="admin-form">
          <input type="file" accept=".csv" onChange={e => setAttendanceFile(e.target.files[0])} />
          <button className="btn btn-primary" type="submit" disabled={!attendanceFile}>Upload Attendance</button>
        </form>
        {attendanceMsg && <p className="admin-msg">{attendanceMsg}</p>}
      </section>

      {/* chips */}
      <section className="glass admin-section anim-fade-up anim-delay-3">
        <h2 className="section-title">Award SHMONEY</h2>
        <form onSubmit={sendChips} className="admin-form">
          <label className="label">
            Student ID
            <input className="input" type="text" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="e.g. 10001" />
          </label>
          <label className="label">
            Amount
            <input className="input" type="number" value={chipAmount} onChange={e => setChipAmount(e.target.value)} placeholder="e.g. 50" />
          </label>
          <button className="btn btn-gold" type="submit" disabled={!studentId || !chipAmount}>Send Chips</button>
        </form>
        {chipMsg && <p className="admin-msg">{chipMsg}</p>}
      </section>
    </div>
  );
}

export default AdminDashboard;
