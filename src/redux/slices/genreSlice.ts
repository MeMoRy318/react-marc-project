import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { IGenre, IGenres } from '../../interface';
import { genreService } from '../../services';

interface IState {
    genres:IGenre[]
}

const initialState:IState = {
    genres: [],
};

const getAll = createAsyncThunk<IGenres, void>(
    'getAll/genreSlice',
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await genreService.getAll();
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.genres = action.payload.genres;
            }),
});

const { reducer: genreReducer, actions } = genreSlice;

const genreAction = {
    ...actions,
    getAll,
};

export { genreReducer, genreAction };
