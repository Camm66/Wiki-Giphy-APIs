import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../wikipedia.service';
import { GiphyService } from '../giphy.service';
import { LoginService } from '../login/login.service';

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
              private loginService: LoginService) { }

  search(){
    this.wikipediaService.search(this.searchText)
      .subscribe((res: any) => this.renderWikiResults(res));
    this.giphyService.search(this.searchText)
      .subscribe((res: any) => this.renderGiphyResults(res));
  }

  renderWikiResults(res){
    this.wikiResults = res['query']['search'];
  }

  renderGiphyResults(res){
    console.log(res);
    this.giphyResults = res['data'][0]['images']['fixed_height_downsampled']['url'];
    console.log(res['data'][0]);
  }

  renderWikiHTML(html, id){
    document.getElementById(id).innerHTML = html;
  }

  ngOnInit() {
  }

}
