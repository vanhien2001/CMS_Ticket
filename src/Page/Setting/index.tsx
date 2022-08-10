import { useState } from "react";
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Space,
    Table,
    TimePicker,
    Typography,
} from "antd";
import Icon, { EditOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ReactComponent as searchSvg } from "../../Asset/search.svg";
import Status from "../../component/Status";
import Modal from "./Modal";
import styles from "./Setting.module.scss";

const { Option } = Select;

const columns = [
    {
        align: "center" as "center",
        title: "STT",
        dataIndex: "stt",
        key: "stt",
    },
    {
        align: "center" as "center",
        title: "Mã gói",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên gói vé",
        dataIndex: "name",
        key: "name",
        align: "center" as "center",
    },
    {
        title: "Ngày áp dụng",
        dataIndex: "date",
        key: "date",
        align: "right" as "right",
    },
    {
        title: "Ngày hết hạn",
        dataIndex: "dateExp",
        key: "dateExp",
        align: "right" as "right",
    },
    {
        title: "Giá (VND/Vé)",
        dataIndex: "price",
        key: "price",
        align: "right" as "right",
    },
    {
        title: "Giá Combo (VND/Combo)",
        dataIndex: "priceCombo",
        key: "priceCombo",
    },
    {
        title: "Tình trạng",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "",
        dataIndex: "edit",
        key: "edit",
    },
];

const Setting = () => {
    const [showModal, setShowModal] = useState({
        show: false,
        edit: false,
        data: null,
    });

    const dataSource = [
        {
            key: "1",
            stt: 1,
            id: "ALT20210501",
            name: "Gói gia đình",
            date: "14/04/2021 08:00:00",
            dateExp: "14/04/2021 23:00:00",
            price: "90.000 VNĐ",
            priceCombo: "360.000 VNĐ/4 Vé",
            status: (
                <Status type="success" color="#03AC00" text="Đang áp dụng" />
            ),
            edit: (
                <div
                    className={styles.link}
                    onClick={() =>
                        setShowModal({
                            show: true,
                            edit: true,
                            data: null,
                        })
                    }
                >
                    <EditOutlined style={{ marginRight: "8px" }} /> Cập nhật
                </div>
            ),
        },
        {
            key: "2",
            stt: 2,
            id: "ALT20210501",
            name: "Gói sự kiện",
            date: "14/04/2021 08:00:00",
            dateExp: "14/04/2021 23:00:00",
            price: "90.000 VNĐ",
            priceCombo: "",
            status: <Status type="error" color="#FD5959" text="Tắt" />,
            edit: (
                <div
                    className={styles.link}
                    onClick={() =>
                        setShowModal({
                            show: true,
                            edit: true,
                            data: null,
                        })
                    }
                >
                    <EditOutlined style={{ marginRight: "8px" }} /> Cập nhật
                </div>
            ),
        },
    ];

    return (
        <div className={styles.setting}>
            <Typography.Title className={styles.title}>
                Danh sách gói vé
            </Typography.Title>
            <Row justify="space-between">
                <Col>
                    <Typography.Text>
                        {" "}
                        <Input
                            type="text"
                            style={{
                                height: "48px",
                                width: "437px",
                                fontSize: "16px",
                            }}
                            suffix={
                                <Icon
                                    component={searchSvg}
                                    style={{ fontSize: "20px" }}
                                />
                            }
                            className={styles.input}
                            placeholder={"Tìm bằng số vé"}
                        />
                    </Typography.Text>
                </Col>
                <Col>
                    <Space>
                        <Button ghost className={styles.btn}>
                            Xuất file (.csv)
                        </Button>
                        <Button
                            type="primary"
                            className={styles.btn}
                            onClick={() =>
                                setShowModal({
                                    show: true,
                                    edit: false,
                                    data: null,
                                })
                            }
                        >
                            Thêm gói vé
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table
                className={styles.table}
                dataSource={dataSource}
                columns={columns}
                size="middle"
                pagination={{
                    defaultPageSize: 8,
                    position: ["bottomCenter"],
                    showLessItems: true,
                    showSizeChanger: false,
                }}
            />
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default Setting;
