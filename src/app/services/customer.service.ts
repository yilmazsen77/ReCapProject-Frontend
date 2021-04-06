import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44322/api/customers/getall';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl)
  }

}
