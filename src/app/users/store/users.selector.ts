import { Users } from './users';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectUsers = createFeatureSelector<Users[]>('myUsers');

export const selectUserById = (userId: any) =>

    createSelector(selectUsers, (users: Users[]) => {
        var userIdDetails = users.filter((element) => element.id == userId);
        
        if (userIdDetails.length == 0) {
            return null;
        }
        return userIdDetails[0];
    });