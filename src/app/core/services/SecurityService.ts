import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SecurityService {

  removeSecurtityPassword() {
    sessionStorage.removeItem("CheckPassword");
  }

  setSecurityPassword() {
    sessionStorage.setItem("CheckPassword", "YES");
  }

  getSecurityPassword(): string {
    return sessionStorage.getItem("CheckPassword");
  }

}
