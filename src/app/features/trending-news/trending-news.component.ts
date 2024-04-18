import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {TrendingNewsService} from "./services/trending-news.service";
import {IntersectionListenerDirective} from "./directives/intersection-listener.directive";

@Component({
  selector: 'app-trending-news',
  standalone: true,
  imports: [
    AsyncPipe,
    IntersectionListenerDirective
  ],
  templateUrl: './trending-news.component.html',
  styleUrl: './trending-news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendingNewsComponent implements OnInit {

  trendingNews = this.newsService.newsList$.asObservable()

  constructor(private newsService: TrendingNewsService) { }

  ngOnInit() {
    this.newsService.getTrendingNews()
  }

  loadMoreNews() {
    this.newsService.loadMoreNews()
  }
}
