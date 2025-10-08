import React, { useState, useEffect } from "react";
import OverviewCharts from "../components/FinanceTable/OverviewCharts";
import RecentTransactions from "../components/FinanceTable/RecentTransactions"; 
import axios from "axios"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);

const Finance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("Last Month");

  // ✅ States
  const [totalRevenue, setTotalRevenue] = useState(328000);
  const [totalExpenses, setTotalExpenses] = useState(215000);
  const [netProfit, setNetProfit] = useState(113000);
  const [netLoss, setNetLoss] = useState(0);
  const [revenue, setRevenue] = useState([45000, 51000, 48000, 61000, 55000, 67000]);
  const [expenses, setExpenses] = useState([33000, 35000, 34000, 38000, 36000, 41000]);
  const [months, setMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun"]);

  // Fetch summary
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/finance-summary")
      .then((res) => {
        if (res.data) {
          setTotalRevenue(res.data.totalRevenue || totalRevenue);
          setTotalExpenses(res.data.totalExpenses || totalExpenses);
          setNetProfit(res.data.netProfit || netProfit);
        }
      })
      .catch(() => console.log("Backend not ready, using defaults"));
  }, []);

  // Fetch revenue
  useEffect(() => {
    if (activeTab === "revenue") {
      axios
        .get("http://localhost:5000/api/revenue")
        .then((res) => {
          if (res.data?.values && res.data?.months) {
            setRevenue(res.data.values);
            setMonths(res.data.months);
          }
        })
        .catch(() => console.log("Backend not ready for revenue"));
    }
  }, [activeTab]);

  // Fetch expenses
  useEffect(() => {
    if (activeTab === "expenses") {
      axios
        .get("http://localhost:5000/api/expenses")
        .then((res) => {
          if (res.data?.values && res.data?.months) {
            setExpenses(res.data.values);
            setMonths(res.data.months);
          }
        })
        .catch(() => console.log("Backend not ready for expenses"));
    }
  }, [activeTab]);
  
  // net Loss
  useEffect(() => {
  axios
    .get("http://localhost:5000/api/finance-summary")
    .then((res) => {
      if (res.data) {
        setTotalRevenue(res.data.totalRevenue || totalRevenue);
        setTotalExpenses(res.data.totalExpenses || totalExpenses);
        setNetProfit(res.data.netProfit || netProfit);
        setNetLoss(res.data.netLoss || netLoss); // ✅ new field
      }
    })
    .catch(() => console.log("Backend not ready, using defaults"));
}, []);

  // Chart configs
  const revenueData = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        fill: true,
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        borderColor: "green",
        pointBackgroundColor: "green",
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        align: "top",
        color: "black",
        font: { weight: "bold" },
        formatter: (value) => `₹${value.toLocaleString()}`,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Revenue: ₹${ctx.raw.toLocaleString()}`,
        },
      },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `₹${val / 1000}k`,
        },
      },
    },
  };

  const expensesData = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: expenses,
        fill: true,
        backgroundColor:"rgba(255, 99, 133, 0.16)",
        borderColor: "red",
        pointBackgroundColor: "red",
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const expensesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        align: "top",
        color: "black",
        font: { weight: "bold" },
        formatter: (value) => `₹${value.toLocaleString()}`,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Expenses: ₹${ctx.raw.toLocaleString()}`,
        },
      },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => `₹${val / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="container-fluid mt-4">
      {/* === Header === */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="mb-2">
          <h4 className="fw-bold">Finance Overview</h4>
          <p className="text-muted mb-0">Track revenue, expenses, and profitability</p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {timeRange}
            </button>
            <ul className="dropdown-menu">
              {["Last Month", "Last 3 Months", "Last 6 Months", "Last Year"].map((range) => (
                <li key={range}>
                  <button className="dropdown-item" onClick={() => setTimeRange(range)}>
                    {range}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-outline-secondary">Export</button>
        </div>
      </div>

      {/* === Summary Cards === */}
<div className="row g-3 mb-4">
  {/* Total Revenue */}
  <div className="col-12 col-md-3">
    <div className="card p-3 shadow-sm h-100">
      <h6>Total Revenue</h6>
      <h4 className="fw-bold text-dark">RS.{totalRevenue.toLocaleString()}</h4>
      <small className="text-success">▲ +12.5% from last period</small>
    </div>
  </div>

  {/* Total Expenses */}
  <div className="col-12 col-md-3">
    <div className="card p-3 shadow-sm h-100">
      <h6>Total Expenses</h6>
      <h4 className="fw-bold text-dark">RS.{totalExpenses.toLocaleString()}</h4>
      <small className="text-danger">▼ +8.2% from last period</small>
    </div>
  </div>

  {/* Net Profit */}
  <div className="col-12 col-md-3">
    <div className="card p-3 shadow-sm h-100">
      <h6>Net Profit</h6>
      <h4 className="fw-bold text-success">RS.{netProfit.toLocaleString()}</h4>
      <small className="text-success">▲ +18.7% from last period</small>
    </div>
  </div>

  {/* Net Loss (calculated dynamically) */}
  <div className="col-12 col-md-3">
    <div className="card p-3 shadow-sm h-100">
      <h6>Net Loss</h6>
      <h4 className="fw-bold text-danger">
        RS.{(totalExpenses > totalRevenue ? (totalExpenses - totalRevenue) : 0).toLocaleString()}
      </h4>
      <small className="text-danger">▼ -10.7% from last period</small>
    </div>
  </div>
</div>



      {/* === Tabs === */}
      <ul className="nav nav-pills mb-4 flex-wrap">
        {["overview", "revenue", "expenses"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* === Charts === */}
      <div className="card p-3 shadow-sm mb-4">
        {activeTab === "overview" && <OverviewCharts />}
        {activeTab === "revenue" && (
          <>
            <h6 className="fw-bold mb-0">Revenue Trend</h6>
            <small className="text-muted">Monthly revenue over time</small>
            <div style={{ height: "420px" }} className="w-100">
              <Line data={revenueData} options={revenueOptions} />
            </div>
          </>
        )}
        {activeTab === "expenses" && (
          <>
            <h6 className="fw-bold mb-0">Expense Trend</h6>
            <small className="text-muted">Monthly expenses over time</small>
            <div style={{ height: "420px" }} className="w-100">
              <Line data={expensesData} options={expensesOptions} />
            </div>
          </>
        )}
      </div>

      {/* === Transactions Table === */}
      <RecentTransactions />
    </div>
  );
};

export default Finance;
