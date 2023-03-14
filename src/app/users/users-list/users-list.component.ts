import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { selectUsers } from '../store/users.selector';
import { invokeUsersAPI } from '../store/users.action';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {


  constructor(private store: Store) { }
  users$ = this.store.pipe(select(selectUsers));

  ngOnInit(): void {
    this.store.dispatch(invokeUsersAPI());
  }
}
