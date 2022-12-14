import { useEffect, useState } from "react";
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
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import moment, { Moment } from "moment";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { useAppDispatch } from "../../../../store";
import { getAll } from "../../../../store/reducers/ticketSlice";
import DatePickerCustom from "../../../../component/DatePicker";
import styles from "./Modal.module.scss";

interface IModal {
    showModal: boolean;
    setShowModal: (boolean: boolean) => void;
}

interface formValue {
    checkIn: [number];
    dateStart: Moment;
    dateEnd: Moment;
    status: number;
}

const ModalContainer = ({ showModal, setShowModal }: IModal) => {
    const dispatch = useAppDispatch();
    const [checkIn, setCheckIn] = useState<CheckboxValueType[]>([]);
    const [checkAll, setCheckAll] = useState(false);
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    useEffect(() => {
        if (checkIn.length === 0) {
            setCheckAll(true);
        }
        if (checkIn.length > 0) {
            setCheckAll(false);
        }
    }, [checkIn]);

    const checkInOnchange = (e: CheckboxValueType[]) => {
        setCheckIn(e);
    };

    const selectAllOnChange = (e: CheckboxChangeEvent) => {
        setCheckAll(e.target.checked);
        if (e.target.checked) {
            setCheckIn([]);
        }
    };

    const onFinish = (value: formValue) => {
        dispatch(
            getAll({
                ...value,
                checkIn,
                dateStart: dayRange.from ? moment({
                    ...dayRange.from,
                    month: dayRange.from ? dayRange.from.month - 1 : 0,
                }) : null,
                dateEnd: dayRange.to ? moment({
                    ...dayRange.to,
                    month: dayRange.to ? dayRange.to.month - 1 : 0,
                }) :  null,
            })
        ).then(() => {setShowModal(false)});
    };

    return (
        <Modal
            centered
            closable={false}
            wrapClassName={styles.modal}
            bodyStyle={{ borderRadius: "10px" }}
            width={634}
            title={
                <Typography.Title className={styles.title}>
                    L???c v??
                </Typography.Title>
            }
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={null}
        >
            <Form name="filter" layout="vertical" onFinish={onFinish}>
                <Row>
                    <Col span="12">
                        <Form.Item
                            name="dateStart"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    T??? ng??y
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
                                    ?????n ng??y
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
                                    T??nh tr???ng ?????i so??t
                                </Typography.Text>
                            }
                        >
                            <Radio.Group defaultValue={null}>
                                <Space>
                                    <Radio value={null}>
                                        <span className={styles.checkItem}>
                                            T???t c???
                                        </span>
                                    </Radio>
                                    <Radio value={0}>
                                        <span className={styles.checkItem}>
                                            ???? s??? d???ng
                                        </span>
                                    </Radio>
                                    <Radio value={1}>
                                        <span className={styles.checkItem}>
                                            Ch??a s??? d???ng
                                        </span>
                                    </Radio>
                                    <Radio value={2}>
                                        <span className={styles.checkItem}>
                                            H???t h???n
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
                            name="checkIn"
                            label={
                                <Typography.Text className={styles.label}>
                                    C???ng check-in
                                </Typography.Text>
                            }
                        >
                            <Checkbox
                                className={styles.checkAll}
                                checked={checkAll}
                                onChange={selectAllOnChange}
                            >
                                <span className={styles.checkItem}>T???t c???</span>
                            </Checkbox>
                            <Checkbox.Group
                                value={checkIn}
                                onChange={checkInOnchange}
                            >
                                <Row>
                                    <Col span={8}></Col>
                                    <Col span="8">
                                        <Checkbox value={1}>
                                            <span className={styles.checkItem}>
                                                C???ng 1
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={2}>
                                            <span className={styles.checkItem}>
                                                C???ng 2
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={3}>
                                            <span className={styles.checkItem}>
                                                C???ng 3
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={4}>
                                            <span className={styles.checkItem}>
                                                C???ng 4
                                            </span>
                                        </Checkbox>
                                    </Col>
                                    <Col span="8">
                                        <Checkbox value={5}>
                                            <span className={styles.checkItem}>
                                                C???ng 5
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
                                L???c
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalContainer;
