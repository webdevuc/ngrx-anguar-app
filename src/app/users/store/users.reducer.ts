import { Users } from './users';
import { createReducer, on } from "@ngrx/store";
import { saveNewUserAPISucess, usersFetchAPISuccess } from './users.action';


export const initialState: ReadonlyArray<Users> = [];

export const userReducer = createReducer(
    initialState,
    on(usersFetchAPISuccess, (state, { allUsers }) => {
        return allUsers;
    }),
    on(saveNewUserAPISucess, (state, { newUser }) => {
        let newState = [...state];
        newState.unshift(newUser);
        return newState;
    })
);