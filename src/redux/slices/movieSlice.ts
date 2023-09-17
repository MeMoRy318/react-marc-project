import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { IMovie, IMovieListResponse, IMovies, IPopularMovies } from '../../interface';
import { movieService } from '../../services';
import { IParams } from '../../interface';
import { urls } from '../../configs';

interface IState {
    page:number
    total_pages:number
    movie:IMovie
    movies:IMovies[]
    popularMovies:IPopularMovies[]
}

const initialState:IState = {
    movies: [],
    popularMovies: [],
    movie: null,
    page: 1,
    total_pages: 1,
};

const getAll = createAsyncThunk<IMovieListResponse, IParams | null>(
    'getAll/movieSlice',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await movieService.getAll(params);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const getById = createAsyncThunk<IMovie, { id: number }>(
    'getById/movieSlice',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await movieService.getById(id);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const getPopular = createAsyncThunk<IMovieListResponse, IParams>(
    'getPopular/movieSlice',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await movieService.getAll(params);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.movies = [...state.movies, ...action.payload.results];
            state.total_pages = action.payload.total_pages;
            state.page = action.payload.page;
        })
        .addCase(getPopular.fulfilled, (state, action) => {
            state.popularMovies = action.payload.results.map(value => ({
                title: value.title,
                image: !!value.backdrop_path ? urls.posterUrl.base + value.backdrop_path : urls.notFoundPoster.base,
            }));
        })
        .addCase(getById.fulfilled, (state, action) => {
            state.movie = action.payload;
        }),
});

const { reducer: movieReducer, actions } = movieSlice;

const movieAction = {
    ...actions,
    getAll,
    getPopular,
    getById,
};

export { movieReducer, movieAction };
