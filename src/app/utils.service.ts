import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  totalCalculation(total: number, discount: number): number {
    return total - discount;
  }
}
