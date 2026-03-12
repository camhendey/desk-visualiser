import { useState, useCallback } from "react";

const TOTAL_LENGTH = 110;
const MIN_OPEN = 40;
const MAX_OPEN = 80;
const DESK_DEPTH = 60;
const DESK_HEIGHT = 75;
const DRAWER_UNIT_MIN = 30;
const DRAWER_UNIT_MAX = 70;

export default function App() {
  const [openWidth, setOpenWidth] = useState(60);
  const [numDrawers, setNumDrawers] = useState(3);
  const [drawerHeights, setDrawerHeights] = useState([15, 20, 25]);
  const [depth, setDepth] = useState(DESK_DEPTH);
  const [height, setHeight] = useState(DESK_HEIGHT);

  const drawerUnitWidth = TOTAL_LENGTH - openWidth;
  const topThickness = 3;
  const sideThickness = 2;
  const innerDrawerH = height - topThickness - 4;
  const totalDrawerH = drawerHeights.slice(0, numDrawers).reduce((a, b) => a + b, 0);
  const remaining = innerDrawerH - totalDrawerH - numDrawers * 2;

  const updateDrawerHeight = useCallback((i, val) => {
    setDrawerHeights(prev => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  }, []);

  const addDrawer = () => {
    if (numDrawers < 6) {
      setNumDrawers(n => n + 1);
      setDrawerHeights(prev => [...prev, 15]);
    }
  };
  const removeDrawer = () => numDrawers > 1 && setNumDrawers(n => n - 1);

  const scale = 3.2;
  const svgW = TOTAL_LENGTH * scale + 80;
  const svgH = height * scale + 80;

  const wood = "#c8924a";
  const woodDark = "#a06c2e";
  const woodLight = "#e3b878";
  const drawerColors = ["#b8843e","#c8924a","#d9a55e","#e3b878","#c07a38","#aa6e30"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1208",
      fontFamily: "'Georgia', serif",
      color: "#e8d5b0",
      padding: "32px 24px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#9a7a4a", textTransform: "uppercase", marginBottom: 6 }}>
            Workshop Planner
          </div>
          <h1 style={{ fontSize: 32, fontWeight: "normal", color: "#e8d5b0", margin: 0, letterSpacing: 1 }}>
            Wooden Desk Designer
          </h1>
          <div style={{ marginTop: 8, color: "#9a7a4a", fontSize: 14 }}>Total length fixed at <strong style={{color:"#c8924a"}}>110 cm</strong></div>
        </div>

        {/* SVG Preview */}
        <div style={{
          background: "#241a0a",
          border: "1px solid #4a3415",
          borderRadius: 8,
          padding: "24px 16px 16px",
          marginBottom: 28,
          overflowX: "auto",
        }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#6a5030", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>
            Front View
          </div>
          <svg width={svgW} height={svgH + 30} style={{ display: "block", margin: "0 auto" }}>
            {/* Labels top */}
            <text x={40 + openWidth * scale / 2} y={22} textAnchor="middle" fill="#7a6040" fontSize={11} fontFamily="Georgia">
              Open — {openWidth} cm
            </text>
            <text x={40 + openWidth * scale + drawerUnitWidth * scale / 2} y={22} textAnchor="middle" fill="#c8924a" fontSize={11} fontFamily="Georgia">
              Drawers — {drawerUnitWidth} cm
            </text>

            {/* Top surface */}
            <rect x={40} y={32} width={TOTAL_LENGTH * scale} height={topThickness * scale} fill={woodLight} rx={2} />
            {/* Wood grain lines on top */}
            {[0.3, 0.6, 0.75].map((f, i) => (
              <line key={i} x1={40 + TOTAL_LENGTH * scale * f} y1={32} x2={40 + TOTAL_LENGTH * scale * f} y2={32 + topThickness * scale}
                stroke={woodDark} strokeWidth={0.6} opacity={0.4} />
            ))}

            {/* Open side legs */}
            <rect x={40} y={32 + topThickness * scale} width={sideThickness * scale} height={(height - topThickness) * scale} fill={woodDark} rx={1} />

            {/* Open area label */}
            <text x={40 + openWidth * scale / 2} y={32 + topThickness * scale + (height - topThickness) * scale / 2}
              textAnchor="middle" fill="#4a3415" fontSize={13} fontFamily="Georgia" fontStyle="italic">
              Chair space
            </text>

            {/* Drawer unit box */}
            <rect x={40 + openWidth * scale} y={32 + topThickness * scale}
              width={drawerUnitWidth * scale} height={(height - topThickness) * scale}
              fill={wood} rx={2} />

            {/* Drawer unit side panels */}
            <rect x={40 + openWidth * scale} y={32 + topThickness * scale}
              width={sideThickness * scale} height={(height - topThickness) * scale}
              fill={woodDark} />
            <rect x={40 + TOTAL_LENGTH * scale - sideThickness * scale} y={32 + topThickness * scale}
              width={sideThickness * scale} height={(height - topThickness) * scale}
              fill={woodDark} />

            {/* Drawers */}
            {(() => {
              let y = 32 + topThickness * scale + 2 * scale;
              return drawerHeights.slice(0, numDrawers).map((dh, i) => {
                const dy = y;
                y += (dh + 2) * scale;
                const dw = (drawerUnitWidth - sideThickness * 2) * scale - 8;
                const dx = 40 + openWidth * scale + sideThickness * scale + 4;
                return (
                  <g key={i}>
                    <rect x={dx} y={dy} width={dw} height={dh * scale - 3} fill={drawerColors[i % drawerColors.length]} rx={2} />
                    {/* Handle */}
                    <rect x={dx + dw / 2 - 16} y={dy + dh * scale / 2 - 4} width={32} height={7} fill={woodDark} rx={3} />
                    {/* Grain */}
                    {[0.25, 0.5, 0.75].map((f, j) => (
                      <line key={j} x1={dx + dw * f} y1={dy + 2} x2={dx + dw * f} y2={dy + dh * scale - 5}
                        stroke={woodLight} strokeWidth={0.5} opacity={0.25} />
                    ))}
                    {/* Drawer height label */}
                    <text x={dx + dw + 8} y={dy + dh * scale / 2 + 4} fill="#9a7a4a" fontSize={10} fontFamily="Georgia">{dh} cm</text>
                  </g>
                );
              });
            })()}

            {/* Bottom */}
            <rect x={40 + openWidth * scale} y={32 + height * scale - 2 * scale}
              width={drawerUnitWidth * scale} height={2 * scale} fill={woodDark} rx={1} />

            {/* Height arrow */}
            <line x1={28} y1={32} x2={28} y2={32 + height * scale} stroke="#4a3415" strokeWidth={1} />
            <polygon points={`28,32 25,40 31,40`} fill="#4a3415" />
            <polygon points={`28,${32 + height * scale} 25,${32 + height * scale - 8} 31,${32 + height * scale - 8}`} fill="#4a3415" />
            <text x={20} y={32 + height * scale / 2} textAnchor="middle" fill="#6a5030" fontSize={10}
              transform={`rotate(-90, 20, ${32 + height * scale / 2})`} fontFamily="Georgia">
              {height} cm
            </text>

            {/* Total width arrow */}
            <line x1={40} y1={svgH + 10} x2={40 + TOTAL_LENGTH * scale} y2={svgH + 10} stroke="#4a3415" strokeWidth={1} />
            <polygon points={`40,${svgH + 10} 48,${svgH + 7} 48,${svgH + 13}`} fill="#4a3415" />
            <polygon points={`${40 + TOTAL_LENGTH * scale},${svgH + 10} ${40 + TOTAL_LENGTH * scale - 8},${svgH + 7} ${40 + TOTAL_LENGTH * scale - 8},${svgH + 13}`} fill="#4a3415" />
            <text x={40 + TOTAL_LENGTH * scale / 2} y={svgH + 24} textAnchor="middle" fill="#c8924a" fontSize={12} fontFamily="Georgia">
              110 cm total
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {/* Desk dimensions */}
          <div style={{ background: "#241a0a", border: "1px solid #3a2810", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6a5030", textTransform: "uppercase", marginBottom: 16 }}>Desk Dimensions</div>

            <label style={{ display: "block", marginBottom: 4, fontSize: 13, color: "#9a7a4a" }}>
              Open (chair) side: <strong style={{ color: "#e8d5b0" }}>{openWidth} cm</strong>
            </label>
            <input type="range" min={MIN_OPEN} max={MAX_OPEN} value={openWidth}
              onChange={e => setOpenWidth(+e.target.value)}
              style={{ width: "100%", accentColor: "#c8924a", marginBottom: 14 }} />

            <label style={{ display: "block", marginBottom: 4, fontSize: 13, color: "#9a7a4a" }}>
              Desk depth: <strong style={{ color: "#e8d5b0" }}>{depth} cm</strong>
            </label>
            <input type="range" min={40} max={80} value={depth}
              onChange={e => setDepth(+e.target.value)}
              style={{ width: "100%", accentColor: "#c8924a", marginBottom: 14 }} />

            <label style={{ display: "block", marginBottom: 4, fontSize: 13, color: "#9a7a4a" }}>
              Desk height: <strong style={{ color: "#e8d5b0" }}>{height} cm</strong>
            </label>
            <input type="range" min={68} max={82} value={height}
              onChange={e => setHeight(+e.target.value)}
              style={{ width: "100%", accentColor: "#c8924a" }} />
          </div>

          {/* Drawer config */}
          <div style={{ background: "#241a0a", border: "1px solid #3a2810", borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6a5030", textTransform: "uppercase", marginBottom: 16 }}>Drawer Config</div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "#9a7a4a" }}>Number of drawers:</span>
              <button onClick={removeDrawer} style={{ background: "#3a2810", border: "1px solid #5a3a18", color: "#e8d5b0", width: 28, height: 28, borderRadius: 4, cursor: "pointer", fontSize: 16 }}>−</button>
              <strong style={{ color: "#c8924a", fontSize: 18, minWidth: 20, textAlign: "center" }}>{numDrawers}</strong>
              <button onClick={addDrawer} style={{ background: "#3a2810", border: "1px solid #5a3a18", color: "#e8d5b0", width: 28, height: 28, borderRadius: 4, cursor: "pointer", fontSize: 16 }}>+</button>
            </div>

            {drawerHeights.slice(0, numDrawers).map((dh, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: "#9a7a4a" }}>
                  Drawer {i + 1}: <strong style={{ color: drawerColors[i % drawerColors.length] }}>{dh} cm</strong>
                </label>
                <input type="range" min={8} max={35} value={dh}
                  onChange={e => updateDrawerHeight(i, +e.target.value)}
                  style={{ width: "100%", accentColor: drawerColors[i % drawerColors.length] }} />
              </div>
            ))}

            <div style={{
              marginTop: 12, padding: "8px 12px", borderRadius: 6,
              background: remaining >= 0 ? "#1a2e0a" : "#2e0a0a",
              border: `1px solid ${remaining >= 0 ? "#3a5a18" : "#5a1a18"}`,
              fontSize: 12,
              color: remaining >= 0 ? "#7ac050" : "#e05050",
            }}>
              {remaining >= 0
                ? `✓ ${remaining} cm of space remaining inside unit`
                : `✗ Drawers overflow by ${Math.abs(remaining)} cm — reduce sizes`}
            </div>
          </div>
        </div>

        {/* Summary table */}
        <div style={{ background: "#241a0a", border: "1px solid #3a2810", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#6a5030", textTransform: "uppercase", marginBottom: 16 }}>Cut List Summary</div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "8px 0", fontSize: 13 }}>
            {[
              ["Part", "Width", "Depth", "Thickness", true],
              ["Desktop (top panel)", `${TOTAL_LENGTH} cm`, `${depth} cm`, "3 cm", false],
              ["Drawer unit — left side", `${height - 3} cm`, `${depth} cm`, "2 cm", false],
              ["Drawer unit — right side", `${height - 3} cm`, `${depth} cm`, "2 cm", false],
              ["Drawer unit — back panel", `${drawerUnitWidth} cm`, `${depth} cm`, "1.5 cm", false],
              ["Drawer unit — bottom", `${drawerUnitWidth - 4} cm`, `${depth - 2} cm`, "1.8 cm", false],
              ...drawerHeights.slice(0, numDrawers).map((dh, i) => [
                `Drawer ${i + 1} front`, `${drawerUnitWidth - 6} cm`, `${dh} cm`, "1.8 cm", false
              ]),
            ].map(([label, w, d, t, isHeader], i) => (
              <div key={i} style={{
                display: "contents",
              }}>
                {[label, w, d, t].map((val, j) => (
                  <div key={j} style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid #2a1e0a",
                    color: isHeader ? "#c8924a" : (j === 0 ? "#e8d5b0" : "#9a7a4a"),
                    fontWeight: isHeader ? "bold" : "normal",
                    fontSize: isHeader ? 11 : 13,
                    letterSpacing: isHeader ? 2 : 0,
                    textTransform: isHeader ? "uppercase" : "none",
                  }}>{val}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

