import { Card, Col, DatePicker, Row, Space, Typography } from "antd";
import Chart from "react-apexcharts";
import styles from "./Dashboard.module.scss";

const index = () => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            width: 100,
            toolbar: {
                show: false,
            },

            zoom: {
                enabled: false,
            },

            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                },
            },
        },

        colors: ["#FF993C"],

        dataLabels: {
            enabled: false,
        },

        xaxis: {
            categories: [
                "Thứ 2",
                "Thứ 3",
                "Thứ 4",
                "Thứ 5",
                "Thứ 6",
                "Thứ 7",
                "CN",
            ],
        },

        yaxis: {
            labels: {
                formatter: (value) => {
                    const valueString = value.toString();
                    if (valueString.length > 6) {
                        return (
                            valueString.slice(0, valueString.length - 6) + "tr"
                        );
                    }

                    return valueString;
                },
            },
        },

        responsive: [
            {
                breakpoint: 1000,
            },
        ],
    };
    return (
        <div className={styles.dashboard}>
            <Typography.Title>Thống kê</Typography.Title>
            <Row justify="space-between">
                <Col>
                    <Typography.Text>Doanh thu</Typography.Text>
                </Col>
                <Col>
                    {" "}
                    <DatePicker />
                </Col>
            </Row>
            <Chart
                height={300}
                width="100%"
                options={options}
                type="area"
                series={[
                    {
                        name: "Doanh Thu",
                        data: [
                            140000000, 260000000, 200000000, 150000000,
                            210000000, 180000000, 150000000,
                        ],
                    },
                ]}
            />
            <Space direction="vertical" className={styles.totalContainer}>
                <Typography.Text>Tổng doanh thu theo tuần</Typography.Text>
                <Typography.Text>
                    <b>525.145.000</b> đồng
                </Typography.Text>
            </Space>
            <Row className={styles.chartPieContainer}>
                <Col span="8">
                    {" "}
                    <DatePicker
                        picker="month"
                        placeholder="Chọn tháng"
                        className={styles.datePicker}
                        format={"[Tháng] M, YYYY"}
                    />
                </Col>
                <Col span="8">
                    <Typography.Text>Gói gia đình</Typography.Text>
                </Col>
                <Col span="8">
                    <Typography.Text>Gói Sự kiện</Typography.Text>
                </Col>
                <Col span="8"></Col>
            </Row>
        </div>
    );
};

export default index;
