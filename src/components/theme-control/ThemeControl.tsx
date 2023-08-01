import React, {useCallback} from 'react';
import {Box, IconButton, Theme,} from "@mui/material";
import classNames from 'classnames';
import './ThemeControl.scss';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {transitionView} from "../../shared/utils/transitionView";

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

    const onClickHandler = useCallback(() => {
        transitionView(onClick)
    }, [onClick])

    return <div className={classNames('theme-control',className)}>
        <Box
            className={'theme-control-box'}
        >
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={onClickHandler} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    </div>;
}

export default ThemeControl;
