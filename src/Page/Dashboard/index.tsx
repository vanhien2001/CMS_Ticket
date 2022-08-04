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
            <Typography.Title className={styles.title}>
                Thống kê
            </Typography.Title>
            <Row justify="space-between">
                <Col>
                    <Typography.Text className={styles.subtitle}>
                        Doanh thu
                    </Typography.Text>
                </Col>
                <Col>
                    {" "}
                    <DatePicker
                        picker="date"
                        placeholder="Chọn ngày"
                        className={styles.datePicker}
                        format={"[Tháng] M, YYYY"}
                    />
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
                <Typography.Text className={styles.text}>
                    Tổng doanh thu theo tuần
                </Typography.Text>
                <Typography.Text className={styles.text}>
                    <span>525.145.000</span> đồng
                </Typography.Text>
            </Space>
            <div className={styles.chartPieContainer}>
                <Row>
                    <Col span="6">
                        {" "}
                        <DatePicker
                            picker="month"
                            placeholder="Chọn tháng"
                            className={styles.datePicker}
                            format={"[Tháng] M, YYYY"}
                        />
                    </Col>
                    <Col span="6">
                        <Typography.Text className={styles.text2}>
                            Gói gia đình
                        </Typography.Text>
                    </Col>
                    <Col span="6">
                        <Typography.Text className={styles.text2}>
                            Gói Sự kiện
                        </Typography.Text>
                    </Col>
                    <Col span="6"></Col>
                </Row>
                <Row>
                    <Col span="6" offset="6"></Col>
                    <Col span="6"></Col>
                    <Col span="6">
                        <Space direction="vertical">
                            <Space className={styles.noteContainer} size={8}>
                                <span
                                    className={styles.color}
                                    style={{ backgroundColor: "#4F75FF" }}
                                ></span>
                                <span className={styles.text}>
                                    Vé đã sử dụng
                                </span>
                            </Space>
                            <Space className={styles.noteContainer} size={8}>
                                <span
                                    className={styles.color}
                                    style={{ backgroundColor: "#FF8A48" }}
                                ></span>
                                <span className={styles.text}>
                                    Vé chưa sử dụng
                                </span>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default index;
