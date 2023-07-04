import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initial-home',
  templateUrl: './initial-home.component.html',
  styleUrls: ['./initial-home.component.css'],
})
export class InitialHomeComponent {
  @Input() movies: any = [];
}
