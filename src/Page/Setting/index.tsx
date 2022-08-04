import {
    Badge,
    Button,
    Col,
    Input,
    Row,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import Icon, { EditOutlined } from "@ant-design/icons";
import { ReactComponent as searchSvg } from "../../Asset/search.svg";
import Status from "../../component/Status";
import styles from "./Setting.module.scss";
import { Link } from "react-router-dom";

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
        status: <Status type="success" color="#03AC00" text="Đang áp dụng"/>,
        edit: (
            <Link to={"./#"} className={styles.link}>
                <EditOutlined style={{marginRight: '8px'}}/> Cập nhật
            </Link>
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
        status: <Status type="error" color="#FD5959" text="Tắt"/>,
        edit: (
            <Link to={"./#"} className={styles.link}>
                <EditOutlined style={{marginRight: '8px'}}/> Cập nhật
            </Link>
        ),
    },
];

const Setting = () => {
    return (
        <div className={styles.setting}>
            <Typography.Title>Danh sách gói vé</Typography.Title>
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
                        <Button type="primary" className={styles.btn}>
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
        </div>
    );
};

export default Setting;
