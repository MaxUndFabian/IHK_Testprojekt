import {Injectable, Inject}             from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {News}                           from './news-interface';
import {Observable}                     from 'rxjs/Observable';


@Injectable({
    providers: [HTTP_PROVIDERS]
})
export class NewsService {
  constructor(private http: Http) { }
  getNews() {
    return this.http.get('api/news')
                    .map(res => <News[]> res.json())
                    .catch(this.handleError);
  }
  
  getSingleNews(id: number){
      return this.http.get('api/news/' + id)
                    .map(res => <News> res.json())
                    //.do(data => console.log(data))
                    .catch(this.handleError);
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}