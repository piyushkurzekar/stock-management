import React, { useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaEye,
  FaEdit,
  FaPlus,
  FaFileCsv,
  FaFileExcel,
} from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import * as XLSX from "xlsx"; // ✅ Excel export
import Calendar from "../components/Calendar/Calendar";
import NewBooking from "../components/NewBooking/NewBooking";
import EditBooking from "../components/EditBooking/EditBooking";
import "./Booking.css";

// ---------------- CSV Export ----------------
const exportToCSV = (rows, filename) => {
  if (rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((r) => headers.map((h) => r[h]).join(","))].join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `${filename}.csv`;
  link.click();
};

// ---------------- Excel Export ----------------
// const exportToExcel = (rows, filename) => {
//   if (rows.length === 0) return;

//   const worksheet = XLSX.utils.json_to_sheet(rows);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

//   XLSX.writeFile(workbook, `${filename}.xlsx`);
// };

// ---------------- Card Component ----------------
const Card = ({ cardTitle, cardIcon, cardSubtitle, cardTextNum, cardText }) => (
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h6 className="mb-0">{cardTitle}</h6>
          {cardIcon}
        </div>
        <h4 className="fw-bold mt-2">{cardSubtitle}</h4>
        <p className="mb-0">
          <span className="text-success fw-bold">{cardTextNum}</span>
          {cardText}
        </p>
      </div>
    </div>
  </div>
);

const Booking = () => {
  const [activeView, setActiveView] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [showEditBooking, setShowEditBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [bookings, setBookings] = useState([
    // Example data
    // {
    //   guest: "John Doe",
    //   email: "john@email.com",
    //   villa: "Villa Sunset",
    //   dates: "1/20/2024 - 1/27/2024",
    //   nights: "7 nights",
    //   guests: 4,
    //   status: "Confirmed",
    //   amount: 4200,
    // },
  ]);

  // Filters
  const filteredBookings = bookings.filter(
    (b) =>
      (statusFilter === "All Status" || b.status === statusFilter) &&
      (b.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.villa.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Statistics
  const totalBookings = bookings.length;
  const currentGuests = bookings.reduce((sum, b) => sum + (b.guests || 0), 0);
  const occupancyRate = bookings.length
    ? Math.round((currentGuests / (bookings.length * 4)) * 100)
    : 0;

  return (
    <div className="container my-4">
      {/* Title + New Booking */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="fw-bold mb-1">Booking Management</h3>
          <p className="text-muted mb-0">
            Manage villa reservations and guest bookings
          </p>
        </div>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => setShowNewBooking(true)}
        >
          <FaPlus className="me-2" /> New Booking
        </button>
      </div>

      {/* Cards */}
      <div className="row g-3 justify-content-center mb-4">
        <Card
          cardTitle="Total Bookings"
          cardIcon={<CiCalendar fontSize={20} />}
          cardSubtitle={totalBookings.toString()}
          cardTextNum="+12%"
          cardText=" from last month"
        />
        <Card
          cardTitle="Current Guests"
          cardIcon={<GoPeople fontSize={20} />}
          cardSubtitle={currentGuests.toString()}
          cardTextNum="0%"
          cardText=" from last month"
        />
        <Card
          cardTitle="Occupancy Rate"
          cardIcon={<GoPeople fontSize={20} />}
          cardSubtitle={`${occupancyRate}%`}
          cardTextNum="0%"
          cardText=" occupancy"
        />
      </div>

      {/* Toggle Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <button
                className={`btn ${
                  activeView === "list" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setActiveView("list")}
              >
                Booking List
              </button>
              <button
                className={`btn ${
                  activeView === "calendar"
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={() => setActiveView("calendar")}
              >
                Calendar View
              </button>
            </div>

            {/* ✅ Export buttons */}
            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-success d-flex align-items-center"
                onClick={() => exportToCSV(filteredBookings, "Bookings")}
              >
                <FaFileCsv className="me-2" /> Export CSV
              </button>
              {/* <button
                className="btn btn-outline-success d-flex align-items-center"
                onClick={() => exportToExcel(filteredBookings, "Bookings")}
              >
                <FaFileExcel className="me-2" /> Export Excel
              </button> */}
            </div>
          </div>

          {/* Views */}
          {activeView === "list" ? (
            <>
              {/* Table Header + Search */}
              <div className="mb-3">
                <h5 className="fw-bold">All Bookings</h5>
                <p className="text-muted mb-3">
                  Manage and track all villa reservations
                </p>

                <div className="d-flex gap-2 mt-3 flex-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light text-center">
                    <tr>
                      <th>Guest name</th>
                      <th>Villa</th>
                      <th>Dates</th>
                      <th>Number of Guests</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filteredBookings.map((b, index) => (
                      <tr key={index}>
                        <td className="text-sm-start text-center">
                          <div className="fw-bold">{b.guest}</div>
                          <small className="text-muted">{b.email}</small>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <FaHome className="me-2 text-warning" size={16} />
                            <span>{b.villa}</span>
                          </div>
                        </td>
                        <td>
                          {b.dates}
                          <div>
                            <small className="text-muted">{b.nights}</small>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <FaUserFriends
                              className="me-2 text-primary"
                              size={16}
                            />
                            <span>{b.guests}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              b.status === "Confirmed"
                                ? "bg-success-subtle text-success"
                                : b.status === "Pending"
                                ? "bg-warning-subtle text-warning"
                                : "bg-primary-subtle text-primary"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td>Rs. {b.amount}</td>
                        <td>
                          <button className="btn btn-sm btn-light me-2">
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-sm btn-light"
                            onClick={() => {
                              setSelectedBooking(b);
                              setShowEditBooking(true);
                            }}
                          >
                            <FaEdit className="text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="calendar-container p-2 p-sm-3">
              <Calendar
                onDateSelect={(date, villa) =>
                  console.log("Selected Date:", date, "Villa:", villa)
                }
                bookedDatesByVilla={bookings.reduce((acc, b) => {
                  acc[b.villa] = b.bookedDates;
                  return acc;
                }, {})}
                villas={["All Villas", ...new Set(bookings.map((b) => b.villa))]}
              />
            </div>
          )}
        </div>
      </div>

      {/* NewBooking overlay */}
      {showNewBooking && (
        <NewBooking
          onClose={() => setShowNewBooking(false)}
          onSave={(newBooking) => {
            setBookings([...bookings, newBooking]);
            setShowNewBooking(false);
          }}
        />
      )}

      {/* EditBooking overlay */}
      {showEditBooking && selectedBooking && (
        <EditBooking
          booking={selectedBooking}
          onClose={() => setShowEditBooking(false)}
          onSave={(updatedBooking) =>
            setBookings((prev) =>
              prev.map((bk) =>
                bk.email === updatedBooking.email ? updatedBooking : bk
              )
            )
          }
        />
      )}
    </div>
  );
};

export default Booking;
