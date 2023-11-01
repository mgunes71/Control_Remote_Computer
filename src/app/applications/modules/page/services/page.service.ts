import { Injectable } from '@angular/core';
import {PageApiService} from "../api/page.api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  $pages = new BehaviorSubject([]);

  constructor(private api: PageApiService) { }

  getApi(): PageApiService {
    return this.api;
  }

  async setPages() {
    const [err, pages] = await this.api.getPages().toArray();
    if (err) {
      this.$pages.next([]);
      return;
    }

    this.$pages.next(pages);
    return pages;
  }
}
