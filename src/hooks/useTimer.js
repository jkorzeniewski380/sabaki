import { useEffect, useState } from "react"

export const useTimer = (initialSeconds, onFinish) => {
    const [time, setTime] = useState(initialSeconds);

    useEffect(() => {
        if (time <= 0) {
            onFinish();
            return;
        }

        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time, onFinish]);

    return [time, setTime];
};
