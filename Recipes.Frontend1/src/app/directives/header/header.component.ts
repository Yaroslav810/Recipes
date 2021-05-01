import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

export interface IHeaderLinks {
  title: string,
  onAction(): void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private links: IHeaderLinks[];
  constructor() { 
    this.links = [
      {
        title: 'Главная',
        onAction: () => {
          //
        }
      }
    ];
  }

  ngOnInit(): void {
  }

}
