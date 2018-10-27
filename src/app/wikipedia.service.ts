import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable({
  providedIn: 'root'
})

export class WikipediaService {
  static URL = "https://en.wikipedia.org/w/api.php"
  searchHistory: any;
  searchHistoryRef: any;

  constructor(private http: Http) {
    this.searchHistory = [];
    this.searchHistoryRef= new BehaviorSubject([]);
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

    this.searchHistory.push({ Userid: 'sasasasa', searchText: searchText, timestamp: dformat});
    this.searchHistoryRef.next(this.searchHistory);
  }

  getSearchHistory(): Observable<any[]>{
    return this.searchHistoryRef.asObservable();
  }
}
