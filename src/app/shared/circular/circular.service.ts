import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Circular } from './circular.model';

@Injectable({
  providedIn: 'root'
})
export class CircularService {

  circulars: Circular[] = [];
  // [
  //   {
  //     _id: 'fakeId1234',
  //     date: '01/28/2020',
  //     title: 'Fundraiser',
  //     author: 'Joseph Sendra',
  //     paragraph: [
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //       'Unde laudantium sed cumque temporibus quos libero consectetur nam quod cum,
  //        rerum amet provident corporis facere esse, perferendis nisi molestias.',
  //       'Sapiente, similique?'
  //     ],
  //     imgUrl: '/assets/images/susan-yin-2JIvboGLeho-unsplash.jpg',
  //     isActive: true
  //   },
  //   {
  //     _id: 'fakeId1235',
  //     date: '01/29/2020',
  //     title: 'Fake title number 1',
  //     author: 'Joseph Sendra',
  //     paragraph: [
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde laudantium sed
  //        cumque temporibus quos libero consectetur nam quod cum, rerum',
  //       ' amet provident corporis facere esse, perferendis nisi molestias.',
  //       'Sapiente, similique?'
  //     ],
  //     imgUrl: '',
  //     isActive: false
  //   },
  //   {
  //     _id: 'fakeId1236',
  //     date: '01/30/2020',
  //     title: 'Fake title you give it a number',
  //     author: 'Lynn Sendra',
  //     paragraph: [
  //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde laudantium sed cumque temporibus quos',
  //       'libero consectetur nam quod cum, rerum amet provident corporis facere esse, perferendis nisi molestias.',
  //       'Sapiente, similique?'
  //     ],
  //     imgUrl: '',
  //     isActive: true
  //   },
  // ]

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
      ('http://localhost:3000/api/v1/circulars/')
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
      (`http://localhost:3000/api/v1/circulars/${circularID}`)
        .subscribe(circular => {
          resolve(circular);
        },
        (error => {
          console.log(error);
        })
      );
    });
  }

}
