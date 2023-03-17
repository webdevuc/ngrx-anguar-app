import { SharedModule } from './../shared/module/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './store/users.effect';
import { userReducer } from './store/users.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { AddComponent } from './add/add.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';


@NgModule({
  declarations: [
    UsersListComponent,
    AddComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('myUsers', userReducer),
    EffectsModule.forFeature([UsersEffect]),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class UsersModule { }
