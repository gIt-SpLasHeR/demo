import {Component} from '@angular/core';
import { Location } from '@angular/common';
import {VERSION} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private location: Location) { }
  version = VERSION;

  public historyBack() {
    this.location.back();
  }
}
