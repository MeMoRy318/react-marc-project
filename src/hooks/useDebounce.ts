import { useCallback, useRef } from 'react';

type CallbackFunction<T> = (arg: T) => void;

const useDebounce = <T>(callback: CallbackFunction<T>, delay: number): CallbackFunction<T> => {
    const timer = useRef<number>();

    return useCallback(
        (arg: T) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = window.setTimeout(() => {
                callback(arg);
            }, delay);
        },
        [callback, delay],
    );
};

export { useDebounce };
