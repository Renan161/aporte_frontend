
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment';
import { LoginResponseDTO } from '../interfaces/login-response-dto';




@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) {
    }

    private readonly baseUrl = enviroment["endPoint"];
    login(Email: string, Password: string) {
      return this.httpClient.post<LoginResponseDTO>(`${this.baseUrl}/auth/login`, { login: Email, password: Password });
  }


}
