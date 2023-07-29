import { useEffect, useState } from "react";

interface UseTimeout {
    callback: () => void
    dependencyArray?: any[],
    timeoutSeconds: number
}

export const useTimeout = ({
   dependencyArray = [],
   callback,
   timeoutSeconds,
}: UseTimeout) => {
    const initialSecondsLeft = timeoutSeconds;
    const [secondsLeft, setSecondsLeft] = useState(initialSecondsLeft);

    useEffect(() => {
        setSecondsLeft(initialSecondsLeft)
    }, [...dependencyArray]);

    // Countdown
    useEffect(() => {
        const nodeTimeout = setTimeout(()=> {
            const updatedSecondsLeft = secondsLeft - 1;
            if (updatedSecondsLeft !== 0) {
                setSecondsLeft(updatedSecondsLeft)
            } else {
                callback();
            }
        }, 1000);
        return () => clearTimeout(nodeTimeout);
    }, [callback, secondsLeft, setSecondsLeft]);

    return { secondsLeft };

}
