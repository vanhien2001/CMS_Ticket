import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Input,
    Row,
    Select,
    Space,
    Table,
    Typography,
} from "antd";
import Icon, { EditOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    ticketPackageSelector,
    getAll,
} from "../../store/reducers/ticketPackageSlice";
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
        dataIndex: "validDate",
        key: "validDate",
        align: "right" as "right",
    },
    {
        title: "Ngày hết hạn",
        dataIndex: "expiryDate",
        key: "expiryDate",
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
    const dispatch = useAppDispatch();
    const { loading, ticketPackages } = useAppSelector(ticketPackageSelector);
    const [showModal, setShowModal] = useState({
        show: false,
        edit: false,
        data: null,
    });

    useEffect(() => {
        dispatch(getAll());
    }, []);

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
                columns={columns}
                dataSource={ticketPackages.map((ticketPackage, index) => {
                    return {
                        key: index++,
                        stt: index++,
                        id: ticketPackage.code,
                        name: ticketPackage.name,
                        validDate: "14/04/2021 08:00:00",
                        expiryDate: "14/04/2021 23:00:00",
                        price: ticketPackage.price +  "VNĐ",
                        priceCombo: ticketPackage.comboPrice ? ticketPackage.comboPrice + "VNĐ/4 Vé" : '',
                        status: <Status type={ticketPackage.status} text={ticketPackage.status == 1 ? "Đang áp dụng" : 'Tắt'} />,
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
                                <EditOutlined style={{ marginRight: "8px" }} />{" "}
                                Cập nhật
                            </div>
                        ),
                    };
                })}
                loading={loading}
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
