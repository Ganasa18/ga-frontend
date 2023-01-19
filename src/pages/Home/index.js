import { Breadcrumb, Col, Layout, Row } from "antd";
import React from "react";
import { Gap } from "../../components";
import Chart from "react-apexcharts";

import "./style.less";
const Home = () => {
  const chart = {
    options: {
      color: ["#2A4878c3"],
      fill: {
        colors: ["#2A4878"],
      },

      chart: {
        background: "transparent",
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "data",
        data: [40, 50, 60, 10, 20, 25],
      },
    ],
  };

  const piechart = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}>
        <Row>
          <div className="card-dashboard">
            <div className="card-dashboard-title">
              <button className="button-filter-dashboard">Filter</button>
              <p>Filter for “July, 2022”</p>
            </div>
            <Gap height={23} />
            <div className="card-dashboard-container">
              <div className="card-dashboard-item">
                <h1>Total Cost</h1>
                <Gap height={20} />
                <h2 className="rupiah">Rp 100.000.000</h2>
              </div>
              <div className="card-dashboard-item">
                <h1>Total Liter</h1>
                <Gap height={20} />
                <h2 className="kilometer">4300 L</h2>
              </div>
              <div className="card-dashboard-item">
                <h1>KM / L Average</h1>
                <Gap height={20} />
                <h2 className="kilometer">4300 L</h2>
              </div>
              <div className="card-dashboard-item">
                <h1>Cost / Visit</h1>
                <Gap height={20} />
                <h2 className="rupiah">Rp 100.000.000</h2>
              </div>
            </div>
          </div>
        </Row>
        <Gap height={24} />
        <Row>
          <Col span={12}>
            <div className="card-dashboard-no-box">
              <div className="card-dashboard-title">
                <button className="button-filter-dashboard">Filter</button>
                <p>Filter for “July, 2022”</p>
              </div>
              <Gap height={23} />
              <div className="card-dashboard-container">
                <div className="card-dashboard-item">
                  <h1>Total Cost</h1>
                  <Gap height={20} />
                  <h2 className="rupiah">Rp 100.000.000</h2>
                </div>
                <div className="card-dashboard-item">
                  <h1>Total Liter</h1>
                  <Gap height={20} />
                  <h2 className="kilometer">4300 L</h2>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="card-top-5">
              <div className="card-top-5-header">
                <h2>Top 5 Visit</h2>
                <button className="button-filter-dashboard">Filter</button>
              </div>
              <Gap height={17} />
              <table className="table-top-5">
                <thead>
                  <tr>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Gap height={24} />
        <Row>
          <Col span={12}>
            <div className="card-dashboard-no-box">
              <Chart
                options={chart.options}
                series={chart.series}
                type={"area"}
                height="350"
              />
            </div>
          </Col>
          <Col span={12}>
            <Row>
              <div className="card-dashboard">
                <Chart
                  options={piechart.options}
                  series={piechart.series}
                  type={"pie"}
                  height="280"
                />
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
