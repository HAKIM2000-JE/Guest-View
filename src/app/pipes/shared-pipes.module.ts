import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from './safe.pipe';
import {TruncatePipe} from './truncate.pipe';
import { MomentPipe } from './moment.pipe';
import {SafeV2Pipe} from "./safe2.pipe";


@NgModule({
  declarations: [
    SafePipe,
    TruncatePipe,
    MomentPipe,
    SafeV2Pipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafePipe,
    TruncatePipe,
    MomentPipe,
    SafeV2Pipe
  ]
})
export class SharedPipesModule {
}
