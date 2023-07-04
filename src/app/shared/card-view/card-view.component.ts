import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})
export class CardViewComponent implements OnInit {
  @Input() movies: any = [];
  @Input() itemsPerPage: number = 2;
  @Input() totalItems: number = 5;
  @Input() currentPage: number = 1;
  constructor() {}
  ngOnInit(): void {}
}
