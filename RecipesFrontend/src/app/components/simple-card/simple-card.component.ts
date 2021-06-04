import { Component, OnInit, Input } from '@angular/core';
import { SimpleCard } from './simple-card';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit {

  @Input() card: SimpleCard;

  constructor() { }

  ngOnInit(): void {
  }

}
