import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.css']
})
export class StepCardComponent implements OnInit {

  @Input() card;
  
  constructor() { }

  ngOnInit(): void {
  }

}
