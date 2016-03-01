import {Injectable, Inject}                         from 'angular2/core';
import {Http, Response, Headers, RequestOptions}    from 'angular2/http';
import {News}                                       from './news.interface';
import {Observable}                                 from 'rxjs/Observable';


@Injectable({
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
  
  addNews(title: string, content: string, tag_id: number) : Observable<News>{
      let body = JSON.stringify({title, content, tag_id});
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      
      return this.http.post('api/news', body, options)
                      .map(res => <News> res.json())
                      .catch(this.handleError);
  }
  
  deleteNews(id: number){
      return this.http.delete('api/news/' + id)
                      .catch(this.handleError);
  }
  
  updateNews(id: number, title: string, content: string, tag_id: number){
      let body = JSON.stringify({title, content, tag_id, id});
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      
      return this.http.put('api/news/' + id, body, options)
                      .catch(this.handleError);
  }
  
  getTags(){
      return this.http.get('api/tags')
                      .map(res => res.json())
                      .catch(this.handleError);
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    //return Observable.throw(error || 'Server error');
  }
}