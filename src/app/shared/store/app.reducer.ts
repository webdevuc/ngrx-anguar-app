import { on } from '@ngrx/store';
import { setAPIStatus } from './app.action';
import { createReducer } from '@ngrx/store';
import { Appstate } from './appstate';

export const initialState: Readonly<Appstate> = {
    apiResponseMessage: '',
    apiStatus: '',
};

export const appReducer = createReducer(
    initialState,
    on(setAPIStatus, (state, { apiStatus }) => {
        return {
            ...state,
            ...apiStatus
        };
    })
);