import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staffData")) || [];
    setStaff(storedStaff);
  }, []);

  useEffect(() => {
    localStorage.setItem("staffData", JSON.stringify(staff));
  }, [staff]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.role || !form.phone || !form.email) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedStaff = [...staff];
      updatedStaff[editIndex] = form;
      setStaff(updatedStaff);
      toast.success("Staff details updated!");
    } else {
      setStaff([...staff, form]);
      toast.success("Staff member added successfully!");
    }

    setForm({ name: "", role: "", phone: "", email: "" });
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setForm(staff[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = () => {
    const updatedStaff = staff.filter((_, i) => i !== confirmDeleteIndex);
    setStaff(updatedStaff);
    setConfirmDeleteIndex(null);
    toast.error("Staff member deleted!");
  };

  const handleExportCSV = () => {
    if (staff.length === 0) {
      toast.error("No staff data available to export!");
      return;
    }

    const headers = ["Name", "Role", "Phone", "Email"];
    const rows = staff.map((s) => [
      s.name,
      s.role,
      s.phone,
      s.email,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "staff_directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV file exported!");
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalStaff = staff.length;

  return (
    <>
      <style>
        {`
          @media (max-width: 767px) {
            .staff-actions {
              display: flex;
              flex-direction: column;
              gap: 10px;
              align-items: center;
            }
            table th, table td {
              font-size: 12px;
              white-space: nowrap;
            }
            .action-buttons-mobile {
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-top: 10px;
            }
            .action-buttons-desktop {
              display: none;
            }
          }
          @media (min-width: 768px) {
            .action-buttons-mobile {
              display: none;
            }
            .action-buttons-desktop {
              display: flex;
              gap: 10px;
            }
          }
        `}
      </style>

      <div className="container my-4">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <h2>Staff Management</h2>
            <p className="text-muted">Manage your villa staff members and their roles</p>
          </div>
        </div>

        {/* Cards */}
        <div className="row mb-4">
          <div className="col-12 col-md-4">
            <div className="card text-center shadow" style={{ marginTop: "20px" }}>
              <div className="card-body">
                <h5 className="card-title">Total Staff</h5>
                <p className="card-text display-6">{totalStaff}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Buttons */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>Staff Directory</h5>
              <p className="text-muted">Search and manage all staff members</p>
            </div>

            {/* Desktop/Tablet Buttons */}
            <div className="action-buttons-desktop">
              <button
                className="btn btn-success"
                onClick={() => setShowModal(true)}
              >
                + Add Staff Member
              </button>
              <button className="btn btn-outline-primary" onClick={handleExportCSV}>
                Export
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search staff by name or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-2"
          />

          {/* Mobile Buttons */}
          <div className="action-buttons-mobile">
            <button
              className="btn btn-success w-100"
              onClick={() => setShowModal(true)}
            >
              + Add Staff Member
            </button>
            <button
              className="btn btn-outline-primary w-100"
              onClick={handleExportCSV}
            >
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span>📞 {s.phone}</span>
                      <span>✉️ {s.email}</span>
                    </div>
                  </td>
                  <td className="staff-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-1"
                      onClick={() => setConfirmDeleteIndex(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editIndex !== null ? "Edit Staff Member" : "Add New Staff Member"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="form-control mb-2"
                  />
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleInputChange}
                    className="form-select mb-2"
                  >
                    <option value="">Select Role</option>
                    <option>Villa Manager</option>
                    <option>Maintenance</option>
                    <option>Housekeeping</option>
                    <option>Security</option>
                  </select>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="form-control mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="form-control mb-2"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleAddOrUpdate}>
                    {editIndex !== null ? "Update" : "Add Staff Member"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {confirmDeleteIndex !== null && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setConfirmDeleteIndex(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this staff member?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setConfirmDeleteIndex(null)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Staff;