import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../wikipedia.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wikiSearch: string;
  results: any;
  constructor(private wikipediaService: WikipediaService) { }

  search(){
    this.wikipediaService.search(this.wikiSearch)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res){
    this.results = res['query']['search'];
    console.log(res['query']['search']);
  }

  renderWikiHTML(html, id){
    document.getElementById(id).innerHTML = html;
  }

  ngOnInit() {
  }

}
