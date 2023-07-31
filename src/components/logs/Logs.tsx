import React, {useCallback} from 'react';
import {Card, CardContent, Typography} from "@mui/material";
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

    const onCopy = useCallback((text: string)=>{
        navigator.clipboard.writeText(text)
    },[]);

    const logsLog : { [key:string]: number} = {};

    return <div className={classNames('logs',className)}>

        {logsToUse && <Card className={'logs-card'}>
                <CardContent>
                        {logsToUse?.map((log) => {
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
