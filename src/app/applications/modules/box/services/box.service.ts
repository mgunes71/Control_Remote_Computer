import { Injectable } from '@angular/core';
import {BoxApiService} from "../api/box-api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  $boxes = new BehaviorSubject([]);
  $boxConfig = new BehaviorSubject([]);

  constructor(private api: BoxApiService) { }

  getApi():BoxApiService {
    return this.api;
  }

  async setBox(pageId: number) {
    const [err, boxes] = await this.api.getAllBox(pageId).toArray();

    if (err) {
      this.$boxes.next([]);
      return
    }

    this.$boxes.next(boxes);
    return boxes;
  }

  async setBoxConfig(boxId: number) {
    const [err, config] = await this.api.getBoxConfig(boxId).toArray();

    if (err) {
      this.$boxConfig.next([]);
      return
    }

    this.$boxConfig.next(config);
    return config;
  }
}
