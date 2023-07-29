import React from 'react';
import classNames from 'classnames';
import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import {FormHelperText, InputLabel, MenuItem, Select as MuiSelect} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import './Select.scss';

interface SelectProps {
    label: string
    name: string
    labelId?: string
    options: Option[]
    className?: string
    controllerProps?: Omit<UseControllerProps<FieldValues, string>, 'name'>
}

const Select: React.FC<SelectProps> = ({
    className,
    labelId,
    label,
    name,
    options,
    controllerProps,
}) => {
    const id = labelId ?? label

    const {
        field,
        fieldState: { error }
    } = useController({ ...controllerProps, name });

    return <div className={classNames('select-container',className)}>
        <FormControl sx={{ m: 1, minWidth: 120 }} error={!!error}>
            <InputLabel id={id} className={'label'}>{label}</InputLabel>
            <MuiSelect
                classes={{
                    select: 'select'
                }}
                labelId={id}
                label={label}
                {...field}
            >
                {options.map((option) => {
                    return <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                })}
            </MuiSelect>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    </div>;
}

export default Select;
