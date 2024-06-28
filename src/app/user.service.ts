import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAddUsertoggle = new BehaviorSubject<boolean>(false);
  isEdit = new BehaviorSubject<number>(-1);

  constructor() {}

  getUsers(): User[] {
    return USERS;
  }

  addUser(user: User): void {
    USERS.push(user);
  }

  updateUser(index: number, user: User): void {
    USERS[index] = user;
  }

  getUserByIndex(index: number): User {
    return USERS[index];
  }

  deleteUser(index:number): void {
    USERS.splice(index, 1);
  }
}
