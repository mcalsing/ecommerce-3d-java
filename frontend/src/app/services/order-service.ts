import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private readonly url = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  createOrder(payload: any) {
    return this.http.post(this.url, payload);
  }
}
