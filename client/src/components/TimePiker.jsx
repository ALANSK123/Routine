import { useEffect, useState } from "react";

const TimePicker = ({ value, onChange }) => {
  const [hour, setHour] = useState(12);       // numeric 1-12
  const [minute, setMinute] = useState(0);    // numeric 0-59
  const [period, setPeriod] = useState("AM");

  // raw strings shown while user is typing
  const [hourStr, setHourStr] = useState("12");
  const [minuteStr, setMinuteStr] = useState("00");

  // "HH:mm" 24h -> 12h display
  useEffect(() => {
    if (!value) return;
    const [h, m] = value.split(":").map(Number);
    const p = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    setHour(h12);
    setMinute(m);
    setPeriod(p);
    setHourStr(String(h12).padStart(2, "0"));
    setMinuteStr(String(m).padStart(2, "0"));
  }, [value]);

  // Emit as "HH:mm" 24h
  const emit = (h, m, p) => {
    let h24 = h;
    if (p === "AM") {
      if (h === 12) h24 = 0;
    } else {
      if (h !== 12) h24 = h + 12;
    }
    onChange(`${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  };

  // ── Hour ──
  const incrementHour = () => {
    const next = hour === 12 ? 1 : hour + 1;
    setHour(next);
    setHourStr(String(next).padStart(2, "0"));
    emit(next, minute, period);
  };
  const decrementHour = () => {
    const next = hour === 1 ? 12 : hour - 1;
    setHour(next);
    setHourStr(String(next).padStart(2, "0"));
    emit(next, minute, period);
  };
  const onHourChange = (e) => {
    // allow the user to type freely — only digits, max 2 chars
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    setHourStr(raw);
  };
  const onHourBlur = () => {
    let h = parseInt(hourStr, 10);
    if (isNaN(h) || h < 1) h = 1;
    if (h > 12) h = 12;
    setHour(h);
    setHourStr(String(h).padStart(2, "0"));
    emit(h, minute, period);
  };

  // ── Minute ──
  const incrementMinute = () => {
    const next = minute === 59 ? 0 : minute + 1;
    setMinute(next);
    setMinuteStr(String(next).padStart(2, "0"));
    emit(hour, next, period);
  };
  const decrementMinute = () => {
    const next = minute === 0 ? 59 : minute - 1;
    setMinute(next);
    setMinuteStr(String(next).padStart(2, "0"));
    emit(hour, next, period);
  };
  const onMinuteChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMinuteStr(raw);
  };
  const onMinuteBlur = () => {
    let m = parseInt(minuteStr, 10);
    if (isNaN(m) || m < 0) m = 0;
    if (m > 59) m = 59;
    setMinute(m);
    setMinuteStr(String(m).padStart(2, "0"));
    emit(hour, m, period);
  };

  // ── AM / PM ──
  const togglePeriod = () => {
    const next = period === "AM" ? "PM" : "AM";
    setPeriod(next);
    emit(hour, minute, next);
  };

  const ArrowBtn = ({ onClick, direction }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-7 h-5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors rounded hover:bg-primary/10 active:scale-90"
    >
      {direction === "up" ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 7L5 3L8.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 3L5 7L8.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );

  const inputClass =
    "w-9 text-center text-base font-bold tabular-nums bg-transparent border-none outline-none focus:text-primary caret-primary leading-none py-1";

  return (
    <div className="inline-flex items-center rounded-xl border border-[color:var(--card-border)] bg-[color:var(--card-bg)] backdrop-blur-md shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all w-full justify-center px-2 py-1 gap-0.5">

      {/* Hour */}
      <div className="flex flex-col items-center">
        <ArrowBtn onClick={incrementHour} direction="up" />
        <input
          type="text"
          inputMode="numeric"
          value={hourStr}
          onChange={onHourChange}
          onBlur={onHourBlur}
          onFocus={(e) => e.target.select()}
          className={inputClass}
          maxLength={2}
          placeholder="12"
        />
        <ArrowBtn onClick={decrementHour} direction="down" />
      </div>

      {/* Colon */}
      <span className="text-primary font-bold text-lg leading-none select-none px-0.5 mb-0.5">:</span>

      {/* Minute */}
      <div className="flex flex-col items-center">
        <ArrowBtn onClick={incrementMinute} direction="up" />
        <input
          type="text"
          inputMode="numeric"
          value={minuteStr}
          onChange={onMinuteChange}
          onBlur={onMinuteBlur}
          onFocus={(e) => e.target.select()}
          className={inputClass}
          maxLength={2}
          placeholder="00"
        />
        <ArrowBtn onClick={decrementMinute} direction="down" />
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-[color:var(--card-border)] mx-1.5" />

      {/* AM / PM Toggle */}
      <button
        type="button"
        onClick={togglePeriod}
        className="text-xs font-bold px-2 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all active:scale-95 select-none w-10 leading-none"
      >
        {period}
      </button>

    </div>
  );
};

export default TimePicker;