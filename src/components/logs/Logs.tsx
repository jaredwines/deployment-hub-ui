import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../reduxHooks'
// import './Logs.scss';
import {selectLogs} from "../../slices/resultsSlice";

interface LogsProps {
    className?: string
}

const Logs: React.FC<LogsProps> = ({
   className,
}) => {
    const logs = useAppSelector(selectLogs);

    // const dispatch = useAppDispatch()
    // const isDevMode = useAppSelector(selectIsDevMode)
    //
    // const setWasSuccessful = (update: boolean) => dispatch(updateWasSuccessful(update))

    return <div className={classNames('logs',className)}>

        {logs && <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                        {logs?.map((log) => {
                            return <Typography variant="body2" color="text.secondary">
                                {log}
                            </Typography>
                        })}
                </CardContent>
            </CardActionArea>
        </Card>}
    </div>;
}

export default Logs;
