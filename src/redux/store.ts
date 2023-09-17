import { configureStore } from '@reduxjs/toolkit';

import {
    creditReducer, favoriteReducer,
    filterReducer,
    genreReducer,
    loadingAndErrorReducer,
    movieReducer,
    searchReducer,
    videoReducer,
} from './slices';

const store = configureStore({
    reducer: {
        movieReducer,
        searchReducer,
        creditReducer,
        filterReducer,
        genreReducer,
        videoReducer,
        loadingAndErrorReducer,
        favoriteReducer,
    },
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };


