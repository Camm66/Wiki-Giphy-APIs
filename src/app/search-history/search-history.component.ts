import { Component, OnInit, OnDestroy } from '@angular/core';
import { HistoryService } from '../history.service'
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searches: any;
  historySubscription: Subscription;
  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.historySubscription = this.historyService.getSearchHistory()
    .subscribe((history: any) => { this.searches = history; });
  }

  ngOnDestroy(){
    this.historySubscription.unsubscribe();
  }

}
