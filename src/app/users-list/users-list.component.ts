import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UtilsService } from '../utils.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  isToggleAdd: boolean = false;
  users: User[] = [];
  listUsers: User[] = [];
  filteredUsers: User[] = [];

  search: FormControl;

  constructor(
    private userService: UserService,
    private utilsService: UtilsService
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.getUsers();
    this.userService.isAddUsertoggle.subscribe(
      (value) => (this.isToggleAdd = value)
    );
    this.listUsers = this.users;
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      console.log(val);
      this.searchUsers(val);
    });
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  togleAddUser(): void {
    this.isToggleAdd = !this.isToggleAdd;
  }

  getTotalCalculation(price: number, discount: number): number {
    return this.utilsService.totalCalculation(price, discount);
  }

  updateUserData(index: number): void {
    this.userService.isEdit.next(index);
    this.userService.isAddUsertoggle.next(true);
  }

  deleteUserData(index: number): void {
    this.userService.deleteUser(index);
  }

  searchUsers(searchKey: string) {
    if (!searchKey) {
      this.filteredUsers = [];
      this.listUsers = this.users;
      return
    }
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    this.listUsers = this.filteredUsers;
  }
}
