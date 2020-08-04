import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class AccessProviders {  
    //server:string='http://localhost/tutorial/api/';
    server:string='https://dev.pioneercodes.com/myApp/api/';
    
    constructor(
        public http: HttpClient 

    ) { }

    postData(body, file){
        let headers = new HttpHeaders({
            'Content-type':'application/json; charset=UTF-8'
        });
        let options = {
            headers : headers 
        }

        return this.http.post(this.server + file, JSON.stringify(body),options)
        .timeout(59000) //59sec
        .map(res => res);
    }
}