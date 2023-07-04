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
        this.ListOfMovies = data;
        this.totalItems = data.totalResults / 10;
        if (this.ListOfMovies && this.ListOfMovies.Search !== undefined) {
          this.loading = false;
          this.indicator = true;
          this.name = this.searchMovie.value;
          this.flag = -1;
        }

        this.error = this.errorMessage(this.ListOfMovies);
      },
      (e) => {
        this.error = this.errorMessage(e.statusText);
      }
    );
  }
  // fetchMovieById() {
  //   for (let movie of this.ListOfMovies.Search) {
  //     this.searchService.getSearchMovieByID(movie.imdbID).subscribe((data) => {
  //       this.listByID = data;
  //       console.log('dsf', this.listByID.imdbRating);
  //     });
  //   }
  // }
  // fetchMovieById1(id: any, title: string, currentPage: number) {
  //   // this.searchService.getMovieByTitle(title,currentPage).subscribew
  //   for (let movie of this.ListOfMovies.Search) {
  //     this.searchService.getSearchMovieByID(movie.imdbID).subscribe((data) => {
  //       this.ratingList = data;
  //       console.log('dsf', this.ratingList.imdbRating);
  // for (let i = 0; i < this.ratingList; i++) {
  //   for (let j = i + 1; j < this.ratingList; i++) {
  //     if (this.ratingList.imdbRating[i] > this.ratingList.imdbRating[j]) {
  //       let temp = this.ratingList.imdbRating[i];
  //       this.ratingList.imdbRating[i] = this.ratingList.imdbRating[j];
  //       this.ratingList.imdbRating[j] = temp;
  //       console.log(temp);
  //     }
  //   }
  // }
  // for (let item = 0; item < this.ratingList; item++) {
  //   console.log(this.ratingList.imdbRating);
  // }
  //     });
  //   }
  // }
  onCancel() {
    this.loading = false;
    this.indicator = false;
    this.flag = -1;
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
