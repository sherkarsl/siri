import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadsurveyService {


// private jsonFileURL: string = "data/aspnet.json";  
    
      
  
  constructor(private http: Http) { }

          
    
 get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: './assets/data/aspnet.json', name: 'Siri' },
     /* { id: './assets/data/csharp.json', name: 'C Sharp' },
      { id: './assets/data/designPatterns.json', name: 'Design Patterns' }
      */
    ];
  }
}
