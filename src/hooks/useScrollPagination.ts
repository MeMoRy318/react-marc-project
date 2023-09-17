import React, { useEffect, useRef } from 'react';

import { searchAction } from '../redux/slices';

import { useAppDispatch, useAppSelector } from './reduxHooks';

interface IScrollPagination {
    lastElement:React.MutableRefObject<HTMLDivElement>
}
const useScrollPagination = (query:string):IScrollPagination => {

    const lastElement = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>(null);
    const { isLoading, page, totalPages } = useAppSelector(state => state.searchReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current?.disconnect();

        const callback: IntersectionObserverCallback = (entries, observer) => {
            if (
                entries[0].isIntersecting &&
                page < totalPages
            ) {
                dispatch(searchAction.searchMovies({ page: page + 1, query }));
            }
        };

        observer.current = new IntersectionObserver(callback);
        if (lastElement.current) {
            observer.current.observe(lastElement.current);
        }
    }, [isLoading]);

    return { lastElement };

};

export { useScrollPagination };
