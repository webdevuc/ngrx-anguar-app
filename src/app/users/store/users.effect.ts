import { UsersService } from './../users.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { selectUsers } from './users.selector';
import { invokeSaveNewUserAPI, invokeUsersAPI, saveNewUserAPISucess, usersFetchAPISuccess } from './users.action';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom, switchMap } from 'rxjs';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class UsersEffect {

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUsersAPI),
            withLatestFrom(this.store.pipe(select(selectUsers))),
            mergeMap(([, usersformStore]) => {
                if (usersformStore.length > 0) {
                    return EMPTY;
                }
                return this.usersService
                    .get()
                    .pipe(map((data) => usersFetchAPISuccess({ allUsers: data })));
            })
        )
    );

    saveNewBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeSaveNewUserAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.usersService.create(action.newUser).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            })
                        );
                        return saveNewUserAPISucess({ newUser: data });
                    })
                );
            })
        );
    });
}