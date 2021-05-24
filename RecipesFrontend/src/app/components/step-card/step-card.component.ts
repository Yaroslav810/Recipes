import { Component, OnInit, Input } from '@angular/core';
import { StepCard } from './step-card';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.css']
})
export class StepCardComponent implements OnInit {

  @Input() card: StepCard;
  
  constructor() { }

  ngOnInit(): void {
  }

}
