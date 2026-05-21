import { useState } from "react";

export default function App() {
  const [level, setLevel] = useState(1);
  const [enchant, setEnchant] = useState(0);
  const [extraHit, setExtraHit] = useState(0);
  const [strStat, setStrStat] = useState(1);
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

  // 힘 1당 명중 +1
  const strHitBonus = Number(strStat);

  // 버프 명중 계산
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

  // 적중률 계산
  let hitRate =
    69.6 +
    (totalHit - 1) * 2.1 -
    (10 - Number(ac)) * 2.1;

  // 최소 5%, 최대 95%
  hitRate = Math.max(5, Math.min(95, hitRate));

  // 적중률 색상
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
          boxShadow: "0 0 30px rgba(0,0,0,0.4)",
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
            flexWrap: "wrap",
          }}
        >
          {/* 1. 캐릭터 정보 */}
          <div style={{ width: "250px" }}>
            <SectionTitle title="캐릭터 정보" />

            <InputField
              label="본인 레벨"
              value={level}
              onChange={setLevel}
            />

            <InputField
              label="장비 강화 단계"
              value={enchant}
              onChange={setEnchant}
            />

            <InputField
              label="장비 추가 명중"
              value={extraHit}
              onChange={setExtraHit}
            />

            <InputField
              label="기본 힘 스탯"
              value={strStat}
              onChange={setStrStat}
            />
          </div>

          {/* 2. 버프 및 아이템 */}
          <div style={{ width: "320px" }}>
            <SectionTitle title="버프 및 아이템" />

            <BuffCheckbox
              label="홀리웨폰 (+1)"
              checked={buffs.holyWeapon}
              onChange={() => toggleBuff("holyWeapon")}
            />

            <BuffCheckbox
              label="전투강화주문서 (+1)"
              checked={buffs.battleScroll}
              onChange={() => toggleBuff("battleScroll")}
            />

            <BuffCheckbox
              label="힘업 (+5)"
              checked={buffs.strUp}
              onChange={() => toggleBuff("strUp")}
            />

            <BuffCheckbox
              label="바운스 어택 (+5)"
              checked={buffs.bounceAttack}
              onChange={() => toggleBuff("bounceAttack")}
            />

            <BuffCheckbox
              label="완목 (+1)"
              checked={buffs.wanmok}
              onChange={() => toggleBuff("wanmok")}
            />

            <BuffCheckbox
              label="파글 (+1)"
              checked={buffs.pagl}
              onChange={() => toggleBuff("pagl")}
            />
          </div>

          {/* 3. 상대 AC + 결과 */}
          <div style={{ width: "280px" }}>
            <SectionTitle title="상대 정보" />

            <InputField
              label="상대 AC"
              value={ac}
              onChange={setAc}
            />

            <div
              style={{
                marginTop: "30px",
                backgroundColor: "#111827",
                borderRadius: "16px",
                padding: "25px",
                textAlign: "center",
                border: "2px solid #374151",
              }}
            >
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "16px",
                }}
              >
                총 명중
              </p>

              <h2
                style={{
                  fontSize: "42px",
                  margin: "10px 0 20px",
                }}
              >
                {totalHit}
              </h2>

              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "16px",
                }}
              >
                최종 적중률
              </p>

              <h1
                style={{
                  fontSize: "56px",
                  marginTop: "10px",
                  color: hitColor,
                }}
              >
                {hitRate.toFixed(1)}%
              </h1>
            </div>

            {/* 제작자 표시 */}
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#9ca3af",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              <div>만든사람 : 군터서버 발트리스</div>
              <div>
                도건님 유튜브를 참고하여 만들었음을 밝힙니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h2
      style={{
        fontSize: "24px",
        marginBottom: "20px",
        color: "#60a5fa",
      }}
    >
      {title}
    </h2>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#d1d5db",
        }}
      >
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "180px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #374151",
          backgroundColor: "#111827",
          color: "white",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

function BuffCheckbox({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#111827",
        padding: "14px",
        borderRadius: "12px",
        marginBottom: "12px",
        border: "1px solid #374151",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      {label}
    </label>
  );
}