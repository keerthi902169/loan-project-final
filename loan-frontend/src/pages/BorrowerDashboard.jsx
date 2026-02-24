import { useState } from "react";
import Navbar from "../components/Navbar";

const PURPOSES  = ["Home Renovation","Business Expansion","Education",
                   "Medical Emergency","Vehicle Purchase","Personal","Travel","Wedding"];
const DURATIONS = [6, 12, 18, 24, 36, 48, 60];

function calcEMI(p, r, m) {
  if (!p || !m) return 0;
  const mr = r / 12 / 100;
  return Math.round((p * mr * Math.pow(1 + mr, m)) / (Math.pow(1 + mr, m) - 1));
}
function calcOutstanding(p, r, m, paid) {
  return Math.max(0, Math.round(p - paid * calcEMI(p, r, m) * 0.6));
}

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "22px 24px",
      flex: 1, minWidth: 180,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 13, color: "#71717a", fontWeight: 500 }}>{label}</span>
        <div style={{
          background: color, borderRadius: 10, width: 38, height: 38,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
        }}>{icon}</div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#18181b", marginTop: 10 }}>{value}</div>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    active:   { bg: "#18181b", color: "#fff" },
    rejected: { bg: "#dc2626", color: "#fff" },
    pending:  { bg: "#f4f4f5", color: "#52525b", border: "1px solid #d4d4d8" },
    approved: { bg: "#15803d", color: "#dcfce7" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      background: s.bg, color: s.color, border: s.border || "none",
      padding: "4px 12px", borderRadius: 9999,
      fontSize: 12, fontWeight: 600, textTransform: "capitalize"
    }}>{status}</span>
  );
}

export default function BorrowerDashboard({ username, loans, setLoans, onChangeRole, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [form, setForm] = useState({ amount: "", purpose: "", duration: "", notes: "" });

  // Only show John Doe's loans as the logged-in borrower
  const myLoans    = loans.filter(l => l.borrower === "John Doe");
  const active     = myLoans.filter(l => l.status === "active");
  const totalAmt   = active.reduce((s, l) => s + l.amount, 0);
  const balance    = active.reduce((s, l) =>
    s + calcOutstanding(l.amount, l.interestRate, l.duration, l.paidEmis), 0);
  const nextEMI    = active.length > 0
    ? calcEMI(active[0].amount, active[0].interestRate, active[0].duration) : 0;
  const estimatedEMI = form.amount && form.duration
    ? calcEMI(parseFloat(form.amount), 8.5, parseInt(form.duration)) : 0;

  const handleSubmit = () => {
    if (!form.amount || !form.purpose || !form.duration)
      return alert("Please fill all required fields");
    setLoans(prev => [...prev, {
      id: `L00${prev.length + 1}`,
      borrower: "John Doe", lender: "Jane Smith",
      amount: parseFloat(form.amount), purpose: form.purpose,
      duration: parseInt(form.duration), status: "pending",
      applied: new Date().toISOString().slice(0, 10),
      approved: null, paidEmis: 0, interestRate: 8.5
    }]);
    setForm({ amount: "", purpose: "", duration: "", notes: "" });
    setView("loans");
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: "1px solid #e4e4e7", fontSize: 14, outline: "none",
    boxSizing: "border-box", background: "#f4f4f5", marginTop: 6
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5" }}>
      <Navbar onChangeRole={onChangeRole} onLogout={onLogout} />

      <div style={{ padding: "28px 32px" }}>
        <p style={{ margin: "0 0 2px", fontSize: 13, color: "#71717a" }}>
          Welcome, {username} (borrower)
        </p>

        {/* ── DASHBOARD ── */}
        {view === "dashboard" && (
          <>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", margin: "4px 0 28px"
            }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#18181b" }}>
                My Dashboard
              </h1>
              <button
                onClick={() => setView("apply")}
                style={{
                  background: "#18181b", color: "#fff", border: "none",
                  borderRadius: 10, padding: "10px 22px", fontWeight: 700, fontSize: 14
                }}
              >+ Apply for Loan</button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
              <StatCard label="My Loans"          value={myLoans.length}                   color="#3b82f6" icon="📄" />
              <StatCard label="Total Loan Amount" value={`$${totalAmt.toLocaleString()}`}  color="#22c55e" icon="💲" />
              <StatCard label="Loan Balance"      value={`$${Math.round(balance).toLocaleString()}`} color="#f97316" icon="💲" />
              <StatCard label="Next EMI"          value={`$${nextEMI.toLocaleString()}`}   color="#a855f7" icon="📅" />
            </div>

            {/* My Loans list + EMI Status */}
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <div style={{
                background: "#fff", borderRadius: 14, padding: 24,
                flex: 1, minWidth: 300, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 18
                }}>
                  <h3 style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>My Loans</h3>
                  <button
                    onClick={() => setView("loans")}
                    style={{
                      background: "transparent", border: "1px solid #e4e4e7",
                      borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600
                    }}
                  >View All</button>
                </div>
                {myLoans.map(l => (
                  <div key={l.id} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f4f4f5"
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{l.purpose}</div>
                      <div style={{ fontSize: 12, color: "#71717a" }}>
                        ${l.amount.toLocaleString()} - {l.duration} months
                      </div>
                    </div>
                    <Badge status={l.status} />
                  </div>
                ))}
              </div>

              <div style={{
                background: "#fff", borderRadius: 14, padding: 24,
                flex: 1, minWidth: 280, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}>
                <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>EMI Status</h3>
                {active.map(l => (
                  <div key={l.id} style={{ marginBottom: 20 }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: 8, fontSize: 14, fontWeight: 500
                    }}>
                      <span>{l.purpose}</span>
                      <span style={{ color: "#71717a" }}>{l.paidEmis} / {l.duration} EMIs</span>
                    </div>
                    <div style={{
                      background: "#f4f4f5", borderRadius: 999, height: 8, overflow: "hidden"
                    }}>
                      <div style={{
                        background: "#3b82f6", height: "100%",
                        width: `${(l.paidEmis / l.duration) * 100}%`, borderRadius: 999
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── LOAN STATUS ── */}
        {view === "loans" && (
          <div>
            <h1 style={{ margin: "0 0 24px", fontSize: 22, fontWeight: 800, color: "#18181b" }}>
              Loan Status
            </h1>
            {myLoans.map(l => {
              const emi         = calcEMI(l.amount, l.interestRate, l.duration);
              const outstanding = calcOutstanding(l.amount, l.interestRate, l.duration, l.paidEmis);
              return (
                <div key={l.id} style={{
                  background: "#fff", borderRadius: 14, padding: 28,
                  marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: 24
                  }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>
                        {l.purpose}
                      </h3>
                      <span style={{ fontSize: 13, color: "#71717a" }}>Loan ID: {l.id}</span>
                    </div>
                    <Badge status={l.status} />
                  </div>

                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "20px 60px", marginBottom: 20
                  }}>
                    {[
                      ["Loan Amount",        `$${l.amount.toLocaleString()}`],
                      ["EMI Amount",         `$${emi.toLocaleString()}`],
                      ["Duration",           `${l.duration} months`],
                      ["Paid EMIs",          `${l.paidEmis} / ${l.duration}`],
                      ["Interest Rate",      `${l.interestRate}% p.a.`],
                      ["Outstanding Balance",`$${outstanding.toLocaleString()}`],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 12, color: "#a1a1aa", marginBottom: 4 }}>{k}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#18181b" }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Status banner */}
                  <div style={{
                    background: l.status === "active" ? "#f0fdf4"
                              : l.status === "rejected" ? "#fef2f2" : "#fafafa",
                    borderRadius: 10, padding: "12px 16px",
                    display: "flex", alignItems: "center", gap: 10
                  }}>
                    <span style={{ fontSize: 18 }}>
                      {l.status === "active" ? "✅" : l.status === "rejected" ? "❌" : "⏳"}
                    </span>
                    <div>
                      <div style={{
                        fontSize: 14, fontWeight: 600,
                        color: l.status === "active" ? "#166534"
                             : l.status === "rejected" ? "#991b1b" : "#92400e"
                      }}>
                        {l.status === "active"   ? "Your loan is active"
                        : l.status === "rejected" ? "Your loan application was rejected"
                        : "Pending approval"}
                      </div>
                      <div style={{ fontSize: 12, color: "#71717a" }}>
                        Applied on: {l.applied}
                        {l.approved ? ` • Approved on: ${l.approved}` : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── APPLY FOR LOAN ── */}
        {view === "apply" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{
              background: "#fff", borderRadius: 16, padding: "32px 36px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>
              <h2 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 20 }}>Apply for Loan</h2>
              <p style={{ margin: "0 0 24px", color: "#71717a", fontSize: 14 }}>
                Fill in the details to submit your loan application
              </p>

              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginTop: 16 }}>
                Loan Amount ($)
              </label>
              <input
                value={form.amount}
                onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                type="number" placeholder="Enter amount"
                style={inputStyle}
              />

              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginTop: 16 }}>
                Purpose
              </label>
              <select
                value={form.purpose}
                onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))}
                style={inputStyle}
              >
                <option value="">Select loan purpose</option>
                {PURPOSES.map(p => <option key={p}>{p}</option>)}
              </select>

              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginTop: 16 }}>
                Duration (months)
              </label>
              <select
                value={form.duration}
                onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                style={inputStyle}
              >
                <option value="">Select duration</option>
                {DURATIONS.map(d => <option key={d}>{d}</option>)}
              </select>

              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginTop: 16 }}>
                Additional Details (Optional)
              </label>
              <textarea
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="Provide any additional information..."
                style={{ ...inputStyle, height: 90, resize: "vertical" }}
              />

              {/* Estimated Details box */}
              <div style={{
                background: "#eff6ff", borderRadius: 12,
                padding: "18px 20px", marginTop: 20
              }}>
                <h4 style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15 }}>
                  Estimated Details
                </h4>
                <div style={{ fontSize: 13, color: "#3b82f6", lineHeight: 2 }}>
                  <div>Interest Rate: 8.5% per annum</div>
                  <div>Processing Fee: 2% of loan amount</div>
                  <div>Estimated EMI: ${estimatedEMI.toLocaleString()} per month</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1, background: "#18181b", color: "#fff", border: "none",
                    borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 15
                  }}
                >Submit Application</button>
                <button
                  onClick={() => setView("dashboard")}
                  style={{
                    flex: 1, background: "#fff", color: "#18181b",
                    border: "1px solid #e4e4e7", borderRadius: 10,
                    padding: "13px", fontWeight: 700, fontSize: 15
                  }}
                >Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}