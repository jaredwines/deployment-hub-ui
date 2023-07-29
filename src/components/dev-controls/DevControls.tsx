import React from 'react';
import classNames from 'classnames';
import './DevControls.scss';
import { Button } from "@mui/material";

interface DevControlsProps {
    className?: string
    onClick: () => void
}

const DevControls: React.FC<DevControlsProps> = ({
    className,
     onClick
}) => {
    return <div className={classNames('dev-controls',className)}>
        <Button onClick={onClick} >Toggle UI Dev Controls</Button>
    </div>;
}

export default DevControls;
