import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'news-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/news.html'
})
export class NewsComponent {
    
  constructor(private _router: Router){}
    
  gotoArticle(id: number){
      let link = ['NewsArticle', {id: id}];
      this._router.navigate(link);
  }
}