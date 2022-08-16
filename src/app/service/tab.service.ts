import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  tabs: {path: string, title: string}[] = [];
  activatedMenuIndex = -1;

  constructor( ) { }

  Tabs() {
    return this.tabs;
  }

  ActivatedMenuIndex(): number {
    return this.activatedMenuIndex;
  }

  setActivatedMenuIndex(val: number) {
    this.activatedMenuIndex = val;
  }
}
