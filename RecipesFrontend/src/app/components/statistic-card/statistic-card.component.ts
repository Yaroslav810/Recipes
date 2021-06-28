import { Component, Input, OnInit } from '@angular/core';
import { StatisticCard } from './statistic-card';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.css']
})
export class StatisticCardComponent implements OnInit {

  @Input() card: StatisticCard;

  constructor() { }

  ngOnInit(): void {
  }

}
