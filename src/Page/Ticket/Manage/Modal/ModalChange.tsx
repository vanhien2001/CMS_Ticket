import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Typography } from "antd";
import moment, { Moment } from "moment";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { useAppDispatch } from "../../../../store";
import { ticketType, update, getAll } from "../../../../store/reducers/ticketSlice";
import DatePickerCustom from "../../../../component/DatePicker";
import styles from "./Modal.module.scss";
import { Timestamp } from "firebase/firestore";

interface IModal {
    data: ticketType | null;
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

const ModalContainer = ({ showModal, setShowModal, data }: IModal) => {
    let date = data?.dateUse.toDate();
    const dispatch = useAppDispatch();
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });
    console.log(dayRange);
    const onFinish = () => {
        const id = data?.id as string;
        dispatch(
            update({
                id,
                dateUse: Timestamp.fromDate(
                    moment({
                        ...dayRange.from,
                        month: dayRange.from ? dayRange.from.month - 1 : 0,
                    }).toDate()
                ),
            })
        ).then(() => {
            setShowModal(false);
            dispatch(getAll());
        });
    };

    useEffect(() => {
        if (data !== null) {
            date = data.dateUse.toDate();
            setDayRange({
                from: date
                ? {
                      day: date.getDate(),
                      month: date.getMonth() + 1,
                      year: date.getFullYear(),
                  }
                : null,
            to: null,
            })
        }
    }, [data])

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
                onFinish={onFinish}
            >
                <Row>
                    <Col span="24">
                        <Form.Item
                            label={
                                <Typography.Text className={styles.label}>
                                    Số vé
                                </Typography.Text>
                            }
                        >
                            <Typography.Text className={styles.text}>
                                {data?.number}
                            </Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
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
                            label={
                                <Typography.Text className={styles.label}>
                                    Tên sự kiện
                                </Typography.Text>
                            }
                        >
                            <Typography.Text className={styles.text}>
                                {data?.nameEvent}
                            </Typography.Text>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form.Item
                            name="dateUse"
                            label={
                                <Typography.Text className={styles.label}>
                                    Hạn sử dụng
                                </Typography.Text>
                            }
                        >
                            <DatePickerCustom
                                type="from"
                                hasOption={false}
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`${styles.datePickerInput} ${styles.datePickerInputFirst}`}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div className={styles.buttonContainer}>
                            <Button
                                ghost
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
