import React, {useCallback} from 'react';
import { Button } from "@mui/material";
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../reduxHooks'
import {
    selectIsDevMode,
    toggleDevMode,
    toggleSimulatingLoading,
    toggleSimulatingLogs
} from '../../slices/devControlsSlice'
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

    const setWasSuccessful = useCallback((update: boolean) => dispatch(updateWasSuccessful(update)),[dispatch])
    const setWasFailure = useCallback((update: boolean) => dispatch(updateWasFailure(update)), [dispatch])

    const onToggleDevModeClick = useCallback(() => dispatch(toggleDevMode()),[dispatch])
    const onSuccessClick = useCallback(() => setWasSuccessful(true), [setWasSuccessful])
    const onFailClick = useCallback(() => setWasFailure(true), [setWasFailure])
    const onLoadingClick = useCallback(() => dispatch(toggleSimulatingLoading()), [])
    const onLogsClick = useCallback(() => dispatch(toggleSimulatingLogs()), [])

    return <div className={classNames('dev-controls',className)}>
        <Button onClick={onToggleDevModeClick} >Toggle UI Dev Controls</Button>

        {isDevMode && <>
            <Button variant="contained" type="button" onClick={onSuccessClick}>Simulate Success</Button>
            <Button variant="outlined" type="button" onClick={onFailClick}>Simulate Failure</Button>
            <Button variant="contained" type="button" onClick={onLoadingClick}>Simulate Loading</Button>
            <Button variant="outlined" type="button" onClick={onLogsClick}>Simulate Logs</Button>
        </> }
    </div>;
}

export default DevControls;
