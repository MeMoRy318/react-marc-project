import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { ICast, ICredits } from '../../interface';
import { creditService } from '../../services';

interface IState {
    cast:ICast[]
}

const initialState:IState = {
    cast: [],
};

const getAll = createAsyncThunk<ICredits, { id: number }>(
    'getAll/creditSlice',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await creditService.getAll(id);
            return data;
        }catch (e) {
            const error = e as AxiosError;
            return  rejectWithValue(error.message);
        }
    },
);

const creditSlice = createSlice({
    name: 'creditSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.cast = action.payload.cast;
        }),
});

const { reducer: creditReducer, actions } = creditSlice;

const creditAction = {
    ...actions,
    getAll,
};

export { creditReducer, creditAction };
