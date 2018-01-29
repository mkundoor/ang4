// ======================================

// ======================================

import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';

@Component({
    selector: 'userdash',
    templateUrl: './userdash.component.html',
    styleUrls: ['./userdash.component.css'],
    animations: [fadeInOut]
})
export class UserDashComponent {
}
