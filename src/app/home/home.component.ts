import { Component, OnInit } from '@angular/core';
import { UniverseService } from '../common/universe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private universeService: UniverseService) { }

  ngOnInit() {
      // this.universeService.setParams('projectList', []);
  }
}
