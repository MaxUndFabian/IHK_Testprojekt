import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

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
  
  constructor(params: RouteParams, private _newsService: NewsService, private _router: Router){
      this.id = params.get('id');
      this.singleNews = new News(0, "", "", null, null, "", "");
  }
  
  getSingleNews(id: number){
      this._newsService.getSingleNews(id).subscribe((news, error) => {
                                            this.singleNews = news;
                                            this.singleNews.creationDate = new Date(this.singleNews.creationDate);
                                            this.errorMessage = <any>error;
                                         })
                     
  }
  
  delete(){
      this._newsService.deleteNews(this.singleNews.id).subscribe(() => {
          let link = ['News'];
          this._router.navigate(link);
      });
  }
  
  ngOnInit() {
    this.getSingleNews(this.id);
  }
}