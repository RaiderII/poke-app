import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../reducers/appSlice';
import { ThemeProvider } from 'styled-components';
import theme from '../lib/theme';
import Head from 'next/head';

const store = configureStore({
  reducer: {
    pokeStore: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Nunito:wght@600;900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>

        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
