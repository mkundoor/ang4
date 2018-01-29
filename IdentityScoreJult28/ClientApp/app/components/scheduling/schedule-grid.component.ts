import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Imember } from '../../interfaces/member.interface';
import { Sorter } from '../../services/sorter.service';
import { TrackByService } from '../../services/trackby.service';
import { iEventsViewModel } from '../../interfaces/ieventsviewmodel.interface';

@Component({
    selector: 'schedule-grid',
    templateUrl: './schedule-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGridComponent implements OnInit {

    @Input() filteredList: iEventsViewModel[] = [];

    constructor(private sorter: Sorter, public trackby: TrackByService) { }

    ngOnInit() {

    }

    sort(prop: string) {
        this.sorter.sort(this.filteredList, prop);
    }

}
