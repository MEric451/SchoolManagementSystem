import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //helps receive data from the internet
import { Observable } from 'rxjs';    //tells when the data is has been sent or received

@Injectable({
  providedIn: 'root'
})
export class StudentsService {    //class to handle employee's data

  constructor(private _http: HttpClient) { }
}
