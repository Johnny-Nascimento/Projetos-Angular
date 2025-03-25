import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ConsultaCepService {

  urlAPI = 'https://viacep.com.br/ws/'

  constructor(private httpClient: HttpClient) { 

  }

  getConsultaCep(cep: string) {
    return this.httpClient.get(`${this.urlAPI}${cep}/json`)
  }
}
