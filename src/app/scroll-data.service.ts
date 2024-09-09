import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MoviesDetail } from './dummyData/movie-data';
import { Movie } from './model/movies-model';
@Injectable({
  providedIn: 'root'
})
export class ScrollDataService {

  moviesArray: Movie[] = MoviesDetail

  constructor() { }

  getNextBatch(startIndex: number, batchSize: number): Observable<Movie[]> {
    let batchData: Movie[] = []
    if(startIndex == this.moviesArray.length) {
      return of(batchData).pipe(delay(1000));
    } else {
      batchData = this.moviesArray.slice(startIndex,startIndex+batchSize);
      return of(batchData).pipe(delay(2000));
    }
  }
}
