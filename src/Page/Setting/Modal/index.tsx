import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    TimePicker,
    Typography,
} from "antd";
import { DownOutlined, FieldTimeOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { Timestamp } from "firebase/firestore";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { useAppDispatch } from "../../../store";
import {
    ticketPackageType,
    addTicketPackage,
    getAll,
    update,
} from "../../../store/reducers/ticketPackageSlice";
import DatePickerCustom from "../../../component/DatePicker";
import styles from "./Modal.module.scss";

const { Option } = Select;

type dataType = {
    show: boolean;
    edit: boolean;
};
interface IModal {
    data: ticketPackageType | null;
    showModal: dataType;
    setShowModal: (prop: dataType) => void;
}

interface formValue {
    code: string;
    name: string;
    validDate: any;
    expiryDate: any;
    price: number;
    comboPrice?: number;
    quantity?: number;
    status: number;
    timeStart?: Moment;
    timeEnd?: Moment;
}

const ModalContainer = ({ showModal, setShowModal, data }: IModal) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });
    const [price, setPrice] = useState<boolean>(false);
    const [comboPrice, setComboPrice] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                code: data.code,
                name: data.name,
                price: data.price,
                comboPrice: data.comboPrice,
                quantity: data.quantity,
                status: data.status,
            });
            const date = data.validDate.toDate();
            const date2 = data.expiryDate.toDate();
            setDayRange({
                from: date
                    ? {
                          day: date.getDate(),
                          month: date.getMonth() + 1,
                          year: date.getFullYear(),
                      }
                    : null,
                to: date2
                    ? {
                          day: date2.getDate(),
                          month: date2.getMonth() + 1,
                          year: date2.getFullYear(),
                      }
                    : null,
            });
            setPrice(data.price ? true : false);
            setComboPrice(data.comboPrice ? true : false);
        }
    }, [data]);

    const onFinish = (value: formValue) => {
        console.log(value);
        delete value.timeStart;
        delete value.timeEnd;
        if (!value.comboPrice) {
            delete value.comboPrice;
            delete value.quantity;
        }
        if (showModal.edit && data) {
            dispatch(
                update({
                    id: data.id,
                    ...value,
                    validDate: Timestamp.fromDate(
                        moment({
                            ...dayRange.from,
                            month: dayRange.from ? dayRange.from.month - 1 : 0,
                        }).toDate()
                    ),
                    expiryDate: Timestamp.fromDate(
                        moment({
                            ...dayRange.to,
                            month: dayRange.to ? dayRange.to.month - 1 : 0,
                        }).toDate()
                    ),
                })
            ).then(() => {
                setShowModal({
                    ...showModal,
                    show: false,
                });
                dispatch(getAll());
            });
        } else {
            dispatch(
                addTicketPackage({
                    ...value,
                    code: "ALT20210503",
                    validDate: Timestamp.fromDate(
                        moment({
                            ...dayRange.from,
                            month: dayRange.from ? dayRange.from.month - 1 : 0,
                        }).toDate()
                    ),
                    expiryDate: Timestamp.fromDate(
                        moment({
                            ...dayRange.to,
                            month: dayRange.to ? dayRange.to.month - 1 : 0,
                        }).toDate()
                    ),
                })
            ).then(() => {
                setShowModal({
                    ...showModal,
                    show: false,
                });
                dispatch(getAll());
            });
        }
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
                    {showModal.edit
                        ? "Cập nhật thông tin gói vé"
                        : "Thêm gói vé"}
                </Typography.Title>
            }
            visible={showModal.show}
            onCancel={() =>
                setShowModal({
                    ...showModal,
                    show: true,
                })
            }
            footer={null}
            maskClosable={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={24}>
                    <Col span="12">
                        <Form.Item
                            name={showModal.edit ? "code" : "name"}
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    {showModal.edit
                                        ? "Mã sự kiện"
                                        : "Tên gói vé"}
                                    <span className={styles.require}>*</span>
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nhập tên gói vé" />
                        </Form.Item>
                    </Col>
                    {showModal.edit && (
                        <Col span="12">
                            <Form.Item
                                name="name"
                                labelCol={{ span: 24 }}
                                label={
                                    <Typography.Text className={styles.label}>
                                        Tên sự kiện
                                    </Typography.Text>
                                }
                            >
                                <Input
                                    size="large"
                                    placeholder="Nhập tên gói vé"
                                />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                <Row gutter={12}>
                    <Col span="6">
                        <Form.Item
                            name="validDate"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    Ngày áp dụng
                                </Typography.Text>
                            }
                        >
                            <DatePickerCustom
                                type="from"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="timeStart"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    Ngày áp dụng
                                </Typography.Text>
                            }
                        >
                            <TimePicker
                                size="large"
                                suffixIcon={
                                    <FieldTimeOutlined
                                        style={{
                                            color: "#FF993C",
                                            fontSize: "20px",
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="expiryDate"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    Ngày hết hạn
                                </Typography.Text>
                            }
                        >
                            <DatePickerCustom
                                type="to"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                            />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="timeEnd"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    Ngày áp dụng
                                </Typography.Text>
                            }
                        >
                            <TimePicker
                                size="large"
                                suffixIcon={
                                    <FieldTimeOutlined
                                        style={{
                                            color: "#FF993C",
                                            fontSize: "20px",
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div className={styles.label}>Tên sự kiện</div>
                        <Checkbox
                            checked={price}
                            onChange={() => setPrice(!price)}
                        >
                            <Form.Item name="price" noStyle>
                                <span className={styles.checkItem}>
                                    Vé lẻ (vnđ/vé) với giá
                                    <InputNumber
                                        style={{
                                            width: "148px",
                                            margin: "0 8px 12px",
                                        }}
                                        size="large"
                                        placeholder="Giá vé"
                                        disabled={!price}
                                    />{" "}
                                    / vé
                                </span>
                            </Form.Item>
                        </Checkbox>
                        <Checkbox
                            checked={comboPrice}
                            onChange={() => setComboPrice(!comboPrice)}
                        >
                            <span className={styles.checkItem}>
                                Combo vé với giá
                                <Form.Item name="comboPrice" noStyle>
                                    <InputNumber
                                        style={{
                                            width: "148px",
                                            margin: "0 8px",
                                        }}
                                        size="large"
                                        placeholder="Giá vé"
                                        disabled={!comboPrice}
                                    />
                                </Form.Item>
                                /{" "}
                                <Form.Item name="quantity" noStyle>
                                    <InputNumber
                                        style={{
                                            width: "72px",
                                            margin: "0 8px",
                                        }}
                                        size="large"
                                        placeholder="Số lượng"
                                        disabled={!comboPrice}
                                    />
                                </Form.Item>
                                vé
                            </span>
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form.Item
                            name="status"
                            labelCol={{ span: 24 }}
                            label={
                                <Typography.Text className={styles.label}>
                                    Tên sự kiện
                                </Typography.Text>
                            }
                        >
                            <Select
                                defaultValue={1}
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
                                <Option value={1}>Đang áp dụng</Option>
                                <Option value={2}>Tắt</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div className={styles.buttonContainer}>
                            <Button
                                ghost
                                className={styles.btn}
                                onClick={() =>
                                    setShowModal({
                                        ...showModal,
                                        show: false,
                                    })
                                }
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
