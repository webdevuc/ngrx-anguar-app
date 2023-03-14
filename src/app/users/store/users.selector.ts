import { Users } from './users';
import { createFeatureSelector } from '@ngrx/store';

 
export const selectUsers = createFeatureSelector<Users[]>('myUsers');