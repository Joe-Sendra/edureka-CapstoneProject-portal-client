import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface StudentRegisterItem {
  'uniqueID': number;
  'name': string;
  'email': string;
  'regComplete': boolean;
}

@Injectable()
export class AdminDevService {

  // regTable: StudentRegisterItem[] = [];

  constructor(private http: HttpClient) {}

  getRegTable() {
    return this.http.get<StudentRegisterItem[]>(
      'http://localhost:3000/api/v1/reg'
    );
  }
}
