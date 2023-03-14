import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/users.effect';
import { userReducer } from './store/users.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('myUsers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
    FormsModule
  ]
})
export class UsersModule { }
