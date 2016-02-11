import {Component} from 'angular2/core';
import {News} from './news.interface';
import {NewsService} from './news.service';

@Component({
  selector: 'sidebar',
  template:`
    <h2>News</h2>
    <ul class="news">
      <li *ngFor="#news of news">
        <span class="badge">{{news.id}}</span> {{news.title}}
      </li>
    </ul>
  `,
  providers: [NewsService]
})
export class AppComponent implements OnInit {
  news: News[];
  News: News;
  constructor(private _newsService: NewsService) { }
  getNews() {
    this._newsService.getNews().then(news => this.news = news);
  }
  ngOnInit() {
    this.getNews();
  }
}