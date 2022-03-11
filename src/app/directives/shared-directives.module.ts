import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToogleBtnDirective} from './toogle-btn.directive';
import {ToogleBtnSwitchDirective} from './toogle-btn-switch.directive';
import { DebounceClickDirective } from './debounce-click.directive';
import {ClickOutsideDirective} from './click-outside.directive';


@NgModule({
  declarations: [ToogleBtnDirective, ToogleBtnSwitchDirective, DebounceClickDirective, ClickOutsideDirective],
  exports: [ToogleBtnDirective, ToogleBtnSwitchDirective, DebounceClickDirective, ClickOutsideDirective],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule {
}
