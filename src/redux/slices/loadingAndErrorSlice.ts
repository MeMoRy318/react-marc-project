import { createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit';

interface IState {
    error:string
    isLoading:boolean
}

const initialState:IState = {
    error: null,
    isLoading: null,
};

const loadingAndErrorSlice = createSlice({
    name: 'loadingAndErrorSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(
                (action) =>
                    !action.type.startsWith('deleteOrAdd/favoriteSlice') &&
                    !action.type.startsWith('searchMovies/searchSlice'),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                },
            )
            .addMatcher(isRejected(), (state) => {
                state.error = 'Something went wrong';
                state.isLoading = false;
            })
            .addMatcher(isFulfilled(), (state) => {
                state.isLoading = false;
                state.error = null;
            }),
});

const { reducer: loadingAndErrorReducer } = loadingAndErrorSlice;

export { loadingAndErrorReducer };
