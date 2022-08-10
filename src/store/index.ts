import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from './reducers/ticketSlice';
import ticketPackageReducer from './reducers/ticketPackageSlice';
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
    reducer: {
        ticketReducer,
        ticketPackageReducer,
    }
})

export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState > = useSelector

export default store