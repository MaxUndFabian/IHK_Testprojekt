import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {News} from './news.interface';
import {NewsService} from './news.service';
import {LoginService} from './login.service';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'news-article-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/article.html',
  providers: [NewsService, LoginService]
})
export class NewsArticleComponent {
  id: number;
  singleNews: News;
  errorMessage: string;
  input_title: string;
  input_content: string;
  input_tag_id: number;
  tags: Array<any>[];
  loggedIn: boolean;
  
  constructor(params: RouteParams, private _newsService: NewsService, private _router: Router, private _loginService: LoginService){
      this.id = params.get('id');
      this.singleNews = new News(0, "", "", null, null, "", "");
      this.loggedIn = _loginService.loggedIn();
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
  
  openUpdate(){
      $('#newsModal').modal('show');
      this._newsService.getTags().subscribe((tags, error)=>{
                                    this.tags = tags;
                                    this.errorMessage = <any>error;
                                    this.input_title = this.singleNews.title;
                                    this.input_content = this.singleNews.content;
                                    this.tags.forEach(tag => {
                                        if(tag.title == this.singleNews.tag_name){
                                            this.input_tag_id = tag.id;
                                        }
                                    });
                                 });
  }
  
  updateNews(){
      if(this.input_title != '' && this.input_content != ''){
          this._newsService.updateNews(this.singleNews.id, this.input_title, this.input_content, this.input_tag_id).subscribe(() => {
             this.getSingleNews(this.singleNews.id);
             $('#newsModal').modal('hide');
          });
      }
  }
  
  
  showEditLinks(){
      if(this.loggedIn && this._loginService.username() == this.singleNews.username){
          return true;
      }
      return false;
  }
  
  ngOnInit() {
    this.getSingleNews(this.id);
  }
}