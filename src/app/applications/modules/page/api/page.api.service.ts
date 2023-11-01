import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class PageApiService {
  baseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  async getPages(): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/pages`).toPromise();
  }

  async getPageById(pageId: number): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/pages/${pageId}`).toPromise();
  }

  async createPage(pageDto: any): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/pages`, pageDto).toPromise();
  }

  async deletePage(pageId: number): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/pages/${pageId}`).toPromise();
  }

  async setDefaultPage(pageId: number) {
    return this.httpClient.patch(`${this.baseUrl}/user/${pageId}`, {}).toPromise();
  }

  async updatePage(pageId: number, pageDto: any) {
    return this.httpClient.patch(`${this.baseUrl}/pages/${pageId}`, pageDto).toPromise();
  }
}
