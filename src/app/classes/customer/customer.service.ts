import { Injectable } from '@angular/core';
import { CustomerDTO } from './customerDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers: CustomerDTO[] = [];

  constructor() { }
}
