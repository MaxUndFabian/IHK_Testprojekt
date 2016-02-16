import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {News} from './news.interface';
import {NewsService} from './news.service';
import {LoginService} from './login.service';
import { DateSortPipe } from './date_sort.pipe';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'news-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/news.html',
  providers: [NewsService, LoginService],
  pipes: [DateSortPipe]
})
export class NewsComponent {
  news: Array<News>[];
  tags: Array<any>[];
  errorMessage : string;
  input_title: string;
  input_content: string;
  input_tag_id: number;
  loggedIn: boolean;
  
  constructor(private _router: Router, private _newsService: NewsService, private _loginService: LoginService){
      this.input_title = '';
      this.input_content = '';
      this.loggedIn = _loginService.loggedIn();
  }
    
  gotoArticle(id: number){
      let link = ['NewsArticle', {id: id}];
      this._router.navigate(link);
  }
  
  getNews() {
    this._newsService.getNews().subscribe((news, error) => {
                                    this.news = news;
                                    this.news.forEach(element => {
                                        element.creationDate = new Date(element.creationDate);
                                        element.lastModifiedDate = new Date(element.lastModifiedDate);
                                        element.content = this.contentPreview(element.content);
                                    });
                                    this.errorMessage = <any>error;
                                });
  }
  
  contentPreview(content: string){
      content = content.substring(0, 330);
      if(content.lastIndexOf(' ') != -1 && content.length == 330){
        content = content.substring(0, content.lastIndexOf(' '));
        if(!(content.length < 300)){
          content += '....';
        }
      }
      return content;
  }
  
  openCreateNews(){
      $('#newsModal').modal('show');
      this._newsService.getTags().subscribe((tags, error)=>{
                                    this.tags = tags;
                                    console.log(this.tags);
                                    this.errorMessage = <any>error;
                                 }
                        );
  }
  
  createNews(){
      if(this.input_title != '' && this.input_content != ''){
          this._newsService.addNews(this.input_title, this.input_content, this.input_tag_id).subscribe((res) => {
              this.news.push(res);
              $('#newsModal').modal('hide');
              this.input_title = '';
              this.input_content = '';
          });
      }
      
  }
  
  ngOnInit() {
    this.getNews();
  }
}