import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TrendingNewsInterface} from "../interfaces/trending-news.interface";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrendingNewsService {
  baseUrl: string = 'https://hacker-news.firebaseio.com/v0';
  getTrendingNewsIdListUrl = 'topstories.json'

  newsListIds: number[] = []
  newsList$ = new BehaviorSubject<TrendingNewsInterface[]>([])
  newsListItem$ = new Subject<TrendingNewsInterface>()

  newsPerPage: number = 10


  constructor(private http: HttpClient) { }

  getTrendingNews() {
    this.getNewsListIds().subscribe(ids => {
      this.newsListIds = ids;
      this.loadMoreNews()
    })
  }

  loadMoreNews() {
    const start = this.newsList$.getValue().length
    const end = start + this.newsPerPage
    for (let i = start; i < end && i < this.newsListIds.length; i++) {
      this.getNewsById(this.newsListIds[i]).subscribe(res => {
        this.newsList$.next([
          ...this.newsList$.getValue(),
          res
        ])
        this.newsListItem$.next(res)
      })
    }
  }

  getNewsListIds() {
    return this.http.get<number[]>(`${this.baseUrl}/${this.getTrendingNewsIdListUrl}`);
  }

  getNewsById(id: number) {
    return this.http.get<TrendingNewsInterface>(`${this.baseUrl}/item/${id}.json`);
  }
}
