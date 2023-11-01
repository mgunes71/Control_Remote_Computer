import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class BoxApiService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  async createBox(pageId: number, boxDto: any):Promise<any> {
    return this.http.post(`${this.baseUrl}/box/${pageId}`, boxDto).toPromise();
  }

  async updateBox(pageId: number, boxId: number, boxDto: any): Promise<any> {
    return this.http.patch(`${this.baseUrl}/box/${pageId}/${boxId}`, boxDto).toPromise();
  }

  async getAllBox(pageId: number):Promise<any> {
    return this.http.get(`${this.baseUrl}/box/${pageId}`).toPromise();
  }

  async getBoxDetail(pageId: number, boxId: number):Promise<any> {
    return this.http.get(`${this.baseUrl}/box/${pageId}/${boxId}`).toPromise();
  }

  async runAction(boxId: number):Promise<any> {
    return this.http.get(`${this.baseUrl}/action/run/${boxId}`).toPromise();
  }

  async createBoxConfig(configDto: any, actionId: number, boxId: number): Promise<any> {
    return this.http.post(`${this.baseUrl}/box-config/${actionId}/${boxId}`, configDto).toPromise();
  }

  async getBoxConfig(boxId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/box-config/${boxId}`).toPromise();
  }

  async deleteConfigBox(boxId: number, id: number):Promise<any> {
    return this.http.delete(`${this.baseUrl}/box-config/${boxId}/${id}`).toPromise();
  }

  async deleteBox(pageId: number, boxId: number):Promise<any> {
    return this.http.delete(`${this.baseUrl}/box/${pageId}/${boxId}`).toPromise();
  }

  async updateConfig(boxId: number, id: number, configDto: any): Promise<any> {
    return this.http.patch(`${this.baseUrl}/box-config/${boxId}/${id}`, configDto).toPromise();
  }
}
