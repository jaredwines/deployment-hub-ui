import React, {useCallback} from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
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

    return <div className={classNames('logs',className)}>

        {logsToUse && <Card className={'logs-card'}>
            {/*<CardActionArea>*/}
                <CardContent>
                        {logsToUse?.map((log) => {
                            // return <CardActionArea onClick={() => onCopy(log)}>
                                return <Typography
                                    variant="body2"
                                    // color="text.secondary"
                                    key={log}
                                >
                                    {`${log}`}
                                </Typography>
                            // </CardActionArea>
                        })}
                </CardContent>
            {/*</CardActionArea>*/}
        </Card>}
    </div>;
}

export default Logs;
