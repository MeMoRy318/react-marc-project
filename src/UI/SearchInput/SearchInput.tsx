import React, { FC, PropsWithChildren, useRef } from 'react';

import { useAppDispatch, useAppSelector, useDebounce } from '../../hooks';
import { searchAction } from '../../redux/slices';

type IProps = PropsWithChildren

const SearchInput: FC<IProps> = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { movies } = useAppSelector(state => state.searchReducer);
    const debounce = useDebounce(dispatch, 1000);

    const handleChangeInput = () => {
        if (inputRef.current.value.length >= 3) {
            debounce(searchAction.searchMovies({ query: inputRef.current.value }));
        }
        if (!inputRef.current.value.length) {
            dispatch(searchAction.clearMoviesArray());
        }
    };

    return (
        <div>
            <form>
                <input type="text" name="search" ref={inputRef} onChange={handleChangeInput}/>
            </form>
        </div>
    );
};

export { SearchInput };
