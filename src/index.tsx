import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';

import { routers } from './routers';
import { store } from './redux';
import { ThemaContextProvider } from './hok';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <Provider store={store}>
        <ThemaContextProvider>
            <RouterProvider router={routers}/>,
        </ThemaContextProvider>
    </Provider>,
);

