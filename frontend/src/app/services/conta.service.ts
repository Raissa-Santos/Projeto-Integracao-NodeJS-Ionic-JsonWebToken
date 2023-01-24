import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

const urlBase = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authentication.getToken(),
      }),
    };
    return httpOptions;
  }


  getAll(): Promise<any> {
    return this.http
    .get(`${urlBase}/contas`, this.getHttpOptions())
    .toPromise();
  }

  create(conta: any){
    return this.http
    .post(`${urlBase}/contas`,conta, this.getHttpOptions())
    .toPromise();
  }

  remove(id: number){
    return this.http
    .delete(`${urlBase}/contas/${id}`, this.getHttpOptions())
    .toPromise();
  }
}
