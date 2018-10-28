import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
 searchHistoryRef: any;
  constructor(private loginService: LoginService,
              private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`/searchHistory`);

  }
  updateHistory(searchText) {
    var d = new Date();
    var dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

    this.searchHistoryRef.push({ Userid: this.loginService.userUid,
                                 searchText: searchText,
                                 timestamp: dformat});
  }

  getSearchHistory(){
    return this.searchHistoryRef.valueChanges();
  }
}
