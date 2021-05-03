import { Component, OnInit, Input } from '@angular/core';
import { ISimpleCard } from './simple-card.interface';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnInit {

  @Input() card: ISimpleCard;

  constructor() { }

  ngOnInit(): void {
  }

}
