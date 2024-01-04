import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/cors/service.service';

@Component({
  selector: 'app-movie-detials',
  templateUrl: './movie-detials.component.html',
  styleUrls: ['./movie-detials.component.css'],
})
export class MovieDetialsComponent implements OnInit {
  loading: boolean = true;
  
  constructor(
    private apiService: ServiceService,
    private actRoute: ActivatedRoute
  ) {}
  singlemovie: any = [];
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getMovieByID(id);
  }
  getMovieByID(id: any) {
    this.apiService.getSearchMovieByID(id).subscribe((data) => {
      this.singlemovie = data;
      this.loading = false;
    });
  }
}
