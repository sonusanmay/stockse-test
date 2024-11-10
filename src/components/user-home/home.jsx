import React from 'react'
// import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';  
import {menu} from 'lucide-react';


export default function Userhome() {

    const ctx = document.getElementById("earningChart").getContext("2d");
    const { Chart } = require('chart.js');


    const data = {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      datasets: [
        {
          label: "Reinvested",
          data: [30, 25, 20, 35, 45, 35, 85, 45, 65, 35, 55, 20],
          fill: true,
          backgroundColor: "rgba(255, 159, 139, 0.7)",
          borderColor: "rgba(255, 159, 139, 1)",
          tension: 0.4,
          pointHitRadius: 10,  // Expands clickable area around each point
          pointHoverRadius: 8,  // Expands hover area around each point
        },
        {
          label: "Withdrawn/Month",
          data: [65, 35, 30, 40, 35, 45, 55, 40, 35, 45, 85, 35],
          fill: true,
          backgroundColor: "rgba(187, 159, 255, 0.7)",
          borderColor: "rgba(187, 159, 255, 1)",
          tension: 0.4,
          pointHitRadius: 10,
          pointHoverRadius: 8,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || "";
                const xLabel = context.label;
                const yValue = context.raw;
                return `${label} - ${xLabel}: ${yValue}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
            },
            grid: {
              color: "#f0f0f0",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            radius: 0, // Keeps points invisible but expands their interactive areas
          },
        },
        onHover: (event, chartElement) => {
          event.native.target.style.cursor = chartElement.length ? "pointer" : "default";
        },
        onClick: (event) => {
          const chart = Chart.getChart("earningChart");
          const points = chart.getElementsAtEventForMode(
            event,
            "nearest",
            { intersect: false }, // Expands clickable area to nearest point within the radius
            true
          );

          if (points.length) {
            const point = points[0];
            const datasetIndex = point.datasetIndex;
            const dataIndex = point.index;

            const label = chart.data.labels[dataIndex];
            const value = chart.data.datasets[datasetIndex].data[dataIndex];
            const datasetLabel = chart.data.datasets[datasetIndex].label;

            alert(`Clicked on ${datasetLabel} - ${label}: ${value}`);
          }
        },
      },
    };

    const earningChart = new Chart(ctx, config);;

    function openDatePicker() {
      document.getElementById("datePicker").showPicker();
    }

    // Updates the displayed date after the user selects a date
    function updateDate(event) {
      const selectedDate = new Date(event.target.value);
      const options = { day: "2-digit", month: "short", year: "numeric" };
      document.getElementById("selectedDate").textContent =
        selectedDate.toLocaleDateString("en-GB", options);
    }

    let paymentData = [
      {
        month: "January 2024",
        payoutAmount: "1,00,000",
        totalPayout: "2,00,000",
        status: "Received",
      },
      {
        month: "February 2024",
        payoutAmount: "5,00,000",
        totalPayout: "510000",
        status: "Done",
      },
      {
        month: "March 2024",
        payoutAmount: "4,00,000",
        totalPayout: "600000",
        status: "Done",
      },
      {
        month: "April 2024",
        payoutAmount: "8,00,000",
        totalPayout: "844844",
        status: "Done",
      },
      {
        month: "may 2024",
        payoutAmount: "10,00,000",
        totalPayout: "8448441",
        status: "Received",
      },
    ];
    function updateCurrentDate() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      document.getElementById(
        "sun-currentDate"
      ).textContent = `Current Date: ${formattedDate}`;
    }
    function populateTable(data) {
      const tableBody = document.getElementById("sun-paymentTableBody");
      tableBody.innerHTML = "";
      data.forEach((payment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="sun-month-cell">${payment.month}</td>
            <td>${payment.payoutAmount}</td>
            <td class="sun-total-payout-cell">${payment.totalPayout}</td>
            <td>
                <span class="sun-status ${payment.status === "Received"
            ? "sun-status-received"
            : "sun-status-done"
          }">
                    ${payment.status}
                </span>
            </td>
        `;
        row.addEventListener("click", function () {
          const allRows = document.querySelectorAll(
            "#sun-paymentTableBody tr"
          );
          allRows.forEach((r) => r.classList.remove("sun-selected"));
          this.classList.add("sun-selected");
        });
        tableBody.appendChild(row);
      });
    }
    function handleSearch(event) {
      const searchTerm = event.target.value.toLowerCase();
      const filteredData = paymentData.filter((payment) =>
        payment.month.toLowerCase().includes(searchTerm)
      );
      populateTable(filteredData);
    }
    document.addEventListener("DOMContentLoaded", function () {
      updateCurrentDate();
      populateTable(paymentData);
      const searchInput = document.getElementById("sun-searchInput");
      searchInput.addEventListener("input", handleSearch);
    });

    document.addEventListener("DOMContentLoaded", (event) => {
      // Initialize Lucide icons
      lucide.createIcons();

      // Toggle sidebar on mobile
      const menuToggle = document.getElementById("menuToggle");
      const sidebar = document.querySelector(".sidebar");

      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });

      // Close sidebar when clicking outside on mobile
      document.addEventListener("click", (event) => {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (
          !isClickInsideSidebar &&
          !isClickOnMenuToggle &&
          window.innerWidth <= 768
        ) {
          sidebar.classList.remove("active");
        }
      });

      // Handle window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          sidebar.classList.remove("active");
        }
      });
    });
  return (
    <div>
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard</title>
        <link rel="stylesheet" href="styles.css" />
        <script src="https://unpkg.com/lucide@latest"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
        
        {/* sidebar section */}
        <div className="dashboard">
          <button id="menuToggle" className="menu-toggle">
            <i data-lucide="menu" />
          </button>
          <aside className="sidebar">
            <div className="sidebar-header">
              <div className="logo">
                <img src="img/dashlogo.jpg" alt="Dashboard logo" className="logodb" />
                <h1 className="dashboard-title">StockSe</h1>
                <span className="version">v.01</span>
              </div>
            </div>
            <nav>
              <a href="#" className="nav-item">
                <div className="nav-item-content">
                  <img src="img/key-square.png" alt="Dashboard icon" className="nav-item-icon" />
                  <span>Dashboard</span>
                </div>
                <span className="chevron">›</span>
              </a>
              <a href="#" className="nav-item">
                <div className="nav-item-content">
                  <img src="img/3d-square 1.png" alt="Add User icon" className="nav-item-icon" />
                  <span>News Update</span>
                </div>
                <span className="chevron">›</span>
              </a>
            </nav>
            {/* POC Card */}
            <div className="up-card">
              <div className="UP-poc-section">
                <div className="UP-poc-title">Your POC (Point of Contact)</div>
                <div className="UP-poc-card">
                  <div className="UP-poc-info">
                    <div className="UP-poc-avatar">
                      <img src="img/circle.png" alt="poc image" />
                    </div>
                    <div className="UP-poc-details">
                      <div className="UP-poc-name">John Maverick</div>
                      <div className="UP-poc-position">Accounts Head</div>
                    </div>
                  </div>
                  <button className="UP-contact-button">Contact POC</button>
                </div>
              </div>
              <div className="admin-profile">
                <img src="/img/loka.jpg" alt="Admin" className="admin-avatar" />
                <div className="admin-info">
                  <span className="admin-name">Admin Name</span>
                  <span className="admin-role">Account Head</span>
                </div>
                {/* <i data-lucide="chevron-down"></i> */}
                <img src="/img/chevron-down.png" alt="Expand user menu" className="chevron-db" />
              </div>
            </div>
          </aside>
          <main className="content">
            <div className="sbody">
              <div className="header">
                <div className="data-can">
                  <h1>Hello User Name 👋</h1>
                </div>
                <div className="date-container" onclick="openDatePicker()">
                  <svg className="calendar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="date-content">
                    <span className="date-label">Invested Month</span>
                    <span className="selected-date" id="selectedDate">14 Feb 2019</span>
                  </div>
                  <input type="date" id="datePicker" onchange="updateDate(event)" />
                </div>
              </div>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-icon green-bg">
                    <img src="/img/money.svg" alt />
                  </div>
                  <div className="stat-info">
                    <h3>5,00,000</h3>
                    <p>Total Investments</p>
                  </div>
                  <div className="vl" />
                </div>
                <div className="stat-item">
                  <div className="stat-icon blue-bg">
                    <img src="img/wallat.svg" alt />
                  </div>
                  <div className="stat-info">
                    <h3>1,500</h3>
                    <p>Total Payout/Month</p>
                  </div>
                  <div className="vl" />
                </div>
                <div className="stat-item">
                  <div className="stat-icon pink-bg"><img src="img/bag.svg" alt /></div>
                  <div className="stat-info">
                    <h3>52%</h3>
                    <p>ROI Till Date</p>
                  </div>
                </div>
              </div>
              <div className="cab-a">
                <div className="mpcontainer">
                  <div className="mpheader">
                    <div>
                      <div className="title">Earning Preview</div>
                      <div className="subtitle">Preview calculation with analytics</div>
                    </div>
                    <select className="dropdown">
                      <option>Till Date</option>
                      <option>Till Month</option>
                    </select>
                  </div>
                  <div className="chart-container">
                    <canvas id="earningChart" />
                  </div>
                </div>
                <div className="notice-board">
                  <header className="notice-board__header">
                    <h1 className="notice-board__title">Notice Board</h1>
                    <p className="notice-board__subtitle">
                      Recent News on Stock Market
                    </p>
                  </header>
                  <div className="notice-board__content">
                    <div className="notice-board__list">
                      <div className="notice-item">
                        <p className="notice-item__text">
                          Stock market reaches new highs as tech sector surges.
                        </p>
                      </div>
                      <div className="notice-item">
                        <p className="notice-item__text">
                          Federal Reserve announces plans to maintain current
                          interest rates.
                        </p>
                      </div>
                      <div className="notice-item">
                        <p className="notice-item__text">
                          Oil prices fluctuate amid geopolitical tensions.
                        </p>
                      </div>
                      <div className="notice-item">
                        <p className="notice-item__text">
                          Cryptocurrency market experiences volatility following
                          regulatory news.
                        </p>
                      </div>
                      <div className="notice-item">
                        <p className="notice-item__text">
                          Major merger announced in the telecommunications industry.
                        </p>
                      </div>
                      <div className="notice-item">
                        <p className="notice-item__text">
                          Retail sales data exceeds expectations, boosting consumer
                          goods stocks.
                        </p>
                      </div>
                    </div>
                    <div className="notice-board__nav">
                      <div className="nav-dot active" />
                      <div className="nav-dot" />
                      <div className="nav-dot" />
                      <div className="nav-dot" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sun-container">
              <div className="sun-header">
                <h1 className="sun-title">Payment Details</h1>
              </div>
              <div className="sun-search-container">
                <div className="sun-search-box">
                  <span className="sun-search-icon"><img src="img/serch 1.svg" height="20px" alt="Search icon" /></span>
                  <input type="text" id="sun-searchInput" className="sun-search-input" placeholder="Search By (Month year)" />
                </div>
                <div className="sun-current-date" id="sun-currentDate" />
              </div>
              <div className="sun-bro">
                <table id="sun-paymentTable">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Payout Amount</th>
                      <th>Total Payout</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody id="sun-paymentTableBody" />
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

    </div>
  );
};

