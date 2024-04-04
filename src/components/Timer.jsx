import { useEffect, useState } from "react";

export const Timer = ({
    initialSeconds, onFinish
}) => {
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
    }, [time, initialSeconds, onFinish]);

    return `${time}s remaining`;
};
