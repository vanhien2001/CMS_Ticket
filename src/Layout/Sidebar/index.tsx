import {
    AppstoreOutlined,
    WechatOutlined,
    DesktopOutlined,
    CodepenOutlined,
    FileTextOutlined,
    ExportOutlined,
    SettingOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Menu } from "antd";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Asset/insightlogo.svg";
import styles from "./Sidebar.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    key: React.Key,
    label: React.ReactNode,
    icon?: React.ReactNode,
    expandIcon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        expandIcon,
    } as MenuItem;
}

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let keys = location.pathname.split("/");
    let key ;
    if (keys[1] == "setting") {
        key = keys.slice(0, 3).join("/");
    } else {
        key = keys.slice(0, 2).join("/");
    }
    const items: MenuItem[] = [
        getItem(
            "/dashboard",
            <Link to="/dashboard">Trang chủ</Link>,
            <AppstoreOutlined />
        ),
        getItem(
            "/manage-ticket",
            <Link to="/manage-ticket">Quản lý vé</Link>,
            <DesktopOutlined />
        ),
        getItem(
            "/change-ticket",
            <Link to="/change-ticket">Đổi soát vé</Link>,
            <WechatOutlined />
        ),
        getItem(
            "setting",
            "Cài đặt",
            <SettingOutlined />,
            <MoreOutlined className={styles.expandIcon} />,
            [
                getItem(
                    "/setting/roles",
                    <Link to="/setting/roles">Gói dịch vụ</Link>
                ),
            ]
        ),
    ];

    return (
        <div className={clsx(styles.sideBar)}>
            <div>
                <div className={clsx(styles.logo)}>
                    <img src={Logo} alt="Alta" />
                </div>
                <div className="menu">
                    <Menu selectedKeys={[key]} items={items} mode={'inline'}/>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
