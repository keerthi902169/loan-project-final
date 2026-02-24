import { useState } from "react";
import Navbar from "../components/Navbar";

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

export default function LenderDashboard({ username, loans, setLoans, onChangeRole, onLogout }) {
  const myLoans  = loans.filter(l => l.lender === "Jane Smith");
  const active   = myLoans.filter(l => l.status === "active");
  const pending  = myLoans.filter(l => l.status === "pending");
  const disbursed = active.reduce((s, l) => s + l.amount, 0);
  const interest  = active.reduce((s, l) =>
    s + Math.round(l.amount * l.interestRate / 100 * l.duration / 12), 0);

  const approve = (id) => setLoans(prev => prev.map(l =>
    l.id === id ? { ...l, status: "active", approved: new Date().toISOString().slice(0,10) } : l
  ));
  const reject = (id) => setLoans(prev => prev.map(l =>
    l.id === id ? { ...l, status: "rejected" } : l
  ));

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5" }}>
      <Navbar onChangeRole={onChangeRole} onLogout={onLogout} />

      <div style={{ padding: "28px 32px" }}>
        {/* Header */}
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#71717a" }}>
          Welcome, {username} (lender)
        </p>
        <h1 style={{ margin: "0 0 28px", fontSize: 24, fontWeight: 800, color: "#18181b" }}>
          Lender Dashboard
        </h1>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
          <StatCard label="Total Loans"      value={myLoans.length}                  color="#3b82f6" icon="📄" />
          <StatCard label="Active Loans"     value={active.length}                   color="#22c55e" icon="📈" />
          <StatCard label="Total Disbursed"  value={`$${disbursed.toLocaleString()}`} color="#a855f7" icon="💲" />
          <StatCard label="Expected Interest" value={`$${interest.toLocaleString()}`} color="#f97316" icon="💲" />
        </div>

        {/* Pending Requests + Active Borrowers */}
        <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
          {/* Pending */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            flex: 1, minWidth: 300, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 16 }}>
              Pending Loan Requests
            </h3>
            {pending.length === 0
              ? <p style={{ color: "#a1a1aa", fontSize: 14 }}>No pending requests</p>
              : pending.map(l => (
                <div key={l.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 0", borderBottom: "1px solid #f4f4f5"
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{l.borrower}</div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>
                      ${l.amount.toLocaleString()} - {l.purpose}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => approve(l.id)}
                      style={{
                        background: "#18181b", color: "#fff", border: "none",
                        borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13
                      }}
                    >Approve</button>
                    <button
                      onClick={() => reject(l.id)}
                      style={{
                        background: "#fff", color: "#18181b",
                        border: "1px solid #e4e4e7",
                        borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 13
                      }}
                    >Reject</button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Active Borrowers */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            flex: 1, minWidth: 300, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 16 }}>
              Active Borrowers
            </h3>
            {active.map(l => (
              <div key={l.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderBottom: "1px solid #f4f4f5"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    background: "#3b82f6", width: 38, height: 38, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 15
                  }}>{l.borrower[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{l.borrower}</div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>
                      {l.paidEmis}/{l.duration} EMIs paid
                    </div>
                  </div>
                </div>
                <span style={{
                  background: "#18181b", color: "#fff",
                  padding: "4px 12px", borderRadius: 9999, fontSize: 12, fontWeight: 600
                }}>Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Tracking */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: 24,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
        }}>
          <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>Payment Tracking</h3>
          {active.map(l => {
            const outstanding = calcOutstanding(l.amount, l.interestRate, l.duration, l.paidEmis);
            const emi = calcEMI(l.amount, l.interestRate, l.duration);
            const pct = Math.round((l.paidEmis / l.duration) * 100);
            return (
              <div key={l.id} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                      {l.borrower} - {l.purpose}
                    </div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>
                      Loan ID: {l.id} • EMI: ${emi.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>
                      ${outstanding.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>Outstanding</div>
                  </div>
                </div>
                <div style={{
                  background: "#f4f4f5", borderRadius: 999, height: 7, overflow: "hidden"
                }}>
                  <div style={{
                    background: "#22c55e", height: "100%",
                    width: `${pct}%`, borderRadius: 999
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}