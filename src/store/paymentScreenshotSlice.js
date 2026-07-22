import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: 'idle',
    error: '',
};

const paymentScreenshotSlice = createSlice({
    name: 'paymentScreenshot',
    initialState,
    reducers: {
        paymentScreenshotUploadStarted(state) {
            state.status = 'uploading';
            state.error = '';
            state.data = null;
        },
        paymentScreenshotUploadSucceeded(state, action) {
            state.status = 'succeeded';
            state.error = '';
            state.data = action.payload;
        },
        paymentScreenshotUploadFailed(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Payment screenshot upload failed.';
            state.data = null;
        },
        clearPaymentScreenshot(state) {
            state.status = 'idle';
            state.error = '';
            state.data = null;
        },
    },
});

export const {
    paymentScreenshotUploadStarted,
    paymentScreenshotUploadSucceeded,
    paymentScreenshotUploadFailed,
    clearPaymentScreenshot,
} = paymentScreenshotSlice.actions;

export default paymentScreenshotSlice.reducer;
