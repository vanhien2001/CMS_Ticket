import { useState } from "react";
import {
    Button,
    Checkbox,
    Col,
    Form,
    Modal,
    Radio,
    Row,
    Space,
    Typography,
} from "antd";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import DatePickerCustom from "../../../../component/DatePicker";
import styles from "./Modal.module.scss";

interface IModal {
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

const ModalContainer = ({ showModal, setShowModal }: IModal) => {
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    return (
        <Modal
            centered
            closable={false}
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
                            <DatePickerCustom
                                type="from"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`${styles.datePickerInput} ${styles.datePickerInputFirst}`}
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
                            <DatePickerCustom
                                type="to"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`${styles.datePickerInput} ${styles.datePickerInputFirst}`}
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
                                            <span className={styles.checkItem}>
                                                Tất cả
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value="1">
                                            <span className={styles.checkItem}>
                                                Cổng 1
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value="2">
                                            <span className={styles.checkItem}>
                                                Cổng 2
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value="3">
                                            <span className={styles.checkItem}>
                                                Cổng 3
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value="4">
                                            <span className={styles.checkItem}>
                                                Cổng 4
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value="5">
                                            <span className={styles.checkItem}>
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
                            <Button
                                ghost
                                htmlType="submit"
                                className={styles.btn}
                            >
                                Lọc
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalContainer;
