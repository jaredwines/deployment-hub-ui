import React from 'react';
import {Box, IconButton, Theme,} from "@mui/material";
import classNames from 'classnames';
import './ThemeControl.scss';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

interface ThemeControlProps {
    className?: string
    theme: Theme
    onClick: () => void
}

const ThemeControl: React.FC<ThemeControlProps> = ({
    className,
    theme,
    onClick
}) => {

    return <div className={classNames('theme-control',className)}>
        <Box
            className={'theme-control-box'}
        >
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    </div>;
}

export default ThemeControl;
