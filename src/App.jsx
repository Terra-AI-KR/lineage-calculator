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
    setBuffs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 힘 9부터 +1
  const strHitBonus = Math.max(0, Number(strStat) - 8);

  // 버프 합
  const buffHit =
    (buffs.holyWeapon ? 1 : 0) +
    (buffs.battleScroll ? 1 : 0) +
    (buffs.strUp ? 5 : 0) +
    (buffs.bounceAttack ? 5 : 0) +
    (buffs.wanmok ? 1 : 0) +
    (buffs.pagl ? 1 : 0);

  // 총 명중
  const totalHit =
    Number(level) +
    Number(enchant) +
    Number(extraHit) +
    strHitBonus +
    buffHit;

  // 적중률
  let hitRate =
    69.6 +
    (totalHit - 1) * 2.1 -
    (10 - Number(ac)) * 2.1;

  hitRate = Math.max(5, Math.min(95, hitRate));

  const hitColor =
    hitRate >= 70
      ? "#4ade80"
      : hitRate >= 50
      ? "#fb923c"
      : "#f87171";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#1f2937",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "40px",
            color: "#facc15",
          }}
        >
          리니지 클래식 명중률 계산기
        </h1>

        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          {/* 캐릭터 */}
          <div style={{ width: "260px" }}>
            <SectionTitle title="캐릭터 정보" />

            <InputField label="레벨" value={level} onChange={setLevel} />
            <InputField label="장비 강화" value={enchant} onChange={setEnchant} />
            <InputField label="추가 명중" value={extraHit} onChange={setExtraHit} />
            <InputField label="힘" value={strStat} onChange={setStrStat} />
          </div>

          {/* 버프 */}
          <div style={{ width: "320px" }}>
            <SectionTitle title="버프 / 아이템" />

            <BuffCheckbox label="홀리웨폰 +1" checked={buffs.holyWeapon} onChange={() => toggleBuff("holyWeapon")} />
            <BuffCheckbox label="전투강화주문서 +1" checked={buffs.battleScroll} onChange={() => toggleBuff("battleScroll")} />
            <BuffCheckbox label="힘업 +5" checked={buffs.strUp} onChange={() => toggleBuff("strUp")} />
            <BuffCheckbox label="바운스어택 +5" checked={buffs.bounceAttack} onChange={() => toggleBuff("bounceAttack")} />
            <BuffCheckbox label="완목 +1" checked={buffs.wanmok} onChange={() => toggleBuff("wanmok")} />
            <BuffCheckbox label="파글 +1" checked={buffs.pagl} onChange={() => toggleBuff("pagl")} />
          </div>

          {/* 결과 */}
          <div style={{ width: "280px" }}>
            <SectionTitle title="상대 정보" />

            <InputField label="상대 AC" value={ac} onChange={setAc} />

            <div
              style={{
                marginTop: "25px",
                backgroundColor: "#111827",
                borderRadius: "16px",
                padding: "22px",
                textAlign: "center",
                border: "1px solid #374151",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div style={{ color: "#9ca3af", fontSize: "14px" }}>
                총 명중
              </div>

              <div style={{ fontSize: "42px", fontWeight: "bold" }}>
                {totalHit}
              </div>

              <div style={{ color: "#9ca3af", fontSize: "14px" }}>
                최종 적중률
              </div>

              <div style={{ fontSize: "52px", fontWeight: "bold", color: hitColor }}>
                {hitRate.toFixed(1)}%
              </div>
            </div>

            <div
              style={{
                marginTop: "15px",
                fontSize: "12px",
                color: "#9ca3af",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              <div>만든사람 : 군터서버 발트리스</div>
              <div>도건님 유튜브 참고</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 입력 */
function InputField({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ marginBottom: "6px", color: "#d1d5db" }}>{label}</div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "180px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #374151",
          backgroundColor: "#0f172a",
          color: "white",
        }}
      />
    </div>
  );
}

/* 체크박스 */
function BuffCheckbox({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        border: "1px solid #374151",
        borderRadius: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        backgroundColor: "#111827",
      }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

/* 타이틀 */
function SectionTitle({ title }) {
  return (
    <div
      style={{
        fontSize: "20px",
        marginBottom: "15px",
        color: "#60a5fa",
        fontWeight: "bold",
      }}
    >
      {title}
    </div>
  );
}