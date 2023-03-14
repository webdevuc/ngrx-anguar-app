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

  constructor(private store: Store, private dialog: MatDialog) { }



  ngOnInit(): void {
    this.store.dispatch(invokeUsersAPI());
    this.getUsersList();
  }

  getUsersList() {
    this.users$ = this.store.pipe(select(selectUsers));

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
