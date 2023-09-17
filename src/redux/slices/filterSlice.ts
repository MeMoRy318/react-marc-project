import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { IFilterFormParams, IMovieListResponse, IMovies, IParams } from '../../interface';
import { movieService } from '../../services';

interface IState {
    page:number
    totalPage:number
    movies: IMovies[]
    params:IFilterFormParams
}

const initialState:IState = {
    movies: [],
    params: null,
    page: 1,
    totalPage: 1,
};

const getFilterMovie = createAsyncThunk<IMovieListResponse, IParams>(
    'getFilterMovie/filterSlice',
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

const filterSlice = createSlice({
    name: 'filterSlice',
    reducers: {
        addParams: (state, action:{payload:IFilterFormParams; type:string}) => {
            state.params = action.payload;
        },
    },
    initialState,
    extraReducers: builder =>
        builder
            .addCase(getFilterMovie.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.page = action.payload.page;
                state.totalPage = action.payload.total_pages;
            }),
});

const { reducer: filterReducer, actions } = filterSlice;

const filterActions = {
    ...actions,
    getFilterMovie,
};

export { filterReducer, filterActions };
