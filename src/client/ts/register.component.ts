import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from 'angular2/common';
import {Http, Response, Headers, RequestOptions}    from 'angular2/http';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'register-meinolf',
  // Location of the template for this component
  templateUrl: 'client/html/register.html',
  directives: [FORM_DIRECTIVES]
})
export class RegisterComponent {
    registerForm: ControlGroup;
    
    username: Control;
    firstname: Control;
    lastname: Control;
    password: Control;
    pw_confirm: Control;
    hinderLoop: boolean;
        
    constructor(private builder: FormBuilder, private http: Http){
        this.username = new Control("", Validators.compose([Validators.required]));
        this.firstname = new Control("", Validators.compose([Validators.required]));
        this.lastname = new Control("", Validators.compose([Validators.required]));
        this.password = new Control("", Validators.compose([Validators.required, 
                                                          (c: Control) => {
                                                            if(this.pw_confirm != undefined){
                                                                this.input_password = c.value;
                                                                if(!this.hinderLoop){
                                                                    this.hinderLoop = true;
                                                                    this.pw_confirm._runValidator();
                                                                }
                                                            }
                                                            if(c.value != this.input_pw_confirm){
                                                                this.hinderLoop = false;
                                                                return {"passwordNotConfirmed": true };
                                                            }
                                                            this.hinderLoop = false;
                                                            console.log("equal 1");
                                                            return null;
                                                        }]));
        this.pw_confirm = new Control("", Validators.compose([Validators.required, 
                                                          (c: Control) => {
                                                            this.input_pw_confirm = c.value;
                                                            if(!this.hinderLoop){
                                                                this.hinderLoop = true;
                                                                this.password._runValidator();
                                                            }
                                                            if(this.input_password != c.value){
                                                                this.hinderLoop = false;
                                                                return {"passwordNotConfirmed": true };
                                                            }
                                                            this.hinderLoop = false;
                                                            console.log("equal 2");
                                                            return null;
                                                        }]));
        
        this.registerForm = builder.group({
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
            pw_confirm: this.pw_confirm
        })
    }
    
    
    
    
    
    registerUser(){
        
        console.log('register');
        var username = this.input_username;
        var password = this.input_password;
        var firstname = this.input_firstname;
        var lastname = this.input_lastname;
        var email = "test@maxisanidiot.com";
        
        
        let body = JSON.stringify({username, password, firstname, lastname, email});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
      
        this.http.post('api/register', body, options)
                        .map(res => <News> res.json())
                        .catch(this.handleError)
                        .subscribe((res) => {
                            
                        });
        this.input_firstname = '';
        this.input_lastname = '';
        this.input_password = '';
        this.input_pw_confirm = '';
        this.input_username = '';
    }
    
    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}