import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemMenu } from '../system-menu';

@Injectable({
  providedIn: 'root'
})
export class SystemMenuService {

  constructor(private http: HttpClient) { }

  private menus: SystemMenu[] = [];

  getSystemMenus() {
    return this.http
      .get<SystemMenu[]>('../assets/menu.json');
  }
}
