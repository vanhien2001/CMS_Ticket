import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import Icon, { EditOutlined, FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ReactComponent as searchSvg } from "../../../Asset/search.svg";
import Status from "../../../component/Status";
import styles from "./ManageTicket.module.scss";
import { useState } from "react";

const columns = [
    {
        align: "center" as "center",
        title: "STT",
        dataIndex: "stt",
        key: "stt",
    },
    {
        align: "center" as "center",
        title: "Booking code",
        dataIndex: "code",
        key: "code",
    },
    {
        title: "Số vé",
        dataIndex: "number",
        key: "number",
    },
    {
        title: "Tình trạng",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Ngày sử dụng",
        dataIndex: "date",
        key: "date",
        align: "right" as "right",
    },
    {
        title: "Ngày xuất vé",
        dataIndex: "dateRelease",
        key: "dateRelease",
        align: "right" as "right",
    },
    {
        title: "Cổng check-in",
        dataIndex: "gate",
        key: "gate",
        align: "right" as "right",
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
        code: "ALTFGHJU",
        number: "123456789034",
        status: <Status type="default" color="#919DBA" text="Đã sử dụng" />,
        date: "14/04/2021",
        dateRelease: "14/04/2021",
        gate: "Cổng 1",
    },
    {
        key: "2",
        stt: 2,
        code: "ALTOJMNB",
        number: "236784631642",
        status: <Status type="success" color="#03AC00" text="Chưa sử dụng" />,
        date: "14/04/2021",
        dateRelease: "14/04/2021",
    },
    {
        key: "3",
        stt: 3,
        code: "ALTOJMNB",
        number: "236784631642",
        status: <Status type="error" color="#FD5959" text="Hết hạn" />,
        date: "14/04/2021",
        dateRelease: "14/04/2021",
    },
    {
        key: "4",
        stt: 4,
        code: "ALTOJMNB",
        number: "236784631642",
        status: <Status type="default" color="#919DBA" text="Đã sử dụng" />,
        date: "14/04/2021",
        dateRelease: "14/04/2021",
        gate: "Cổng 1",
    },
    {
        key: "5",
        stt: 5,
        code: "ALTOJMNB",
        number: "236784631642",
        status: <Status type="default" color="#919DBA" text="Đã sử dụng" />,
        date: "14/04/2021",
        dateRelease: "14/04/2021",
        gate: "Cổng 1",
    },
];

const ManageTicket = () => {
    const [showModal, setShowModal] = useState<boolean>(true);

    return (
        <div className={styles.manageTicket}>
            <Typography.Title className={styles.title}>
                Danh sách vé
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
                        <Button
                            ghost
                            className={styles.btn}
                            icon={<FilterOutlined />}
                            onClick={() => setShowModal(true)}
                        >
                            Lọc vé
                        </Button>
                        <Button ghost className={styles.btn}>
                            Xuất file (.csv)
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
            <Modal
                wrapClassName={styles.modal}
                bodyStyle={{ borderRadius: "10px" }}
                width={634}
                title={
                    <Typography.Title className={styles.title}>
                        Lọc vé
                    </Typography.Title>
                }
                visible={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
            >
                <Form name="filter" layout="vertical">
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="dateStart"
                                labelCol={{ span: 24 }}
                                label={
                                    <Typography.Text className={styles.label}>
                                        Từ ngày
                                    </Typography.Text>
                                }
                            >
                                <DatePicker
                                    format={["DD/MM/yyyy"]}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="dateEnd"
                                labelCol={{ span: 24 }}
                                label={
                                    <Typography.Text className={styles.label}>
                                        Đến ngày
                                    </Typography.Text>
                                }
                            >
                                <DatePicker
                                    format={["DD/MM/yyyy"]}
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                name="status"
                                label={
                                    <Typography.Text className={styles.label}>
                                        Tình trạng đối soát
                                    </Typography.Text>
                                }
                            >
                                <Radio.Group>
                                    <Space>
                                        <Radio value="all">
                                            <span className={styles.checkItem}>
                                                Tất cả
                                            </span>
                                        </Radio>
                                        <Radio value="1">
                                            <span className={styles.checkItem}>
                                                Đã sử dụng
                                            </span>
                                        </Radio>
                                        <Radio value="2">
                                            <span className={styles.checkItem}>
                                                Chưa sử dụng
                                            </span>
                                        </Radio>
                                        <Radio value="3">
                                            <span className={styles.checkItem}>
                                                Hết hạn
                                            </span>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                name="status"
                                label={
                                    <Typography.Text className={styles.label}>
                                        Cổng check-in
                                    </Typography.Text>
                                }
                            >
                                <Checkbox.Group>
                                    <Row>
                                        <Col span="8">
                                            <Checkbox value="all">
                                                <span
                                                    className={styles.checkItem}
                                                >
                                                    Tất cả
                                                </span>
                                            </Checkbox>
                                        </Col>
                                        <Col span="8">
                                            <Checkbox value="1">
                                                <span
                                                    className={styles.checkItem}
                                                >
                                                    Cổng 1
                                                </span>
                                            </Checkbox>
                                        </Col>
                                        <Col span="8">
                                            <Checkbox value="2">
                                                <span
                                                    className={styles.checkItem}
                                                >
                                                    Cổng 2
                                                </span>
                                            </Checkbox>
                                        </Col>
                                        <Col span="8">
                                            <Checkbox value="3">
                                                <span
                                                    className={styles.checkItem}
                                                >
                                                    Cổng 3
                                                </span>
                                            </Checkbox>
                                        </Col>
                                        <Col span="8">
                                            <Checkbox value="4">
                                                <span
                                                    className={styles.checkItem}
                                                >
                                                    Cổng 4
                                                </span>
                                            </Checkbox>
                                        </Col>
                                        <Col span="8">
                                            <Checkbox value="5">
                                                <span
                                                    className={styles.checkItem}
                                                >
                                                    Cổng 5
                                                </span>
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <div className={styles.buttonContainer}>
                                <Button ghost htmlType="submit" className={styles.btn}>
                                    Lọc
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageTicket;
