import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Input,
    Popover,
    Row,
    Space,
    Table,
    Typography,
} from "antd";
import Icon, { FilterOutlined, MoreOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../store";
import { ticketSelector, getAll } from "../../../store/reducers/ticketSlice";
import { ReactComponent as searchSvg } from "../../../Asset/search.svg";
import Status from "../../../component/Status";
import ModalFilter from "./Modal/ModalFilter";
import ModalChange from "./Modal/ModalChange";
import styles from "./ManageTicket.module.scss";

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
        align: "center" as "center",
    },
    {
        title: "",
        dataIndex: "edit",
        key: "edit",
    },
];

const ManageTicket = () => {
    const dispatch = useAppDispatch();
    const { loading, tickets } = useAppSelector(ticketSelector);
    const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
    const [showModalChange, setShowModalChange] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAll());
    }, []);
    
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
                            onClick={() => setShowModalFilter(true)}
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
                columns={columns}
                dataSource={tickets.map((ticket, index) => {
                    return {
                        key: index++,
                        stt: index++,
                        code: ticket.bookingCode,
                        number: ticket.number,
                        status: (
                            <Status
                                type={ticket.status}
                                text={
                                    ticket.status == 0
                                        ? "Đã sử dụng"
                                        : ticket.status == 1
                                        ? "Chưa sử dụng"
                                        : "Hết hạn"
                                }
                            />
                        ),
                        date: "14/04/2021",
                        dateRelease: "14/04/2021",
                        gate: ticket.status == 0 ? 'Cổng ' + ticket.checkIn : "-",
                        edit:
                            ticket.status == 1 ? (
                                <Popover
                                    placement="left"
                                    content={
                                        <Space
                                            direction="vertical"
                                            className={styles.popverContainer}
                                        >
                                            <Typography.Text
                                                className={styles.popverText}
                                            >
                                                Sử dụng vé
                                            </Typography.Text>
                                            <Typography.Text
                                                className={styles.popverText}
                                                onClick={() =>
                                                    setShowModalChange(true)
                                                }
                                            >
                                                Đổi ngày sử dụng
                                            </Typography.Text>
                                        </Space>
                                    }
                                    trigger="click"
                                >
                                    <MoreOutlined />
                                </Popover>
                            ) : (
                                ""
                            ),
                    };
                })}
                size="middle"
                loading={loading}
                pagination={{
                    defaultPageSize: 8,
                    position: ["bottomCenter"],
                    showLessItems: true,
                    showSizeChanger: false,
                }}
            />
            <ModalFilter
                showModal={showModalFilter}
                setShowModal={setShowModalFilter}
            />
            <ModalChange
                showModal={showModalChange}
                setShowModal={setShowModalChange}
            />
        </div>
    );
};

export default ManageTicket;
