import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditBooking.css";

const EditBooking = ({ booking, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...booking,
        paymentStatus: booking.paymentStatus || "Pending",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        onSave(formData); // ✅ now calling the correct prop
        onClose();
    };

    return (
        <div className="new-booking-overlay">
            <div className="new-booking-page animate-fade-in">
                <div className="card shadow-lg p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="fw-bold mb-0">Edit Booking</h3>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <p className="text-muted mb-4">Update reservation details</p>

                    {/* Form */}
                    <form className="row g-3">
                        {/* Guest Name */}
                        <div className="col-md-6">
                            <label className="form-label">Guest Name</label>
                            <input
                                type="text"
                                name="guest"
                                value={formData.guest}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter guest name"
                            />
                        </div>

                        {/* Villa Dropdown */}
                        <div className="col-md-6">
                            <label className="form-label">Villa</label>
                            <select
                                name="villa"
                                value={formData.villa}
                                onChange={handleChange}
                                className="form-select villa-dropdown"
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


                        {/* Check-in Date */}
                        <div className="col-md-6">
                            <label className="form-label">Check-in Date</label>
                            <input
                                type="date"
                                name="checkIn"
                                value={formData.checkIn || ""}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        {/* Check-out Date */}
                        <div className="col-md-6">
                            <label className="form-label">Check-out Date</label>
                            <input
                                type="date"
                                name="checkOut"
                                value={formData.checkOut || ""}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        {/* Number of Guests */}
                        <div className="col-md-6">
                            <label className="form-label">Number of Guests</label>
                            <input
                                type="number"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter number of guests"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="+91 9876543210"
                            />
                        </div>

                        {/* Email */}
                        <div className="col-12">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="guest@email.com"
                            />
                        </div>

                        {/* Booking Status */}
                        <div className="col-md-6">
                            <label className="form-label">Booking Status</label>
                            <select
                                name="status"
                                value={formData.status || "Confirmed"}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                    </form>

                    {/* Footer */}
                    <div className="d-flex justify-content-end mt-4 flex-wrap gap-2">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBooking;
