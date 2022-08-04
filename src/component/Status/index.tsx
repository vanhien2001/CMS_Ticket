import { Badge, Tag } from "antd";
import React from "react";
import styles from "./Status.module.scss";

interface IStatus {
    color: string;
    text: string;
    type: string;
}

const Status = ({ type, color, text }: IStatus) => {
    return (
        <Tag color={type} className={styles.status}>
            {" "}
            <Badge color={color} text={<span  className={styles.text} style={{color}}>{text}</span>} />
        </Tag>
    );
};

export default Status;
