import { Injectable, Inject } from '@angular/core';
import { Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

//import { Observable, Subject } from 'rxjs/Rx';
//import 'rxjs/add/operator/toPromise';

import { mill } from './mill';
import { MillViewModel } from './MillViewModel';
import { EditMillViewModel } from './EditMillViewModel';
import { Province } from './Province';
import { City } from './City';


// Injcter is the object that is responsible for choosing and injecting the provider where it is required.
// By default, the Angular CLI command ng generate service registers a provider with the root injector for your service by including provider metadata in the @Injectable decorator.
// When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.
// If you need to, you can register providers at different levels: in the HeroesComponent, in the AppComponent, in the AppModule. For instance, you could have told the CLI to provide the service at the module level automatically by appending --module=app.
// More: https://angular.io/tutorial/toh-pt4

@Injectable({
  providedIn: 'root',
})

export class MillService {
  baseUrl: string;
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  private _baseApiUrl: string = 'https://localhost:44388/api/Mill/';
  //private _sample: string = 'http://localhost:44388/api/Mill/CreateMill';

  getProvinces() {
    return this.httpClient.get(this._baseApiUrl + "GetProvinces");
  }

  getMills() {
    return this.httpClient.get(this._baseApiUrl + "GetMills");
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private millDataForUpdate(res: Response) {
    let body = res.json();
    return body;
  }

  //private handleError(error: any) {
  //  // In a real world app, we might use a remote logging infrastructure
  //  // We'd also dig deeper into the error to get a better message
  //  let errMsg = (error.message) ? error.message :
  //    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //  console.error(errMsg); // log to console instead
  //  return Observable.throw(errMsg);
  //}
}
