import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordRoutingModule } from './password-routing.module';
import {AskForPasswordComponent} from "./ask-for-password/ask-for-password.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [AskForPasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    TranslateModule,
    FormsModule,
    SharedModule
  ]
})
export class PasswordModule { }
