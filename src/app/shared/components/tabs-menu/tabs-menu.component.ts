import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.scss']
})
export class TabsMenuComponent implements OnInit, OnChanges {

  @Input() tabs: MenuItem[];
  @Output() selected = new EventEmitter<any>();
  selectedTab: MenuItem;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabs && changes.tabs.currentValue) {
      this.selectedTab = this.tabs.find(t => t.selected) || this.tabs[0];
    }
  }

  onClick(tab: MenuItem) {
    this.selectedTab = tab;
    this.selected.emit(tab.value);
  }

}

export class MenuItem {
  title: string;
  value: any;
  selected: boolean;

  constructor(title: string, value: any, selected = false) {
    this.title = title;
    this.value = value;
    this.selected = selected;
  }
}
