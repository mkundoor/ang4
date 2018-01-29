﻿import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filter-textbox',
    template: `
    <form>
        <i class="fa fa-filter fa-lg" aria-hidden="true"></i> Filter(by Name):
         <input type="text" name="filter"
                [(ngModel)]="model.filter" 
                (keyup)="filterChanged($event)"  />
    </form>
  `
})
export class FilterTextboxComponent {


    model: { filter: string } = { filter: null };

    @Output()
    changed: EventEmitter<string> = new EventEmitter<string>();

    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //Raise changed event
    }
}
