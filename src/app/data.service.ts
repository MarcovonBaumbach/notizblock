import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  note: string;
  title: string;
  abort: boolean = true;

  constructor() { }
}
