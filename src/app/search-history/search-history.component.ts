import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../wikipedia.service'
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searches: any;
  historySubscription: Subscription;
  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
    this.historySubscription = this.wikipediaService.getSearchHistory()
    .subscribe((history: any) => { this.searches = history; });
  }

  getHistory(){
    console.log(this.searches);
  }

}
