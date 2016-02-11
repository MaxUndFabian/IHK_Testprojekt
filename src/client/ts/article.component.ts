import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {News} from './news.interface';
import {NewsService} from './news.service';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'news-article-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/article.html',
  providers: [NewsService]
})
export class NewsArticleComponent {
  id: number;
  singleNews: News;
  errorMessage: string;
  
  constructor(params: RouteParams, private _newsService: NewsService){
      this.id = params.get('id');
      this.singleNews = new News(0, "", "", null, null, "", "");
  }
  
  getSingleNews(id: number){
      this._newsService.getSingleNews(id).subscribe(
                     news => this.singleNews = news,
                     error =>  this.errorMessage = <any>error);
  }
  
  ngOnInit() {
    this.getSingleNews(this.id);
  }
}