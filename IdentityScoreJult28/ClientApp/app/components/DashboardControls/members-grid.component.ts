import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Imember } from '../../interfaces/member.interface';
import { Sorter } from '../../services/sorter.service';
import { TrackByService } from '../../services/trackby.service';

@Component({
    selector: 'members-grid',
    templateUrl: './members-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersGridComponent implements OnInit {

    @Input() filteredList: Imember[] = [];

    constructor(private sorter: Sorter, public trackby: TrackByService) { }

    ngOnInit() {

    }

    sort(prop: string) {
        this.sorter.sort(this.filteredList, prop);
    }

}
