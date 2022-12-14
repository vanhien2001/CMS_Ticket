import {
    Avatar,
    Button,
    Input,
    Typography,
} from "antd";
import { BellOutlined, MailOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as searchSvg } from "../../Asset/search.svg";
import avatarImage from "../../Asset/avatar.svg";
import styles from "./Header.module.scss";
import clsx from "clsx";

const { Title, Text } = Typography;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <Input
                type="text"
                style={{ height: "48px", width: "437px", fontSize: "16px" }}
                suffix={
                    <Icon component={searchSvg} style={{ fontSize: "20px" }} />
                }
                className={styles.input}
                placeholder={"Search"}
            />
            <div className={clsx(styles.headerRight)}>
                <MailOutlined className={styles.iconNotify}/>
                <BellOutlined className={styles.iconNotify}/>
                <Avatar src={avatarImage} className={styles.avatar} />
            </div>
        </div>
    );
};

export default Header;
