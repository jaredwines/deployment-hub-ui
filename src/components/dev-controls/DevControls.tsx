import React from 'react';
import { Button } from "@mui/material";
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../reduxHooks'
import {selectIsDevMode, toggleDevMode} from '../../slices/devControlsSlice'
import './DevControls.scss';
import {updateWasFailure, updateWasSuccessful} from "../../slices/resultsSlice";

interface DevControlsProps {
    className?: string
}

const DevControls: React.FC<DevControlsProps> = ({
    className,
}) => {
    const dispatch = useAppDispatch()
    const isDevMode = useAppSelector(selectIsDevMode)

    const setWasSuccessful = (update: boolean) => dispatch(updateWasSuccessful(update))
    const setWasFailure = (update: boolean) => dispatch(updateWasFailure(update))

    return <div className={classNames('dev-controls',className)}>
        <Button onClick={() => dispatch(toggleDevMode())} >Toggle UI Dev Controls</Button>

        {isDevMode && <>
            <Button variant="contained" type="button" onClick={() => setWasSuccessful(true)}>Simulate Success</Button>
            <Button variant="outlined" type="button" onClick={() => setWasFailure(true)}>Simulate Failure</Button>
        </> }
    </div>;
}

export default DevControls;
