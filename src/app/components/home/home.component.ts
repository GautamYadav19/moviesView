import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ServiceService } from 'src/app/cors/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentPage: number = 1;
  totalItems: number = 0;
  searchMovie!: FormControl;
  indicator: boolean = false;
  ListOfMovies: any = [];
  flag: number = -1;
  error: any;
  name: any;
  loading: boolean = false;
  listByID: any = [];
  constructor(private searchService: ServiceService) {
    this.randomMovies();
    this.searchMovie = new FormControl('');
  }

  renderPage(event: number) {
    this.currentPage = event;
    this.fetechMovies(this.searchMovie.value, this.currentPage);
  }
  ngOnInit(): void {
    this.searchMovie.valueChanges.pipe(debounceTime(800)).subscribe((data) => {
      if (data) {
        this.fetechMovies(data, this.currentPage);

        if (this.searchMovie.value.length < 0) {
          this.searchMovie = new FormControl('');
        }
      }
    });
  }
  randomMovies() {
    this.searchService.getSomeMovies().subscribe((data: any) => {
      this.ListOfMovies = data;
    });
  }
  fetechMovies(title: any, currentPage: number) {
    this.loading = true;
    this.searchService.getMovieByTitle(title, currentPage).subscribe(
      (data) => {
        console.log('data', data);
        this.ListOfMovies = data;
        this.totalItems = data.totalResults / 10;
        console.log('total LIst', this.ListOfMovies);
        console.log('total items', this.totalItems);
        if (this.ListOfMovies && this.ListOfMovies.Search !== undefined) {
          this.loading = false;
          this.indicator = true;
          this.name = this.searchMovie.value;
          this.flag = -1;
          console.log(this.loading, this.indicator, this.name, this.flag);
        }

        this.error = this.errorMessage(this.ListOfMovies);
      },
      (e) => {
        this.error = this.errorMessage(e.statusText);
      }
    );
  }

  onCancel() {
    this.loading = false;
    this.indicator = false;
    this.flag = -1;
    console.log(this.loading, this.indicator, this.name, this.flag);
  }
  errorMessage(list: any) {
    if (list.Error === 'Too many results.') {
      this.flag = 0;
      this.loading = false;
      return 'Too many result so please enter complete name';
    }
    if (list.Error === 'Movie not found!') {
      this.flag = 1;
      this.loading = false;
      return 'Movie not found!';
    }
    if (list === 'Unknown Error') {
      this.flag = 1;
      this.loading = false;
      return 'There is something wrong or no internet connect';
    }
    return;
  }
}
