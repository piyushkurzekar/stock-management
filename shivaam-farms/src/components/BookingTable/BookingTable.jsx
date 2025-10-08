import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingTable = ({ bookings }) => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">All Bookings</h5>
          <p className="text-muted">Manage and track all villa reservations</p>

          {/* Search + Filter */}
          <div className="d-flex flex-column flex-md-row gap-2 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search bookings by guest name or villa..."
            />
            <select className="form-select w-auto">
              <option>All Status</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Responsive Table */}
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Guest</th>
                  <th className="d-none d-sm-table-cell">Villa</th>
                  <th>Dates</th>
                  <th className="d-none d-md-table-cell">Guests</th>
                  <th>Status</th>
                  <th className="d-none d-md-table-cell">Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                      <strong>{booking.guest}</strong>
                      <br />
                      <small className="text-muted">{booking.email}</small>
                    </td>

                    {/* Villa hidden on extra small screens */}
                    <td className="d-none d-sm-table-cell">🏡 {booking.villa}</td>

                    <td style={{ whiteSpace: "normal" }}>
                      {booking.dates}
                      <br />
                      <small className="text-muted">{booking.nights}</small>
                    </td>

                    {/* Guests hidden on small screens */}
                    <td className="d-none d-md-table-cell">👥 {booking.guests}</td>

                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          booking.status === "Confirmed"
                            ? "bg-success-subtle text-success"
                            : booking.status === "Pending"
                            ? "bg-warning-subtle text-warning"
                            : "bg-primary-subtle text-primary"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Amount hidden on small screens */}
                    <td className="d-none d-md-table-cell">Rs. {booking.amount}</td>

                    <td>
                      <button className="btn btn-sm btn-light me-2">👁</button>
                      <button className="btn btn-sm btn-light">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingTable;


