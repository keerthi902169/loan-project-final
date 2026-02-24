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

// Pure SVG pie chart — matches screenshot exactly
function PieChart() {
  const data = [
    { label: "Excellent", pct: 32, color: "#3b82f6" },
    { label: "Good",      pct: 40, color: "#22c55e" },
    { label: "Poor",      pct: 12, color: "#ef4444" },
    { label: "Average",   pct: 16, color: "#f97316" },
  ];
  let angle = 0;
  const cx = 90, cy = 90, r = 70;
  const toRad = a => (a - 90) * Math.PI / 180;

  const sectors = data.map(d => {
    const start = angle;
    const sweep = (d.pct / 100) * 360;
    angle += sweep;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(start + sweep));
    const y2 = cy + r * Math.sin(toRad(start + sweep));
    return {
      ...d,
      path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${sweep > 180 ? 1 : 0},1 ${x2},${y2} Z`
    };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <svg width={180} height={180} viewBox="0 0 180 180">
        {sectors.map(s => <path key={s.label} d={s.path} fill={s.color} />)}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map(d => (
          <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0
            }} />
            <span style={{ fontSize: 13, color: d.color, fontWeight: 600 }}>
              {d.label} {d.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bar chart for Monthly Revenue
function RevenueChart() {
  const data = [
    { month: "Jan", value: 46000 },
    { month: "Feb", value: 52000 },
    { month: "Mar", value: 53000 },
    { month: "Apr", value: 48000 },
    { month: "May", value: 61000 },
    { month: "Jun", value: 57000 },
  ];
  const max = Math.max(...data.map(d => d.value));
  const H = 140;

  return (
    <div>
      {/* Y axis labels */}
      <div style={{ display: "flex", gap: 0 }}>
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          height: H, paddingRight: 8, fontSize: 11, color: "#a1a1aa", textAlign: "right"
        }}>
          {[80000,60000,40000,20000,0].map(v => (
            <span key={v}>{v.toLocaleString()}</span>
          ))}
        </div>
        {/* Bars */}
        <div style={{ flex: 1, position: "relative" }}>
          {/* Grid lines */}
          {[0,25,50,75,100].map(pct => (
            <div key={pct} style={{
              position: "absolute", left: 0, right: 0,
              top: `${pct}%`, borderTop: "1px dashed #e4e4e7"
            }} />
          ))}
          <div style={{
            display: "flex", alignItems: "flex-end",
            gap: 12, height: H, position: "relative", zIndex: 1
          }}>
            {data.map((d, i) => (
              <div key={d.month} style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end"
              }}>
                <div style={{
                  width: "60%",
                  height: `${(d.value / 80000) * 100}%`,
                  background: "#3b82f6",
                  borderRadius: "3px 3px 0 0",
                  minHeight: 4
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* X labels */}
      <div style={{ display: "flex", paddingLeft: 40, marginTop: 6 }}>
        {["Jan","Feb","Mar","Apr","May","Jun"].map(m => (
          <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#71717a" }}>
            {m}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 4 }}>
        <span style={{ fontSize: 12, color: "#3b82f6" }}>⊙ revenue</span>
      </div>
    </div>
  );
}

// Bar chart for Risk Distribution
function RiskChart() {
  const data = [
    { label: "Low",    count: 12, color: "#6366f1" },
    { label: "Medium", count: 8,  color: "#6366f1" },
    { label: "High",   count: 5,  color: "#6366f1" },
  ];
  const max = 12;
  const H = 140;

  return (
    <div>
      <div style={{ display: "flex", gap: 0 }}>
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          height: H, paddingRight: 8, fontSize: 11, color: "#a1a1aa", textAlign: "right"
        }}>
          {[12,9,6,3,0].map(v => <span key={v}>{v}</span>)}
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          {[0,25,50,75,100].map(pct => (
            <div key={pct} style={{
              position: "absolute", left: 0, right: 0,
              top: `${pct}%`, borderTop: "1px dashed #e4e4e7"
            }} />
          ))}
          <div style={{
            display: "flex", alignItems: "flex-end",
            gap: 28, height: H, position: "relative", zIndex: 1, padding: "0 20px"
          }}>
            {data.map(d => (
              <div key={d.label} style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end"
              }}>
                <div style={{
                  width: "60%",
                  height: `${(d.count / max) * 100}%`,
                  background: d.color,
                  borderRadius: "3px 3px 0 0"
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", paddingLeft: 40, marginTop: 6 }}>
        {data.map(d => (
          <div key={d.label} style={{
            flex: 1, textAlign: "center", fontSize: 11, color: "#71717a"
          }}>{d.label}</div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 4 }}>
        <span style={{ fontSize: 12, color: "#6366f1" }}>■ loans</span>
      </div>
    </div>
  );
}

export default function AnalystDashboard({ username, onChangeRole, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5" }}>
      <Navbar onChangeRole={onChangeRole} onLogout={onLogout} />

      <div style={{ padding: "28px 32px" }}>
        <p style={{ margin: "0 0 2px", fontSize: 13, color: "#71717a" }}>
          Welcome, {username} (analyst)
        </p>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", margin: "4px 0 28px"
        }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#18181b" }}>
            Analytics Overview
          </h1>
          <button style={{
            background: "#18181b", color: "#fff", border: "none",
            borderRadius: 10, padding: "10px 22px", fontWeight: 700, fontSize: 14
          }}>📋 View Reports</button>
        </div>

        {/* Stat cards */}
        <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
          <StatCard label="Total Loans"    value={25}      color="#3b82f6" icon="📄" />
          <StatCard label="Default Rate"   value="20%"     color="#ef4444" icon="📉" />
          <StatCard label="Total Disbursed" value="$2.5M"  color="#22c55e" icon="💲" />
          <StatCard label="Total Recovered" value="$1.8M"  color="#a855f7" icon="📈" />
        </div>

        {/* Revenue chart + Pie chart */}
        <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            flex: 2, minWidth: 320, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>
              Monthly Revenue
            </h3>
            <RevenueChart />
          </div>

          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            flex: 1, minWidth: 280, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>
              Loan Performance Distribution
            </h3>
            <PieChart />
          </div>
        </div>

        {/* Risk Distribution + Key Metrics */}
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            flex: 1, minWidth: 300, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>
              Risk Distribution
            </h3>
            <RiskChart />
          </div>

          <div style={{
            background: "#fff", borderRadius: 14, padding: 24,
            flex: 1, minWidth: 280, boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ margin: "0 0 18px", fontWeight: 700, fontSize: 16 }}>Key Metrics</h3>
            {[
              ["Active Loans",    12,      "#eff6ff", "#dbeafe"],
              ["Completed Loans",  8,      "#f0fdf4", "#dcfce7"],
              ["Defaulted Loans",  5,      "#fff1f2", "#fecdd3"],
              ["Recovery Rate",  "72.0%",  "#fafafa", "#f0f0f0"],
            ].map(([k, v, bg, border]) => (
              <div key={k} style={{
                background: bg, border: `1px solid ${border}`,
                borderRadius: 10, padding: "14px 18px", marginBottom: 10,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontSize: 14, color: "#52525b", fontWeight: 500 }}>{k}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#18181b" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}