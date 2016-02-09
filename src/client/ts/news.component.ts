import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {News} from './news-interface';
import {NewsService} from './news.service';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'news-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/news.html',
  providers: [NewsService]
})
export class NewsComponent {
  news: News[];
  errorMessage : string;
  constructor(private _router: Router, private _newsService: NewsService){}
    
  gotoArticle(id: number){
      let link = ['NewsArticle', {id: id}];
      this._router.navigate(link);
  }
  
  getNews() {
    this._newsService.getNews().subscribe(
                     news => this.news = news,
                     error =>  this.errorMessage = <any>error);
  }
  ngOnInit() {
    this.getNews();
  }
}