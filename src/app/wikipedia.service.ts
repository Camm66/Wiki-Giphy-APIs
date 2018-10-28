import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/Rx';
import { LoginService } from './login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class WikipediaService {
  static URL = "https://en.wikipedia.org/w/api.php"
//  searchHistory: any;
  searchHistoryRef: any;

  constructor(private http: Http,
              private loginService: LoginService,
              private db: AngularFireDatabase) {
//    this.searchHistory = [];
    //this.searchHistoryRef= new BehaviorSubject([]);
    this.searchHistoryRef = this.db.list(`/searchHistory`);
  }

  search(searchText): Observable<any[]> {
    var parsedText = searchText.replace(/\b\s+\b/g, '%20')
                               .replace(/\b\s+/g, '')
                               .replace(/\s+\b/g, '');
    var queryURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${parsedText}&utf8=&format=json`;
    this.updateHistory(searchText);
    return this.http.request(queryURL).map((res: any) => res.json());
  }

  updateHistory(searchText) {
    var d = new Date();
    var dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

    this.searchHistoryRef.push({ Userid: this.loginService.userUid, searchText: searchText, timestamp: dformat});
    //this.searchHistoryRef.next(this.searchHistory);
  }

  getSearchHistory(){
    return this.searchHistoryRef.valueChanges();
    //return this.searchHistoryRef.asObservable();
  }
}
