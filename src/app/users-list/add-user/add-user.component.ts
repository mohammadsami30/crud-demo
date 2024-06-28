import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { combineLatest, debounceTime } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  isEdit: boolean = false;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private utilsService: UtilsService
  ) {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      discount: new FormControl(''),
      total: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getTotal();

    this.userService.isEdit.subscribe((index) => {
      if (index !== -1) {
        const user = this.userService.getUserByIndex(index);
        this.userForm.setValue({
          ...user,
          total: this.getTotalCalculation(user.price, user.discount),
        });
        this.isEdit = true;
      }
    });
  }

  getTotal() {
    combineLatest([
      this.userForm.get('price')!.valueChanges.pipe(debounceTime(500)),
      this.userForm.get('discount')!.valueChanges.pipe(debounceTime(500)),
    ]).subscribe(([price, discount]) => {
      this.userForm
        .get('total')!
        .setValue(this.utilsService.totalCalculation(price, discount));
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      this.userForm.reset();
      this.userService.isAddUsertoggle.next(false);
    }
  }

  editUser(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(
        this.userService.isEdit.value,
        this.userForm.value
      );
      this.userForm.reset();
      this.isEdit = false;
      this.userService.isEdit.next(-1);
      this.userService.isAddUsertoggle.next(false);
    }
  }

  closeBox(): void {
    this.userService.isAddUsertoggle.next(false);
    this.userService.isEdit.next(-1);
  }

  getTotalCalculation(price: number, discount: number): number {
    return this.utilsService.totalCalculation(price, discount);
  }
}
