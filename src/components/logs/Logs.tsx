import React, {useCallback, useEffect, useState} from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import classNames from 'classnames';
import {useAppSelector} from '../../reduxHooks'
import './Logs.scss';
import {selectLogs} from "../../slices/resultsSlice";
import {selectIsSimulatingLogs} from "../../slices/devControlsSlice";
import {simulatedLogs} from "./simulatedLogs";
import {transitionView} from "../../shared/utils/transitionView";

interface LogsProps {
    className?: string
}

const Logs: React.FC<LogsProps> = ({
   className,
}) => {
    const logs = useAppSelector(selectLogs);
    const isSimulatingLogs = useAppSelector(selectIsSimulatingLogs);

    const [logsState, setLogsState] = useState(logs);

    useEffect(() => {
        const logsToUse = !isSimulatingLogs ? logs: simulatedLogs;
        transitionView(() => setLogsState(logsToUse))
    }, [isSimulatingLogs, logs]);

    const logsLog : { [key:string]: number} = {};

    return <div className={classNames('logs',className)}>

        {logsState && <Card className={'logs-card'}>
                <CardContent>
                        {logsState?.map((log) => {
                            let key = log
                            if (!logsLog[log]) {
                                logsLog[log] = 1;
                            }else {
                                logsLog[log] += 1
                                key = key + `_${logsLog[log]}`
                            }
                                return <Typography
                                    variant="body2"
                                    // color="text.secondary"
                                    key={key}
                                >
                                    {`${log}`}
                                </Typography>
                        })}
                </CardContent>
        </Card>}
    </div>;
}

export default Logs;
