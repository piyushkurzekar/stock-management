import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckInForm = () => {
    const [formData,
        setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        checkInTime: "",
        checkOutTime: "",
        guests: "",
        villa: "",
        payments: {
            cash: {
                advance: "",
                balance: ""
            },
            online: {
                advance: "",
                balance: ""
            },
            total: ""
        }
    });

    const [reservations,
        setReservations] = useState([]);
    const [search,
        setSearch] = useState("");
    const [startDate,
        setStartDate] = useState("");
    const [endDate,
        setEndDate] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentChange = (e, method, field) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            payments: {
                ...prev.payments,
                [method]: {
                    ...prev.payments[method],
                    [field]: value
                }
            }
        }));
    };

    const handleTotalChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            payments: {
                ...prev.payments,
                total: value
            }
        }));
    };

    // Submit reservation
    const handleSubmit = (e) => {
        e.preventDefault();
        setReservations([
            ...reservations,
            formData
        ]);
        setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            checkIn: "",
            checkOut: "",
            checkInTime: "",
            checkOutTime: "",
            guests: "",
            villa: "",
            payments: {
                cash: {
                    advance: "",
                    balance: ""
                },
                online: {
                    advance: "",
                    balance: ""
                },
                total: ""
            }
        });
        alert("Check-in Form Submitted!");
    };

    // Search filter
    const filteredReservations = reservations.filter((res) => res.firstName.toLowerCase().includes(search.toLowerCase()) || res.lastName.toLowerCase().includes(search.toLowerCase()) || res.phone.toLowerCase().includes(search.toLowerCase()) || res.villa.toString().includes(search.toLowerCase()));

    // Date range filter for table + export
    const dateFilteredReservations = filteredReservations.filter((res) => {
        if (!startDate && !endDate) 
            return true;
        const checkInDate = new Date(res.checkIn);
        const start = startDate
            ? new Date(startDate)
            : null;
        const end = endDate
            ? new Date(endDate)
            : null;

        if (start && checkInDate < start) 
            return false;
        if (end && checkInDate > end) 
            return false;
        return true;
    });

    // CSV Export
    const exportToCSV = () => {
        if (dateFilteredReservations.length === 0) {
            alert("No reservations found in this date range.");
            return;
        }

        const headers = [
            "Name",
            "Phone",
            "Villa",
            "Guests",
            "Check-in",
            "Check-out",
            "Total Payment"
        ];
        const rows = dateFilteredReservations.map((res) => [
            `${res.firstName} ${res.lastName}`,
            res.phone,
            res.villa,
            res.guests,
            `${res.checkIn} ${res.checkInTime}`,
            `${res.checkOut} ${res.checkOutTime}`,
            res.payments.total
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [
            headers, ...rows
        ].map((e) => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));

        // Optional: include date range in filename
        const fileNameParts = ["reservations"];
        if (startDate) 
            fileNameParts.push(startDate);
        if (endDate) 
            fileNameParts.push(endDate);
        const fileName = `${fileNameParts.join("_")}.csv`;

        link.setAttribute("download", fileName);
        document
            .body
            .appendChild(link);
        link.click();
        document
            .body
            .removeChild(link);
    };

    return (
        <div
            className="container my-4"
            style={{
            maxWidth: "900px"
        }}>
            {/* Check-in Form */}
            <div className="card shadow p-4 mb-4">
                <h2 className="text-center mb-4">Check-in Form</h2>

                <form onSubmit={handleSubmit}>
                    {/* Reservation Name */}
                    <div className="row mb-3">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required/>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required/>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required/>
                    </div>

                    {/* Dates */}
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Check-in Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleChange}
                                required/>
                        </div>
                        <div className="col">
                            <label className="form-label">Check-out Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleChange}
                                required/>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Check-in Time</label>
                            <input
                                type="time"
                                className="form-control"
                                name="checkInTime"
                                value={formData.checkInTime}
                                onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <label className="form-label">Check-out Time</label>
                            <input
                                type="time"
                                className="form-control"
                                name="checkOutTime"
                                value={formData.checkOutTime}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    {/* Guests & Villa */}
                    <div className="row mb-3">
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Villa No."
                                name="villa"
                                value={formData.villa}
                                onChange={handleChange}
                                required/>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Number of Guests"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                required/>
                        </div>
                    </div>

                    {/* Payment Table */}
                    <div className="mb-4">
                        <label className="form-label">Payment Details</label>
                        <div className="table-responsive">
                            <table
                                className="table table-bordered text-center"
                                style={{
                                tableLayout: "fixed",
                                minWidth: "600px"
                            }}>
                                <thead className="table-light">
                                    <tr>
                                        <th
                                            style={{
                                            width: "25%"
                                        }}>Payment Method</th>
                                        <th
                                            style={{
                                            width: "25%"
                                        }}>Advance</th>
                                        <th
                                            style={{
                                            width: "25%"
                                        }}>Balance</th>
                                        <th
                                            style={{
                                            width: "25%"
                                        }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cash</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.payments.cash.advance}
                                                onChange={(e) => handlePaymentChange(e, "cash", "advance")}/>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.payments.cash.balance}
                                                onChange={(e) => handlePaymentChange(e, "cash", "balance")}/>
                                        </td>
                                        <td rowSpan="2" >
                                            <input 
                                                type="number"
                                                className="form-control h-100 my-4"
                                                value={formData.payments.total}
                                                onChange={handleTotalChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Online</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.payments.online.advance}
                                                onChange={(e) => handlePaymentChange(e, "online", "advance")}/>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.payments.online.balance}
                                                onChange={(e) => handlePaymentChange(e, "online", "balance")}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success border-0">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Reservations Table */}
            <div className="card shadow p-4">
                <h3 className="mb-3">Checked-in Guests</h3>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by name, phone, or villa"
                    className="form-control mb-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/> {/* Date Range + Export (responsive) */}
                <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label mb-1">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}/>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <label className="form-label mb-1">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}/>
                    </div>

                    <div className="col-12 col-md-12 col-lg-4">
                        {/* Make button occupy full width and align to bottom on large screens */}
                        <div className="d-flex h-100 align-items-end">
                            <button className="btn btn-primary w-100" onClick={exportToCSV} type="button">
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Villa</th>
                                <th>Guests</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dateFilteredReservations.length === 0
                                ? (
                                    <tr>
                                        <td colSpan="8" className="text-muted">
                                            No data available
                                        </td>
                                    </tr>
                                )
                                : (dateFilteredReservations.map((res, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {res.firstName}
                                            {res.lastName}
                                        </td>
                                        <td>{res.phone}</td>
                                        <td>{res.villa}</td>
                                        <td>{res.guests}</td>
                                        <td>
                                            {res.checkIn}
                                            {res.checkInTime}
                                        </td>
                                        <td>
                                            {res.checkOut}
                                            {res.checkOutTime}
                                        </td>
                                        <td>{res.payments.total}</td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CheckInForm;
