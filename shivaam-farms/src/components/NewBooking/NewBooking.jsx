import React, { useState } from "react";
import "./NewBooking.css";

const NewBooking = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    guest: "",
    email: "",
    phone: "",
    villa: "Villa Sunset", // default like original
    checkIn: "",
    checkOut: "",
    nights: "", // will be auto-calculated
    guests: 1,
    status: "Pending",
    amount: "",
  });

  const [dateError, setDateError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: type === "number" ? (value === "" ? "" : Number(value)) : value };

      // Auto-calc nights when both dates exist
      if (name === "checkIn" || name === "checkOut") {
        const checkIn = name === "checkIn" ? value : next.checkIn;
        const checkOut = name === "checkOut" ? value : next.checkOut;

        if (checkIn && checkOut) {
          const d1 = new Date(checkIn);
          const d2 = new Date(checkOut);
          if (!isNaN(d1) && !isNaN(d2) && d2 > d1) {
            const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
            next.nights = diffDays;
            setDateError("");
          } else {
            next.nights = "";
            setDateError("Check-out date must be after check-in date.");
          }
        } else {
          next.nights = "";
          setDateError("");
        }
      }

      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.guest.trim()) {
      alert("Please enter guest name.");
      return;
    }
    if (!formData.email.trim()) {
      alert("Please enter an email address.");
      return;
    }
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (!formData.nights || Number(formData.nights) <= 0) {
      alert("Please ensure check-out is after check-in.");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (!formData.villa) {
      alert("Please select a villa.");
      return;
    }

    const newBooking = {
      guest: formData.guest.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      villa: formData.villa,
      dates: `${formData.checkIn} - ${formData.checkOut}`,
      nights: `${formData.nights} nights`,
      guests: Number(formData.guests),
      status: formData.status,
      amount: Number(formData.amount),
      bookedDates: [], // you can generate date array here if needed
    };

    onSave(newBooking);
  };

  return (
    <div className="new-booking-overlay" role="dialog" aria-modal="true">
      <div className="new-booking-page animate-fade-in" role="document">
        <div className="card shadow-lg p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
            <div>
              <h3 className="fw-bold mb-0">Create New Booking</h3>
              <p className="text-muted small mb-0">Enter the booking details for the new reservation</p>
            </div>

            {/* close should not submit the form */}
            <button
              type="button"
              aria-label="Close"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          {/* Form */}
          <form className="row g-3" onSubmit={handleSubmit} noValidate>
            <div className="col-12 col-sm-6">
              <label className="form-label">Guest Name</label>
              <input
                type="text"
                name="guest"
                value={formData.guest}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Villa</label>
              <select
                name="villa"
                value={formData.villa}
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">Select the villa</option>
                <option value="Villa Ocean View">Villa Ocean View</option>
                <option value="Villa Sunset">Villa Sunset</option>
                <option value="Villa Mountain">Villa Mountain</option>
                <option value="Villa Palm">Villa Palm</option>
                <option value="Villa Paradise">Villa Paradise</option>
                <option value="Villa Lagoon">Villa Lagoon</option>
                <option value="Villa Horizon">Villa Horizon</option>
              </select>
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Nights</label>
              <input
                type="text"
                name="nights"
                value={formData.nights ? `${formData.nights} nights` : ""}
                className="form-control"
                readOnly
                placeholder="Auto-calculated"
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Number of Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className="form-control"
                onChange={handleChange}
                inputMode="tel"
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                min="0"
                value={formData.amount}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            {dateError && (
              <div className="col-12">
                <small className="text-danger">{dateError}</small>
              </div>
            )}

            {/* Footer actions */}
            <div className="col-12 form-actions d-flex flex-wrap justify-content-end mt-2 gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Create Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
