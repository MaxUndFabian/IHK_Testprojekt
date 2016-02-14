import {Component} from 'angular2/core';
import {LoginService} from './login.service';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: '[loginMeinolf]',
  // Location of the template for this component
  templateUrl: 'client/html/login.html',
  providers: [LoginService]
})
export class LoginComponent {
    linkText: string;
    input_username: string;
    input_password: string;
    username: string;
    loggedIn: boolean;
    
    constructor(private _loginService: LoginService){
        this.linkText = 'Login';
        this.updateLoginStatus();
    }
    
    linkClicked(){
        if(this.loggedIn){
            this.logout();
        }
        else{
            $('#loginModal').modal('show');
        }
    }
    
    login(){
        this._loginService.login(this.input_username, this.input_password)
                          .subscribe((res) => {
                               //console.log(res);
                               this.username = res.username;
                               this.linkText = 'Logout';
                               this.input_username = '';
                               this.input_password = '';
                               this.loggedIn = true;
                               //console.log('so far we come!');
                               $('#loginModal').modal('hide');
                          });
    }
    
    logout(){
        this._loginService.logout().subscribe();
        this.linkText = 'Login';
        this.username = null;
        this.loggedIn = false;
    }
    
    updateLoginStatus(){
        this._loginService.isLoggedIn().subscribe((res)=> {
           if(res){
               this.loggedIn = true;
               this.linkText = "Logout";
               this._loginService.login("","").subscribe((res)=>{
                   this.username = res.username;
               })
           }
           else{
               this.loggedIn = false;
               this.linkText = 'Login';
           }
        });
    }
}