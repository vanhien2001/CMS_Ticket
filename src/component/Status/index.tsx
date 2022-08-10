import { Badge, Tag } from "antd";
import styles from "./Status.module.scss";

interface IStatus {
    text: string;
    type: number;
}

const themes = [
    {
        type: 'default',
        color: '#919DBA'
    },
    {
        type: 'success',
        color: '#03AC00'
    },
    {
        type: 'error',
        color: '#FD5959'
    }
]

const Status = ({ type, text }: IStatus) => {
    return (
        <Tag color={themes[type].type} className={styles.status}>
            {" "}
            <Badge color={themes[type].color} text={<span  className={styles.text} style={{color: themes[type].color}}>{text}</span>} />
        </Tag>
    );
};

export default Status;
