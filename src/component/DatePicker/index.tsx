import {
    Calendar,
    DayRange,
    DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import React, { useEffect, useState } from "react";
import { DatePicker, Popover, Radio, RadioChangeEvent } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import styles from "./DatePicker.module.scss";
import { customLocale } from "./customLocale";

type DatePickerCustomType = {
    value?: any;
    onChange?: (value: DayValue) => void;
    textLabel?: string;
    className?: string;
    dayRange?: any;
    setDayRange?: React.Dispatch<React.SetStateAction<DayRange>>;
    type?: string;
    hasOption?: boolean;
    inputClassName?: string;
};

const DatePickerCustom: React.FC<DatePickerCustomType> = (props) => {
    const { hasOption = true } = props;
    const [value, setValue] = useState(props.value);
    const [radioValue, setRadioValue] = useState(true);

    const onChangeRadio = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value, props]);

    useEffect(() => {
        if (props.onChange !== undefined) {
            if (props.type === "to") {
                props.onChange(props.dayRange.to);
            } else if (props.type === "from") {
                props.onChange(props.dayRange.from);
            }
        }
    }, [props.dayRange, props]);

    const onChange = (pValue: any) => {
        setValue(pValue);
        if (props.onChange) {
            if (props.dayRange && props.setDayRange) {
                if (props.type === "to") {
                    props.setDayRange({ ...props.dayRange, to: pValue });
                }
                if (props.type === "from") {
                    props.setDayRange({ ...props.dayRange, from: pValue });
                }
            }
            props.onChange(pValue);
        }
    };

    const onChangeRange = (pValue: any) => {
        if (props.setDayRange) {
            props.setDayRange(pValue);
        }
    };

    const calenderContent = (
        <Calendar
            calendarClassName={styles.calendarWrapper}
            calendarSelectedDayClassName={styles.selectDay}
            value={radioValue ? value : props.dayRange}
            onChange={radioValue ? onChange : onChangeRange}
            locale={customLocale}
            colorPrimary="#FFBA7B"
            colorPrimaryLight="#FFD2A8"
            renderFooter={
                hasOption
                    ? () => {
                          return (
                              <Radio.Group
                                  className={styles.radioGroup}
                                  value={radioValue}
                                  onChange={onChangeRadio}
                              >
                                  <Radio value={true}>Theo ngày</Radio>
                                  <Radio value={false}>Theo tuần</Radio>
                              </Radio.Group>
                          );
                      }
                    : undefined
            }
        />
    );

    return (
        <Popover
            trigger="click"
            content={calenderContent}
            overlayInnerStyle={{ borderRadius: 20 }}
        >
            <DatePicker
                value={
                    value
                        ? moment({ ...value, month: value.month - 1 })
                        : undefined
                }
                panelRender={() => undefined}
                size="large"
                format="DD/MM/YYYY"
                placeholder="dd/mm/yy"
                onChange={onChange}
                className={props.inputClassName}
                suffixIcon={
                    <CalendarOutlined
                        style={{ color: "#FF993C", fontSize: "20px" }}
                    />
                }
            />
        </Popover>
    );
};

export default DatePickerCustom;
