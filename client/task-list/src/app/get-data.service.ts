import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetDataService {

  result;

  constructor(private http: Http) { }

  getTasks() {
    return this.http.get('api/tasks')
    .map(result => this.result = result.json());
  }

}
