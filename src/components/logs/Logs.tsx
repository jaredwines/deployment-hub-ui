import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import classNames from 'classnames';
import {useAppSelector} from '../../reduxHooks'
import './Logs.scss';
import {selectLogs} from "../../slices/resultsSlice";
import {selectIsSimulatingLogs} from "../../slices/devControlsSlice";
import {simulatedLogs} from "./simulatedLogs";

interface LogsProps {
    className?: string
}

const Logs: React.FC<LogsProps> = ({
   className,
}) => {
    const logs = useAppSelector(selectLogs);
    const isSimulatingLogs = useAppSelector(selectIsSimulatingLogs);

    const logsToUse = !isSimulatingLogs ? logs: simulatedLogs;

    return <div className={classNames('logs',className)}>

        {logsToUse && <Card sx={{ maxWidth: 345 }} className={'logs-card'}>
            {/*<CardActionArea>*/}
                <CardContent>
                        {logsToUse?.map((log) => {
                            return <Typography
                                variant="body2"
                                // color="text.secondary"
                                key={log}
                            >
                                {`> ${log}`}
                            </Typography>
                        })}
                </CardContent>
            {/*</CardActionArea>*/}
        </Card>}
    </div>;
}

export default Logs;
