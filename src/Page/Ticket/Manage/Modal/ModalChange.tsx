import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Modal,
    Row,
    Typography,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import styles from "./Modal.module.scss";

interface IModal {
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

const ModalContainer = ({ showModal, setShowModal }: IModal) => {
    return (
        <Modal
            centered
            closable={false}
            wrapClassName={styles.modal}
            bodyStyle={{ borderRadius: "10px" }}
            width={634}
            title={
                <Typography.Title className={styles.title}>
                    Đổi ngày sử dụng vé
                </Typography.Title>
            }
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
            maskClosable={false}
        >
            <Form
                name="filter"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="dateStart"
                            label={
                                <Typography.Text className={styles.label}>
                                    Số vé
                                </Typography.Text>
                            }
                        >
                            <Typography.Text className={styles.text}>
                                PKG20210502
                            </Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="dateStart"
                            label={
                                <Typography.Text className={styles.label}>
                                    Số vé
                                </Typography.Text>
                            }
                        >
                            <Typography.Text className={styles.text}>
                                Vé cổng - gói sự kiện
                            </Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="dateStart"
                            label={
                                <Typography.Text className={styles.label}>
                                    Tên sự kiện
                                </Typography.Text>
                            }
                        >
                            <Typography.Text className={styles.text}>
                                Hội trợ triển lãm hàng tiêu dùng 2021
                            </Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="dateStart"
                            label={
                                <Typography.Text className={styles.label}>
                                    Hạn sử dụng
                                </Typography.Text>
                            }
                        >
                            <DatePicker
                                format={["DD/MM/yyyy"]}
                                size="large"
                                placeholder="Chọn ngày"
                                className={styles.datePicker}
                                suffixIcon={
                                    <CalendarOutlined
                                        style={{ color: "#FF993C", fontSize: "20px" }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div className={styles.buttonContainer}>
                            <Button
                                ghost
                                htmlType="submit"
                                className={styles.btn}
                                onClick={() => setShowModal(false)}
                            >
                                Huỷ
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.btn}
                            >
                                Lưu
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalContainer;
