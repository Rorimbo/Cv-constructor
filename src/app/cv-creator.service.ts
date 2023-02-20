import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CvCreatorService {
  constructor(private http: HttpClient) {}

  getCityList() {
    return this.http.get('assets/cities.json');
  }

  send(form: any) {
    return new Observable((sub) => {
      console.log(form);
      sub.next();
      sub.complete();
    });
  }
}
