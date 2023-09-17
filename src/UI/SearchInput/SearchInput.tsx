import React, { FC, FormEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { nanoid } from 'nanoid';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useDebounce, useScrollPagination } from '../../hooks';
import { searchAction } from '../../redux/slices';
import { SearchMovieItem } from '../../components';

import styles from './SearchInput.module.scss';

const SearchInput: FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { movies } = useAppSelector(state => state.searchReducer);
    const { lastElement } = useScrollPagination(inputRef?.current?.value);
    const debounce = useDebounce(dispatch, 500);

    const isQuerySearch = pathname.includes('search');

    const handleChangeInput = () => {
        if (inputRef.current.value.length >= 2 && !isQuerySearch) {
            dispatch(searchAction.clearMoviesArray());
            debounce(searchAction.searchMovies({ query: inputRef.current.value }));
        }
        if (!inputRef.current.value.length && !isQuerySearch) {
            dispatch(searchAction.clearMoviesArray());
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSubmit(e);
        }
    };
    const cleanInputRef = () => {
        inputRef.current.value = '';
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (inputRef.current.value) {
            navigate(`/search/${inputRef.current.value}`);
        }
        if (!isQuerySearch) {
            dispatch(searchAction.clearMoviesArray());
        }
        inputRef.current.value = '';
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
                        onKeyDown={handleKeyDown}
                        className={styles.search__input}
                    />
                    <button className={styles.search__button}><FaSearch/></button>
                </form>
                {
                    !!movies?.length &&
                    !isQuerySearch &&
                    inputRef?.current?.value &&
                    <div className={styles.search__results}>
                        {movies.map(value => (<SearchMovieItem movie={value} key={value.id + nanoid()} callback={cleanInputRef}/>))}
                        <div ref={lastElement}></div>
                    </div>
                }
            </div>
        </div>
    );
};

export { SearchInput };
