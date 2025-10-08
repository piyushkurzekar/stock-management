import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({
  initialDate = new Date(),
  onDateSelect = () => {},
  bookedDatesByVilla = {}, // ✅ { "Villa Sunset": ["2024-01-20", ...], ... }
  villas = ["All Villas"], // ✅ villa list from parent
}) => {
  const [date, setDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedVilla, setSelectedVilla] = useState("All Villas");

  const year = date.getFullYear();
  const month = date.getMonth();

  // Dropdown values
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  // ✅ Filter booked dates by selected villa
  const mergedBookedDates =
    selectedVilla === "All Villas"
      ? Object.values(bookedDatesByVilla).flat()
      : bookedDatesByVilla[selectedVilla] || [];

  // Handlers
  const handleMonthChange = (e) => {
    setDate(new Date(year, Number(e.target.value), 1));
  };

  const handleYearChange = (e) => {
    setDate(new Date(Number(e.target.value), month, 1));
  };

  const handlePrev = () => setDate(new Date(year, month - 1, 1));
  const handleNext = () => setDate(new Date(year, month + 1, 1));

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getStartDay = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);
  while (daysArray.length % 7 !== 0) daysArray.push(null);

  const weekChunks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weekChunks.push(daysArray.slice(i, i + 7));
  }

  const formatDate = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const handleDateClick = (day) => {
    const fullDate = formatDate(day);
    const isBooked = mergedBookedDates.includes(fullDate);

    // ✅ Only allow selecting free dates
    if (!isBooked) {
      setSelectedDate(fullDate);
      onDateSelect(fullDate, selectedVilla); // ✅ return villa + date
    }
  };

  return (
    <div className="calendar-section my-4">
      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handlePrev}
        >
          ←
        </button>

        <div className="d-flex align-items-center gap-2">
          {/* Month */}
          <select
            className="form-select"
            style={{ minWidth: "150px" }}
            value={month}
            onChange={handleMonthChange}
          >
            {months.map((m, idx) => (
              <option key={m} value={idx}>
                {m}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            className="form-select"
            style={{ minWidth: "80px" }}
            value={year}
            onChange={handleYearChange}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Villa */}
          <select
            className="form-select"
            style={{ minWidth: "200px" }}
            value={selectedVilla}
            onChange={(e) => setSelectedVilla(e.target.value)}
          >
            {villas.map((villa) => (
              <option key={villa} value={villa}>
                {villa}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleNext}
        >
          →
        </button>
      </div>

      {/* Day Labels */}
      <div className="row text-center fw-semibold border-bottom pb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="col">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      {weekChunks.map((week, i) => (
        <div key={i} className="row text-center mt-2">
          {week.map((day, j) => {
            const fullDate = day ? formatDate(day) : null;
            const isBooked = fullDate && mergedBookedDates.includes(fullDate);
            const isSelected = fullDate && fullDate === selectedDate;

            let classNames = "col border calendar-day rounded p-2";
            if (isBooked) classNames += " bg-danger text-white"; // 🔴 Booked dates
            else if (isSelected) classNames += " bg-success text-white" ; // 🟢 Selected date
            else classNames += " bg-white";

            return (
              <div
                key={j}
                className={classNames}
                style={{
                  minHeight: "60px",
                  cursor: day && !isBooked ? "pointer" : "not-allowed",
                }}
                onClick={() => day && handleDateClick(day)}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      ))}

      {/* ✅ Selected Villa Info */}
      <div className="text-center mt-3">
        <small className="text-muted">
          Showing availability for: <strong>{selectedVilla}</strong>
        </small>
      </div>
    </div>
  );
};

export default Calendar;
