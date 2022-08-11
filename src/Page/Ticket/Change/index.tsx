import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    Input,
    Radio,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import Icon from "@ant-design/icons";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import clsx from "clsx";
import moment, { Moment } from "moment";
import { useAppSelector, useAppDispatch } from "../../../store";
import { ticketSelector, getAll } from "../../../store/reducers/ticketSlice";
import { ReactComponent as searchSvg } from "../../../Asset/search.svg";
import DatePickerCustom from "../../../component/DatePicker";
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

interface formValue {
    dateStart: Moment;
    dateEnd: Moment;
    checked: boolean;
}

const ChangeTicket = () => {
    const dispatch = useAppDispatch();
    const { loading, tickets } = useAppSelector(ticketSelector);
    const [dayRange, setDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    useEffect(() => {
        dispatch(getAll());
    }, []);

    const onFinish = (value: formValue) => {
        dispatch(
            getAll({
                ...value,
                dateStart: dayRange.from ? moment({
                    ...dayRange.from,
                    month: dayRange.from ? dayRange.from.month - 1 : 0,
                }) : null,
                dateEnd: dayRange.to ? moment({
                    ...dayRange.to,
                    month: dayRange.to ? dayRange.to.month - 1 : 0,
                }) :  null,
            })
        );
    };

    return (
        <div className={styles.changeTicket}>
            <Row gutter={24} style={{ height: "100%" }}>
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
                            columns={columns}
                            dataSource={tickets.filter(ticket => ticket.status == 0).map((ticket, index) => {
                                return {
                                    key: index++,
                                    stt: index++,
                                    number: ticket.number,
                                    date: moment(
                                        ticket.dateUse.toDate()
                                    ).format("DD/MM/YYYY"),
                                    name: "Vé cổng",
                                    gate: 'Cổng ' + ticket.checkIn,
                                    note: <span className={clsx(styles.note, {[styles.redNote] : ticket.checked})}>{ticket.checked ? 'Đã đối soát' : 'Chưa đối soát'}</span>,
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
                    </div>
                </Col>
                <Col span={7}>
                    <Form
                        className={styles.filter}
                        layout="vertical"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 12 }}
                        onFinish={onFinish}
                    >
                        <Typography.Title className={styles.title}>
                            Lọc vé
                        </Typography.Title>
                        <Form.Item
                            name="checked"
                            label={
                                <Typography.Text className={styles.label}>
                                    Tình trạng đối soát
                                </Typography.Text>
                            }
                        >
                            <Radio.Group defaultValue={null}>
                                <Space direction="vertical">
                                    <Radio value={null}>Tất cả</Radio>
                                    <Radio value={true}>Đã đối soát</Radio>
                                    <Radio value={false}>Chưa đối soát</Radio>
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
                            <DatePickerCustom
                                type="from"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={`${styles.datePickerInput} ${styles.datePickerInputFirst}`}
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
                            <DatePickerCustom
                                type="to"
                                dayRange={dayRange}
                                setDayRange={setDayRange}
                                inputClassName={styles.datePickerInput}
                            />
                        </Form.Item>
                        <div className={styles.buttonContainer}>
                            <Button
                                ghost
                                htmlType="submit"
                                className={styles.btn}
                            >
                                Lọc
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ChangeTicket;
