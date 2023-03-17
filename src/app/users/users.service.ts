import { Users } from './store/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _subjectUser = new Subject()
  
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Users[]>('http://localhost:3000/users');
  }

  create(payload: Users) {
    return this.http.post<Users>('http://localhost:3000/users', payload);
  }
}
