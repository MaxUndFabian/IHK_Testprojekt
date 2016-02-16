import {Component} from 'angular2/core';
import {News} from './news.interface';
import {NewsService} from './news.service';
import { DateSortPipe } from './date_sort.pipe';
import {Router} from 'angular2/router';

@Component({
  selector: 'sidebar',
  templateUrl: 'client/html/sidebar.html',
  providers: [NewsService],
  pipes: [DateSortPipe]
})
export class SidebarComponent {
  news: News[];
  News: News;
  constructor(private _router: Router, private _newsService: NewsService) { }
  getNews() {
    this._newsService.getNews().subscribe((news) => {
        this.news = news.slice(news.length-2,news.length);
        this.news.forEach(elem => {
            elem.creationDate = new Date(elem.creationDate);
            elem.content = this.contentPreview(elem.content);
        });
    });
  }
  ngOnInit() {
    this.getNews();
  }
  gotoArticle(id: number){
      let link = ['NewsArticle', {id: id}];
      this._router.navigate(link);
  }
  contentPreview(content: string){
      content = content.substring(0, 250);
      if(content.lastIndexOf(' ') != -1 && content.length == 250){
        content = content.substring(0, content.lastIndexOf(' '));
        if(!(content.length < 200)){
          content += '....';
        }
      }
      return content;
  }
}