import React from 'react';
import classNames from 'classnames';
import {FieldError, UseFormRegisterReturn} from "react-hook-form"
import { InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import './Select.scss';

interface SelectProps extends UseFormRegisterReturn<keyof Inputs> {
    fieldError?: FieldError
    label: string
    inputId?: string
    options: Option[]
    className?: string
}

const Select: React.FC<SelectProps> = ({
    className,
    fieldError,
    inputId,
    label,
    options,
    ...registeredProps
}) => {
    const labelId = inputId ?? label

    return <div className={classNames('select-container',className)}>
        <InputLabel id={labelId} className={'label'}>{label}</InputLabel>
        <MuiSelect
            classes={{
                select: 'select'
            }}
            labelId={labelId}
            label={label}
            { ...registeredProps }
        >
            {options.map((option) => {
                return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            })}
        </MuiSelect>
        {fieldError && <span>{fieldError.message}</span>}
    </div>;
}

export default Select;
