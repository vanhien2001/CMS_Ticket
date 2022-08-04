import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import Icon, { EditOutlined } from "@ant-design/icons";
import { ReactComponent as searchSvg } from "../../../Asset/search.svg";
import { Link } from "react-router-dom";
import Status from "../../../component/Status";
import styles from "./ChangeTicket.module.scss";

const columns = [
    {
        align: "center" as "center",
        title: "STT",
        dataIndex: "stt",
        key: "stt",
    },
    {
        title: "Số vé",
        dataIndex: "number",
        key: "number",
    },
    {
        title: "Ngày sử dụng",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Tên loại vé",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Cổng check-in",
        dataIndex: "gate",
        key: "gate",
    },
    {
        title: "",
        dataIndex: "note",
        key: "note",
    },
];

const dataSource = [
    {
        key: "1",
        stt: 1,
        number: "123456789034",
        date: "14/04/2021",
        name: "Vé cổng",
        gate: "Cổng 1",
        note: <span className={styles.note}>Chưa đối soát</span>,
    },
    {
        key: "2",
        stt: 2,
        number: "123456789034",
        date: "14/04/2021",
        name: "Vé cổng",
        gate: "Cổng 1",
        note: <span className={styles.note}>Chưa đối soát</span>,
    },
    {
        key: "3",
        stt: 3,
        number: "123456789034",
        date: "14/04/2021",
        name: "Vé cổng",
        gate: "Cổng 1",
        note: <span className={styles.note}>Chưa đối soát</span>,
    },
    {
        key: "4",
        stt: 4,
        number: "123456789034",
        date: "14/04/2021",
        name: "Vé cổng",
        gate: "Cổng 1",
        note: <span className={styles.note}>Chưa đối soát</span>,
    },
];

const ChangeTicket = () => {
    return (
        <div className={styles.changeTicket}>
            <Row gutter={24} style={{height: '100%'}}>
                <Col span={17}>
                    <div className={styles.content}>
                        <Typography.Title className={styles.title}>
                            Đối soát vé
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
                                <Button type="primary" className={styles.btn}>
                                    Chốt đối soát
                                </Button>
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
                </Col>
                <Col span={7}>
                    <Form
                        className={styles.filter}
                        layout="vertical"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Typography.Title className={styles.title}>
                            Lọc vé
                        </Typography.Title>
                        <Form.Item
                            name="status"
                            label={
                                <Typography.Text className={styles.label}>
                                    Tình trạng đối soát
                                </Typography.Text>
                            }
                        >
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="all">Tất cả</Radio>
                                    <Radio value="true">Đã đối soát</Radio>
                                    <Radio value="false">Chưa đối soát</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={
                                <Typography.Text className={styles.label}>
                                    Loại vé
                                </Typography.Text>
                            }
                        >
                            <Typography.Text className={styles.text}>
                                Vé cổng
                            </Typography.Text>
                        </Form.Item>
                        <Form.Item
                            name="dateStart"
                            label={
                                <Typography.Text className={styles.label}>
                                    Từ ngày
                                </Typography.Text>
                            }
                        >
                            <DatePicker
                                placeholder="Chọn ngày"
                                className={styles.datePicker}
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                        <Form.Item
                            name="dateEnd"
                            label={
                                <Typography.Text className={styles.label}>
                                    Đến ngày
                                </Typography.Text>
                            }
                        >
                            <DatePicker
                                placeholder="Chọn ngày"
                                className={styles.datePicker}
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>
                        <div className={styles.buttonContainer}>
                            <Button ghost htmlType="submit" className={styles.btn}>Lọc</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ChangeTicket;
