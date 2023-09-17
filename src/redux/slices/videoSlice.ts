import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { ITrailer } from '../../interface';
import { movieService } from '../../services';

interface IState {
    trailer:ITrailer[]
}

const initialState:IState = {
    trailer: null,
};

const getTrailers = createAsyncThunk<ITrailer[], {id:number}>(
    'getTrailers/videoSlice',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data: { results } } = await movieService.getVideo(id);
            return results;
        }catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.message);
        }
    },
);

const videoSlice = createSlice({
    name: 'videoSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getTrailers.fulfilled, (state, action) => {
            state.trailer = action.payload;
        }),
});

const { reducer: videoReducer, actions } = videoSlice;

const videoActions = {
    ...actions,
    getTrailers,
};

export { videoReducer, videoActions };
