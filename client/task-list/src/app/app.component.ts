import { Component, Input, OnInit } from '@angular/core';
import { GetDataService } from './get-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks: Array<any>;

  constructor(
    private getDataService: GetDataService
    ) {}

  ngOnInit() {
    this.getDataService.getTasks().subscribe(
      response => this.tasks = response
    );
  }


}
