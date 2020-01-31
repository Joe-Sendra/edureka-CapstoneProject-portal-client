import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Circular } from './circular.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CircularService {

  circulars: Circular[] = [];

  private circularsSub = new BehaviorSubject<Circular[]>(this.circulars.slice());

  constructor(private httpClient: HttpClient) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.getCirculars();
  }

  private getCirculars() {
    return new Promise(resolve => {
      this.httpClient.get<Circular[]>
      (`${environment.apiUrl}/circulars/`)
        .subscribe(circularData => {
          this.circulars = circularData;
          this.circularsSub.next(this.circulars.slice());
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  subCirculars() {
    return this.circularsSub;
  }

  getCircular(circularID) {
    return new Promise<Circular>(resolve => {
      this.httpClient.get<Circular>
      (`${environment.apiUrl}/circulars/${circularID}`)
        .subscribe(circular => {
          resolve(circular);
        },
        (error => {
          console.log(error);
        })
      );
    });
  }

  addCircular(circular) {
    return new Promise<boolean>(resolve => {
      this.httpClient.post<{string, Circular}>
      (`${environment.apiUrl}/circulars/`, {circular})
        .subscribe(postResponseData => {
          console.log(postResponseData);
          this.getCirculars();
          resolve(true);
        },
        (error => {
          console.log(error);
          resolve(false);
        })
      );
    });
  }
}
