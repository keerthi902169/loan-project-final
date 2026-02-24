import { useState } from "react";
import Navbar from "../components/Navbar";

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
    active:   { bg: "#18181b",  color: "#fff" },
    blocked:  { bg: "#ef4444",  color: "#fff" },
    approved: { bg: "#15803d",  color: "#dcfce7" },
    rejected: { bg: "#dc2626",  color: "#fff" },
    pending:  { bg: "#f4f4f5",  color: "#52525b", border: "1px solid #d4d4d8" },
    borrower: { bg: "#f4f4f5",  color: "#52525b", border: "1px solid #e4e4e7" },
    lender:   { bg: "#f4f4f5",  color: "#52525b", border: "1px solid #e4e4e7" },
    analyst:  { bg: "#f4f4f5",  color: "#52525b", border: "1px solid #e4e4e7" },
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

export default function AdminPanel({ username, users, loans, setUsers, onChangeRole, onLogout }) {
  const [view, setView] = useState("dashboard");

  const totalUsers   = users.length;
  const activeLoans  = loans.filter(l => l.status === "active").length;
  const pendingCount = loans.filter(l => l.status === "pending").length;
  const disbursed    = loans.filter(l => l.status === "active")
                            .reduce((s, l) => s + l.amount, 0);

  const toggleUser = (id) =>
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
    ));

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5" }}>
      <Navbar onChangeRole={onChangeRole} onLogout={onLogout} />

      <div style={{ padding: "28px 32px" }}>
        {/* Header */}
        <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#18181b" }}>
          Admin Dashboard
        </h1>
        <p style={{ margin: "0 0 28px", color: "#71717a", fontSize: 14 }}>
          Welcome, {username} (admin)
        </p>

        {/* ── DASHBOARD VIEW ── */}
        {view === "dashboard" && (
          <>
            {/* Stat cards */}
            <div style={{ display: "flex", gap: 18, marginBottom: 28, flexWrap: "wrap" }}>
              <StatCard label="Total Users"        value={totalUsers}                    color="#3b82f6" icon="👥" />
              <StatCard label="Active Loans"       value={activeLoans}                   color="#22c55e" icon="📄" />
              <StatCard label="Pending Approvals"  value={pendingCount}                  color="#f97316" icon="⏰" />
              <StatCard label="Total Disbursed"    value={`$${disbursed.toLocaleString()}`} color="#a855f7" icon="💲" />
            </div>

            {/* Quick Actions + Recent Activity */}
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <div style={{
                background: "#fff", borderRadius: 14, padding: 24,
                flex: 1, minWidth: 280, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}>
                <h3 style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 16 }}>Quick Actions</h3>
                <button
                  onClick={() => setView("users")}
                  style={{
                    display: "block", width: "100%", background: "#18181b", color: "#fff",
                    border: "none", borderRadius: 10, padding: "13px",
                    fontWeight: 700, fontSize: 14, marginBottom: 12
                  }}
                >Manage Users</button>
                <button
                  onClick={() => setView("loans")}
                  style={{
                    display: "block", width: "100%", background: "#fff", color: "#18181b",
                    border: "1px solid #e4e4e7", borderRadius: 10, padding: "13px",
                    fontWeight: 700, fontSize: 14
                  }}
                >View All Loans</button>
              </div>

              <div style={{
                background: "#fff", borderRadius: 14, padding: 24,
                flex: 2, minWidth: 300, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}>
                <h3 style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 16 }}>Recent Activity</h3>
                {[
                  ["New loan application", "2 hours ago"],
                  ["User registered",      "5 hours ago"],
                  ["Loan approved",        "1 day ago"],
                ].map(([a, t]) => (
                  <div key={a} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "11px 0", borderBottom: "1px solid #f4f4f5", fontSize: 14
                  }}>
                    <span style={{ color: "#18181b" }}>{a}</span>
                    <span style={{ color: "#a1a1aa" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── MANAGE USERS VIEW ── */}
        {view === "users" && (
          <div style={{
            background: "#fff", borderRadius: 14, padding: 28,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 20 }}>Manage Users</h2>
              <button
                onClick={() => setView("dashboard")}
                style={{
                  background: "transparent", border: "1px solid #e4e4e7",
                  borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500
                }}
              >← Back</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f4f4f5" }}>
                  {["Name","Email","Role","Status","Joined Date","Actions"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 14px",
                      fontSize: 13, color: "#71717a", fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #f4f4f5" }}>
                    <td style={{ padding: "14px", fontSize: 14, fontWeight: 500 }}>{u.name}</td>
                    <td style={{ padding: "14px", fontSize: 14, color: "#52525b" }}>{u.email}</td>
                    <td style={{ padding: "14px" }}><Badge status={u.role} /></td>
                    <td style={{ padding: "14px" }}><Badge status={u.status} /></td>
                    <td style={{ padding: "14px", fontSize: 14, color: "#52525b" }}>{u.joined}</td>
                    <td style={{ padding: "14px" }}>
                      <button
                        onClick={() => toggleUser(u.id)}
                        style={{
                          background: u.status === "active" ? "#ef4444" : "#18181b",
                          color: "#fff", border: "none", borderRadius: 8,
                          padding: "7px 18px", fontWeight: 700, fontSize: 13
                        }}
                      >
                        {u.status === "active" ? "⊗ Block" : "✓ Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── ALL LOANS VIEW ── */}
        {view === "loans" && (
          <div style={{
            background: "#fff", borderRadius: 14, padding: 28,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 20 }}>All Loans</h2>
              <button
                onClick={() => setView("dashboard")}
                style={{
                  background: "transparent", border: "1px solid #e4e4e7",
                  borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500
                }}
              >← Back</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f4f4f5" }}>
                  {["Loan ID","Borrower","Lender","Amount","Purpose","Duration","Status","Applied Date"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 14px",
                      fontSize: 13, color: "#71717a", fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loans.map(l => (
                  <tr key={l.id} style={{ borderBottom: "1px solid #f4f4f5" }}>
                    <td style={{ padding: "14px", fontWeight: 700, fontSize: 13, color: "#6366f1" }}>{l.id}</td>
                    <td style={{ padding: "14px", fontSize: 14 }}>{l.borrower}</td>
                    <td style={{ padding: "14px", fontSize: 14 }}>{l.lender}</td>
                    <td style={{ padding: "14px", fontSize: 14, fontWeight: 600 }}>${l.amount.toLocaleString()}</td>
                    <td style={{ padding: "14px", fontSize: 14 }}>{l.purpose}</td>
                    <td style={{ padding: "14px", fontSize: 14 }}>{l.duration} months</td>
                    <td style={{ padding: "14px" }}><Badge status={l.status} /></td>
                    <td style={{ padding: "14px", fontSize: 14 }}>{l.applied}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}