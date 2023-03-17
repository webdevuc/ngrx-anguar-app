import { UsersService } from './../users.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { selectUsers } from '../store/users.selector';
import { invokeUsersAPI } from '../store/users.action';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  public users$: any;
  public searchEmailValue: string = '';

  constructor(private store: Store, private dialog: MatDialog, private dbService: NgxIndexedDBService, private userService: UsersService) { }



  ngOnInit(): void {
    this.store.dispatch(invokeUsersAPI());
    this.userService._subjectUser.subscribe(response => {
      if (response) {
        this.getUsersList();
      }
    });
    this.getUsersList();

  }

  getUsersList() {
    // this.users$ = this.store.pipe(select(selectUsers));
    // this.users$ = this.store.pipe(select(selectUsers));

    this.dbService.getAll('users').subscribe((response) => {
      console.log('response =>', response);
      this.users$ = response;
    })

  }

  openAddUserModal() {
    this.dialog.open(AddComponent, { width: '600px' });
  }

  searchEmail(value: string) {
    this.users$ = this.users$.pipe(
      map((todos: any) => todos.filter((todo: any) => todo.email === value))
    );
  }
  // 
}
