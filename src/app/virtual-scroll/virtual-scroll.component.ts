import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ScrollDataService } from '../scroll-data.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Movie } from '../model/movies-model';
import { BehaviorSubject, mergeMap, Observable, scan, tap, throttleTime } from 'rxjs';
@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualScrollComponent {

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  movies: Observable<Movie[]> ;
  batchSize = 50;
  start = 0;
  isEnd = false;
  offset = new BehaviorSubject(0);
  constructor(private dataService: ScrollDataService) {
    this.movies = this.offset.pipe(
      throttleTime(1000),
      mergeMap(startIndex => {
        this.start = startIndex;
        return this.dataService.getNextBatch(startIndex,this.batchSize)
      }),
      scan((moviesList: Movie[],moviesSubSet: Movie[]) => {
        if(moviesSubSet?.length == 0) {
          this.isEnd = true;
        }
        return [...moviesList,...moviesSubSet];
      },[]),
      tap(() => {
        if(!this.isEnd)
          this.viewport?.scrollToIndex(this.start);
      })
    )
  }

  getNextBatch() {
    const end:any = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if(end == total) {
      this.offset.next(end);
    }
  }

  trackByIdx(index: number) {
    return index;
  }
}


