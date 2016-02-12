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
    
    constructor(private _loginService: LoginService){
        this.linkText = 'Login';
    }
    
    login(){
        console.log(this.input_username + ' ' + this.input_password);
        this._loginService.login(this.input_username, this.input_password)
                          .subscribe(function(res){
                               this.username = res;
                               this.linkText = 'Logout';
                               this.input_username = '';
                               console.log('so far we come!');
                          });
    }
}