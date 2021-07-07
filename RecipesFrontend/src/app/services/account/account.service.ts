import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeApi } from '../../constants/RecipeApi';
import { RegistrationDto } from '../../dto/registration/registration-dto';
import { AuthenticationDto } from '../../dto/authentication/authentication-dto';
import { UserDataDto } from '../../dto/user-data/user-data-dto';
import { UserDto } from '../../dto/user/user-dto';
import { PasswordDto } from '../../dto/password/password-dto';
import { UserStatisticsDto } from '../../dto/user-statistics/user-statistics-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly accountUrl = RecipeApi.baseUrl + '/api/account';

  constructor(private httpClient: HttpClient) { }

  public async registration(registrationDto: RegistrationDto): Promise<boolean> {
    const url = `${this.accountUrl}/registration`;

    return await this.httpClient.post<boolean>(url, registrationDto).toPromise();
  }

  public async authentication(authenticationDto: AuthenticationDto): Promise<boolean> {
    const url = `${this.accountUrl}/authentication`;

    return await this.httpClient.post<boolean>(url, authenticationDto).toPromise();
  }

  public async logout(): Promise<void> {
    const url = `${this.accountUrl}/logout`;

    const response = await this.httpClient.post(url, {}).toPromise();
  }

  public async getCurrentUser(): Promise<UserDataDto> {
    const url = `${this.accountUrl}/get-current-user`;

    const user = await this.httpClient.get<UserDataDto>(url).toPromise();
    return user ?? null;
  }

  public async getCurrentUserData(): Promise<UserDataDto> {
    const url = `${this.accountUrl}/get-current-user-data`;

    const user = await this.httpClient.get<UserDataDto>(url).toPromise();
    return user ?? null;
  }

  public async getStatistics(): Promise<UserStatisticsDto> {
    const url = `${this.accountUrl}/get-statistics`;

    return await this.httpClient.get<UserStatisticsDto>(url).toPromise();
  }

  public async onChangeUserData(userDto: UserDto): Promise<boolean> {
    const url = `${this.accountUrl}/change-user-data`;

    return await this.httpClient.post<boolean>(url, userDto).toPromise();
  }

  public async onChangePassword(passwordDto: PasswordDto): Promise<boolean> {
    const url = `${this.accountUrl}/change-user-password`;

    return await this.httpClient.post<boolean>(url, passwordDto).toPromise();
  }
}
