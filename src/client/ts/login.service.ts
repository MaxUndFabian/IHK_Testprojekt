import {Injectable, Inject}                         from 'angular2/core';
import {Http, Response, Headers, RequestOptions}    from 'angular2/http';
import {Observable}                                 from 'rxjs/Observable';


@Injectable({
})
export class LoginService {
  
  constructor(private http: Http) { }
  
  login(username: string, password: string) {
    let body = JSON.stringify({username, password});
    //console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
      
    return this.http.post('api/login', body, options)
                    .map(res => res.json())
                    .do((data) => {
                        if(data.username){
                            console.log('were logged in!');
                            //console.log(data);
                        }
                    })
                    .catch(this.handleError);
  }
  
  /*getUsername(id: number){
      return this.http.get('api/news/' + id)
                    .map(res => <News> res.json())
                    //.do(data => console.log(data))
                    .catch(this.handleError);
  }*/
  
  isLoggedIn(){
      return this.http.post('api/login')
                    .map(res => res.json())
                    .do((data) => {
                        if(data.username){
                            console.log('were logged in!');
                            //console.log(data);
                            return true;
                        }
                        return false;
                    })
                    .catch(this.handleError);
  }
  
  loggedIn(): boolean{
      if(localStorage.loggedIn == "true"){
          return true;
      }
      return false;
  }
  
  logout() {
      return this.http.get('api/logout')
                      .map(res => res.json())
                      .catch(this.handleError);
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}