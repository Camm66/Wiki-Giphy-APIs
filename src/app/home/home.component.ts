import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../wikipedia.service';
import { GiphyService } from '../giphy.service';
import { LoginService } from '../login/login.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: string;
  wikiResults: any;
  giphyResults: any;
  constructor(private wikipediaService: WikipediaService,
              private giphyService: GiphyService,
              private loginService: LoginService,
              private historyService: HistoryService) { }

  search(){
    this.wikipediaService.search(this.searchText)
      .subscribe((res: any) => this.renderWikiResults(res));
    this.giphyService.search(this.searchText)
      .subscribe((res: any) => this.renderGiphyResults(res));
    this.historyService.updateHistory(this.searchText);
  }

  renderWikiResults(res){
    this.wikiResults = res['query']['search'];
  }

  renderGiphyResults(res){
    this.giphyResults = res['data'][0]['images']['fixed_height_downsampled']['url'];
  }

  renderWikiHTML(html, id){
    document.getElementById(id).innerHTML = html;
  }

  ngOnInit() {
  }

}
