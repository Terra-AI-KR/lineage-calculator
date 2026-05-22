import { useState } from "react";

export default function App() {
  const [level, setLevel] = useState(1);
  const [enchant, setEnchant] = useState(0);
  const [extraHit, setExtraHit] = useState(0);
  const [strStat, setStrStat] = useState(9);
  const [ac, setAc] = useState(10);

  const [buffs, setBuffs] = useState({
    holyWeapon: false,
    battleScroll: false,
    strUp: false,
    bounceAttack: false,
    wanmok: false,
    pagl: false,
  });

  const toggleBuff = (key) => {
    setBuffs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 힘 9부터 +1
  const strHitBonus = Math.max(0, Number(strStat) - 8);

  const buffHit =
    (buffs.holyWeapon ? 1 : 0) +
    (buffs.battleScroll ? 1 : 0) +
    (buffs.strUp ? 5 : 0) +
    (buffs.bounceAttack ? 5 : 0) +
    (buffs.wanmok ? 1 : 0) +
    (buffs.pagl ? 1 : 0);

  const totalHit =
    Number(level) +
    Number(enchant) +
    Number(extraHit) +
    strHitBonus +
    buffHit;

  let hitRate =
    69.6 +
    (totalHit - 1) * 2.1 -
    (10 - Number(ac)) * 2.1;

  hitRate = Math.max(5, Math.min(95, hitRate));

  const hitColor =
    hitRate >= 70 ? "#4ade80"
    : hitRate >= 50 ? "#fb923c"
    : "#f87171";

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>리니지 클래식 명중률 계산기</h1>

        <div style={grid}>
          
          {/* 캐릭터 */}
          <div style={card}>
            <SectionTitle title="캐릭터 정보" />
            <Input label="레벨" value={level} set={setLevel} />
            <Input label="장비 강화" value={enchant} set={setEnchant} />
            <Input label="추가 명중" value={extraHit} set={setExtraHit} />
            <Input label="힘" value={strStat} set={setStrStat} />
          </div>

          {/* 버프 */}
          <div style={card}>
            <SectionTitle title="버프 / 아이템" />

            <Check label="홀리웨폰 +1" v={buffs.holyWeapon} f={() => toggleBuff("holyWeapon")} />
            <Check label="전투강화 +1" v={buffs.battleScroll} f={() => toggleBuff("battleScroll")} />
            <Check label="힘업 +5" v={buffs.strUp} f={() => toggleBuff("strUp")} />
            <Check label="바운스 +5" v={buffs.bounceAttack} f={() => toggleBuff("bounceAttack")} />
            <Check label="완목 +1" v={buffs.wanmok} f={() => toggleBuff("wanmok")} />
            <Check label="파글 +1" v={buffs.pagl} f={() => toggleBuff("pagl")} />
          </div>

          {/* 결과 */}
          <div style={card}>
            <SectionTitle title="결과" />

            <Input label="상대 AC" value={ac} set={setAc} />

            <div style={resultBox}>
              <div style={sub}>총 명중</div>
              <div style={big}>{totalHit}</div>

              <div style={sub}>최종 적중률</div>
              <div style={{ ...hit, color: hitColor }}>
                {hitRate.toFixed(1)}%
              </div>
            </div>

            <div style={footer}>
              만든사람 : 군터서버 발트리스 / 도건님 유튜브 참고
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const page = {
  minHeight: "100vh",
  background: "#0b1220",
  padding: "20px",
  color: "white",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const title = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "25px",
  color: "#facc15",
};

/* 🔥 핵심: 자동 반응형 (PC/모바일 자동 해결) */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
};

const card = {
  background: "#1f2937",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
};

const resultBox = {
  marginTop: "14px",
  background: "#111827",
  borderRadius: "12px",
  padding: "16px",
  textAlign: "center",
  border: "1px solid #374151",
};

const sub = {
  fontSize: "13px",
  color: "#9ca3af",
};

const big = {
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const hit = {
  fontSize: "48px",
  fontWeight: "bold",
};

const footer = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center",
};

/* ================= INPUT ================= */

function Input({ label, value, set }) {
  return (
    <div style={inputWrap}>
      <div style={labelStyle}>{label}</div>
      <input
        type="number"
        value={value}
        onChange={(e) => set(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

const inputWrap = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const labelStyle = {
  fontSize: "13px",
  color: "#d1d5db",
  minWidth: "80px",
};

const inputStyle = {
  width: "110px",
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #374151",
  background: "#0f172a",
  color: "white",
  textAlign: "center",
};

/* ================= CHECK ================= */

function Check({ label, v, f }) {
  return (
    <label style={checkStyle}>
      <input type="checkbox" checked={v} onChange={f} />
      {label}
    </label>
  );
}

const checkStyle = {
  display: "flex",
  gap: "8px",
  padding: "8px",
  border: "1px solid #374151",
  borderRadius: "8px",
  marginBottom: "6px",
  background: "#111827",
  fontSize: "13px",
  cursor: "pointer",
};

/* ================= TITLE ================= */

function SectionTitle({ title }) {
  return (
    <div style={titleStyle}>
      {title}
    </div>
  );
}

const titleStyle = {
  fontSize: "18px",
  marginBottom: "12px",
  color: "#60a5fa",
  fontWeight: "bold",
};