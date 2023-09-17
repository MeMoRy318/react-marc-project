import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IMovieListResponse, IMovies, ISearchParams } from '../../interface';
import { movieService } from '../../services';

interface IState {
    isLoading:boolean
    error:string
    movies:IMovies[]
    page:number
    totalPages:number
}

const initialState:IState = {
    isLoading: null,
    error: null,
    movies: [],
    page: 1,
    totalPages: 1,
};

const searchMovies = createAsyncThunk<{ data:IMovieListResponse; isQuerySearch:boolean  }, ISearchParams>(
    'searchMovies/searchSlice',
    async ({ isQuerySearch = false, ...params }, { rejectWithValue }) => {
        try {
            const { data } = await movieService.search(params);
            return { data, isQuerySearch };
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
            state.totalPages = 1;
            state.page = 1;
        },
    },

    extraReducers: builder => builder
        .addCase(searchMovies.fulfilled, (state, action) => {
            const { isQuerySearch, data } = action.payload;

            state.error = null;
            state.isLoading = false;
            state.totalPages = data.total_pages;
            state.page = data.page;
            if (isQuerySearch) {
                state.movies = data.results;
            }else {
                state.movies = [...state.movies, ...data.results];
            }
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
