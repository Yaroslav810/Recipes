import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  @Input() changePage: Function;

  constructor() { }

  ngOnInit(): void {
  }

  public clickButton(path: string): void {
    this.changePage(path);
  }

}
