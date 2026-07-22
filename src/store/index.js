import { configureStore } from '@reduxjs/toolkit';
import paymentScreenshotReducer from './paymentScreenshotSlice';

export const store = configureStore({
    reducer: {
        paymentScreenshot: paymentScreenshotReducer,
    },
});
