import { NgModule } from '@angular/core';
import { MiscRoutingModule } from './misc-routing.module';
import { GuestLostComponent } from './guest-lost/guest-lost.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [GuestLostComponent],
    imports: [
        SharedModule,
        MiscRoutingModule,
    ]
})
export class MiscModule { }
