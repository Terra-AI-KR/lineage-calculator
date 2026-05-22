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
    setBuffs((p) => ({ ...p, [key]: !p[key] }));
  };

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

          <div style={card}>
            <SectionTitle title="캐릭터 정보" />
            <Input label="레벨" value={level} set={setLevel} />
            <Input label="장비 강화" value={enchant} set={setEnchant} />
            <Input label="추가 명중" value={extraHit} set={setExtraHit} />
            <Input label="힘" value={strStat} set={setStrStat} />
          </div>

          <div style={card}>
            <SectionTitle title="버프 / 아이템" />
            <Check label="홀리웨폰 +1" v={buffs.holyWeapon} f={() => toggleBuff("holyWeapon")} />
            <Check label="전투강화 +1" v={buffs.battleScroll} f={() => toggleBuff("battleScroll")} />
            <Check label="힘업 +5" v={buffs.strUp} f={() => toggleBuff("strUp")} />
            <Check label="바운스어택 +5" v={buffs.bounceAttack} f={() => toggleBuff("bounceAttack")} />
            <Check label="완목 +1" v={buffs.wanmok} f={() => toggleBuff("wanmok")} />
            <Check label="파글 +1" v={buffs.pagl} f={() => toggleBuff("pagl")} />
          </div>

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
              군터서버 발트리스 / 도건님 유튜브 참고
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
  padding: "24px",
  color: "white",
  fontFamily: "sans-serif",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const title = {
  textAlign: "center",
  fontSize: "34px",
  fontWeight: "700",
  marginBottom: "30px",
  color: "#facc15",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "18px",
};

const card = {
  background: "#1f2937",
  borderRadius: "16px",
  padding: "22px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
};

/* 결과 */
const resultBox = {
  marginTop: "14px",
  background: "#111827",
  borderRadius: "12px",
  padding: "18px",
  textAlign: "center",
  border: "1px solid #374151",
};

const sub = {
  fontSize: "14px",
  color: "#9ca3af",
  marginBottom: "4px",
};

const big = {
  fontSize: "44px",
  fontWeight: "700",
  marginBottom: "10px",
};

const hit = {
  fontSize: "54px",
  fontWeight: "800",
};

const footer = {
  marginTop: "12px",
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
  marginBottom: "12px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#e5e7eb",
  minWidth: "90px",
};

const inputStyle = {
  width: "120px",
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#0f172a",
  color: "white",
  fontSize: "14px",
  textAlign: "center",
};

/* ================= CHECK ================= */

function Check({ label, v, f }) {
  return (
    <label style={checkStyle}>
      <input type="checkbox" checked={v} onChange={f} />
      <span style={{ fontSize: "14px" }}>{label}</span>
    </label>
  );
}

const checkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  border: "1px solid #374151",
  borderRadius: "10px",
  marginBottom: "8px",
  background: "#111827",
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
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "14px",
  color: "#60a5fa",
};