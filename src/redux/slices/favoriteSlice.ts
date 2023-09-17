import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { IMovieListResponse, IMovies } from '../../interface';
import { favoriteService } from '../../services';

interface IState {
    movies:IMovies[]
    page:number
    totalPages:number
}

const initialState:IState = {
    movies: [],
    page: 1,
    totalPages: 1,
};

const getAll = createAsyncThunk<IMovieListResponse, {page:number}>(
    'getAll/favoriteSlice',
    async ({ page }, { rejectWithValue }) => {
        try {
            const { data } = await favoriteService.getAll(page);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const deleteOrAdd = createAsyncThunk<void, {id:number; boolean:boolean}>(
    'deleteOrAdd/favoriteSlice',
    async ({ id, boolean }, { dispatch, rejectWithValue }) => {
        try {
            await favoriteService.addFavorite(id, boolean);
            if (!boolean) dispatch(getAll({ page: 1 }));
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.movies = action.payload.results;
            state.totalPages = action.payload.total_pages;
            state.page = action.payload.page;
        }),
});

const { reducer: favoriteReducer, actions } = favoriteSlice;

const favoriteActions = {
    ...actions,
    getAll,
    deleteOrAdd,
};

export { favoriteReducer, favoriteActions };
