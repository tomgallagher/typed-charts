import { useEffect, useRef } from 'react';

//callbacks need a type defined
type IntervalFunction = () => unknown | void;

export const useInterval = (callback: IntervalFunction, delay: number) => {
    //define the saved callback  as null to start with union type
    const savedCallback = useRef<IntervalFunction | null>(null);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current !== null) {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
