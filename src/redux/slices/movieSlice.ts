import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { IMovieListResponse, IMovies } from '../../interface';
import { movieService } from '../../services';
import { IParams } from '../../interface';

interface IState {
    isLoading:boolean
    error:string
    movies:IMovies[]
    page:number
    total_pages:number
}

const initialState:IState = {
    isLoading: null,
    error: null,
    movies: [],
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

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.error = null;
            state.isLoading = null;
            state.movies = action.payload.results;
            state.total_pages = action.payload.total_pages;
            state.page = action.payload.page;
        }),
});

const { reducer: movieReducer, actions } = movieSlice;

const movieAction = {
    ...actions,
    getAll,
};

export { movieReducer, movieAction };
