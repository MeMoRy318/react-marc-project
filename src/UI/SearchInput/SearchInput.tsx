import React, { FC, FormEvent, PropsWithChildren, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { nanoid } from 'nanoid';

import { useAppDispatch, useAppSelector, useDebounce, useScrollPagination } from '../../hooks';
import { searchAction } from '../../redux/slices';
import { SearchMovieItem } from '../../components';


import styles from './SearchInput.module.scss';

type IProps = PropsWithChildren

const SearchInput: FC<IProps> = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { movies } = useAppSelector(state => state.searchReducer);
    const { lastElement } = useScrollPagination(inputRef?.current?.value);
    const debounce = useDebounce(dispatch, 1000);


    const handleChangeInput = () => {
        if (inputRef.current.value.length >= 2) {
            dispatch(searchAction.clearMoviesArray());
            debounce(searchAction.searchMovies({ query: inputRef.current.value }));
        }
        if (!inputRef.current.value.length) {
            dispatch(searchAction.clearMoviesArray());
        }
    };

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.search}>
            <div className={styles.search__content}>
                <form className={styles.search__form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        ref={inputRef}
                        onChange={handleChangeInput}
                        className={styles.search__input}
                    />
                    <button disabled={!inputRef?.current?.value} className={styles.search__button}><FaSearch/></button>
                </form>
                {
                    !!movies?.length &&
                    <div className={styles.search__results}>
                        {movies.map(value => (<SearchMovieItem movie={value} key={value.id + nanoid()}/>))}
                        <div ref={lastElement}></div>
                    </div>
                }
            </div>
        </div>
    );
};

export { SearchInput };
