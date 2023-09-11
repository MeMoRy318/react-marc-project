import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IMovieListResponse, IMovies, ISearchParams } from '../../interface';
import { movieService } from '../../services';

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

const searchMovies = createAsyncThunk<IMovieListResponse, ISearchParams>(
    'searchMovies/searchSlice',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await movieService.search(params);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        clearMoviesArray: state => {
            state.movies = [];
            state.total_pages = 1;
            state.page = 1;
        },
    },
    extraReducers: builder => builder
        .addCase(searchMovies.fulfilled, (state, action) => {
            state.error = null;
            state.isLoading = false;
            state.movies = [...state.movies, ...action.payload.results];
            state.total_pages = action.payload.total_pages;
            state.page = action.payload.page;
        })
        .addCase(searchMovies.pending, state => {
            state.isLoading = true;
        }),
});

const { reducer: searchReducer, actions } = searchSlice;

const searchAction = {
    ...actions,
    searchMovies,
};

export { searchReducer, searchAction };
