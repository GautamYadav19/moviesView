import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { SearchResponse } from './SearchResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpclient: HttpClient) {}
  getMovieByTitle(titleInformation: any, currentPage: number): Observable<any> {
    const title = titleInformation.trim().toLowerCase();
    const path = `https://www.omdbapi.com/?s=${title}&page=${currentPage}&apikey=4d305e78`;
    return this.httpclient.get(path);
  }
  getSearchMovieByID(id: any): Observable<any> {
    const path = `https://www.omdbapi.com/?i=${id}&apikey=4d305e78`;
    return this.httpclient.get(path);
  }
  getSomeMovies(): Observable<any> {
    const path = `https://www.omdbapi.com/?s=war&apikey=4d305e78`;
    return this.httpclient.get(path);
  }
}
