import { invokeSaveNewUserAPI } from './../store/users.action';
import { Appstate } from './../../shared/store/appstate';
import { Store, select } from '@ngrx/store';
import { Users } from './../store/users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  userForm: Users = {
    id: 0,
    name: '',
    email: '',
  };

  constructor(private store: Store,
    private appStore: Store<Appstate>,
    private router: Router) { }

  ngOnInit(): void {

  }

  save() {
    this.store.dispatch(invokeSaveNewUserAPI({ newUser: this.userForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
