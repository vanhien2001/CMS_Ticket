import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    TimePicker,
    Typography,
} from "antd";
import {  DownOutlined } from "@ant-design/icons";
import styles from "./Modal.module.scss";

const { Option } = Select;

interface IModal {
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

const ModalContainer = ({showModal, setShowModal} : IModal) => {
    return (
        <Modal
        wrapClassName={styles.modal}
        bodyStyle={{ borderRadius: "10px" }}
        width={634}
        title={
            <Typography.Title className={styles.title}>
                Thêm gói vé
            </Typography.Title>
        }
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        maskClosable={false}
    >
        <Form name="filter" layout="vertical">
            <Row>
                <Col span="12">
                    <Form.Item
                        name="name"
                        labelCol={{ span: 24 }}
                        label={
                            <Typography.Text className={styles.label}>
                                Tên gói vé{" "}
                                <span className={styles.require}>
                                    *
                                </span>
                            </Typography.Text>
                        }
                    >
                        <Input
                            size="large"
                            placeholder="Nhập tên gói vé"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="12">
                    <Form.Item
                        name="dateStart"
                        labelCol={{ span: 24 }}
                        label={
                            <Typography.Text className={styles.label}>
                                Ngày áp dụng
                            </Typography.Text>
                        }
                    >
                        <Row gutter={8}>
                            <Col span="12">
                                <DatePicker
                                    format={["DD/MM/yyyy"]}
                                    size="large"
                                />
                            </Col>
                            <Col span="12">
                                <TimePicker size="large" />
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
                <Col span="12">
                    <Form.Item
                        name="dateEnd"
                        labelCol={{ span: 24 }}
                        label={
                            <Typography.Text className={styles.label}>
                                Ngày hết hạn
                            </Typography.Text>
                        }
                    >
                        <Row gutter={8}>
                            <Col span="12">
                                <DatePicker
                                    format={["DD/MM/yyyy"]}
                                    size="large"
                                />
                            </Col>
                            <Col span="12">
                                <TimePicker size="large" />
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Form.Item
                        name="status"
                        label={
                            <Typography.Text className={styles.label}>
                                Giá vé áp dụng
                            </Typography.Text>
                        }
                    >
                        <Row>
                            <Col span="24">
                                <Checkbox value="1">
                                    <span className={styles.checkItem}>
                                        Vé lẻ (vnđ/vé) với giá
                                        <Input
                                            style={{
                                                width: "148px",
                                                margin: "0 8px 12px",
                                            }}
                                            size="large"
                                            placeholder="Giá vé"
                                            disabled
                                        />{" "}
                                        / vé
                                    </span>
                                </Checkbox>
                            </Col>
                            <Col span="24">
                                <Checkbox value="1">
                                    <span className={styles.checkItem}>
                                        Combo vé với giá
                                        <Input
                                            style={{
                                                width: "148px",
                                                margin: "0 8px",
                                            }}
                                            size="large"
                                            placeholder="Giá vé"
                                            disabled
                                        />{" "}
                                        /{" "}
                                        <Input
                                            style={{
                                                width: "72px",
                                                margin: "0 8px",
                                            }}
                                            size="large"
                                            placeholder="Giá vé"
                                            disabled
                                        />{" "}
                                        vé
                                    </span>
                                </Checkbox>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form.Item
                        name="status"
                        label={
                            <Typography.Text className={styles.label}>
                                Tình trạng
                            </Typography.Text>
                        }
                    >
                        <Select
                            defaultValue="1"
                            size="large"
                            suffixIcon={
                                <DownOutlined
                                    style={{
                                        fontSize: "14px",
                                        color: "#FF993C",
                                    }}
                                />
                            }
                        >
                            <Option value="1">Đang áp dụng</Option>
                            <Option value="2">Tắt</Option>
                        </Select>
                        <Typography.Text className={styles.note}>
                            <span className={styles.require}>*</span>
                            là thông tin bắt buộc
                        </Typography.Text>
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
