import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  // @Input() movies: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  movies: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor() {
    console.log(this.movies);
  }
}
