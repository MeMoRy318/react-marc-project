import { configureStore } from '@reduxjs/toolkit';

import { movieReducer, searchReducer } from './slices';

const store = configureStore({
    reducer: {
        movieReducer,
        searchReducer,
    },
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };


