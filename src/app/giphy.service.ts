import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { giphyAPIKey } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  constructor(private http: Http) { }

  search(searchText): Observable<any[]> {
    var parsedText = searchText.replace(/\b\s+\b/g, '%20')
                               .replace(/\b\s+/g, '')
                               .replace(/\s+\b/g, '');
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${parsedText}&limit=5`;
    return this.http.request(queryURL).map((res: any) => res.json());
  }

}
