import { UsersService } from './../users.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { invokeSaveNewUserAPI } from './../store/users.action';
import { Appstate } from './../../shared/store/appstate';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  userForm!: FormGroup;
  public isSubmmited: boolean = false;

  constructor(private store: Store, private dialogRef: MatDialogRef<AddComponent>,
    private appStore: Store<Appstate>, public fb: FormBuilder, private dbService: NgxIndexedDBService, private userService: UsersService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  get f() { return this.userForm.controls };

  save() {
    this.isSubmmited = true;
    if (this.userForm.invalid) {
      return
    }

    //save in index db
    this.saveByIndexDB();

    return
    this.store.dispatch(invokeSaveNewUserAPI({ newUser: this.userForm.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.dialogRef.close();
        this.isSubmmited = false;
      }
    });
  }

  saveByIndexDB() {
    this.dbService
      .add('users', this.userForm.value)
      .subscribe((key) => {
        this.userService._subjectUser.next(true);
        this.dialogRef.close();
        this.isSubmmited = false;

      });

  }
}
