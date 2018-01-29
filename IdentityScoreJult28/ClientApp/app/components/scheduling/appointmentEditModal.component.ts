
import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChild,ComponentFactoryResolver,ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApptModel } from '../../models/apptmodel';
import { EventModel } from '../../models/event.model';
import { DateTimePickerComponent } from '../../demo-utils/date-time-picker.component';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { EventService } from "../../services/eventservice";
import { CalendarEventExtension, CalendarEventTimesChangedEventExtn } from '../../interfaces/calendarEventExtn.interface';
import { colors } from '../../demo-utils/colors';


@Component({
    selector: 'appointment-modal',
    templateUrl: './AppointmentEditModal.component.html',
    styleUrls: ['./AppointmentEditModal.component.css'],
    
    changeDetection: ChangeDetectionStrategy.Default
})
export class appointmentEditModal implements OnInit {
  
   
    @ViewChild('apptchildModal') public apptchildModal: ModalDirective;
    @Input() title?: string;

  //  public model: ApptModel = new ApptModel("test", addHours(startOfDay(new Date()), 2), addHours(endOfDay(new Date()), 2), new Date(),"boston",1,2,true,"description");
    public model: CalendarEventExtension = {
        eventId: 0,
        title: 'Event 1',
        color: colors.red,
        start: new Date(),
        draggable: true,
        startTime: '2:00:00',
        endTime: '14:00:00',
        location: 'loc 01',
        sid: 14,
        description: 'description of this'
    };

    constructor(private route: ActivatedRoute, private alertService: AlertService, private _EventService: EventService)
    {    }

    ngOnInit() {

    }
   EidtEvent(row: ApptModel) {
        console.log("inside show url  data", row);
        Object.assign(this.model, row);
        console.log("inside show model2 data", this.model);
        this.apptchildModal.show();
    }
   //DleteEvent(row: Event)
   //{
   //    console.log("inside DELETE Event", row);
   //    Object.assign(this.model, row);
   //    console.log("inside delete event ", this.model);
   //    this._EventService.deleteEvent(row.eventId);
   //}
   ShowAdd()
   {
       this.apptchildModal.show();
   }

    hide() {
        this.apptchildModal.hide();
    }
    save()
    {
        this.model.start = new Date();
        this.model.draggable = true;
        this.model.color = colors.red;
       this._EventService.postEvent(this.model)
            .subscribe(
            response => console.log('successfully posted data'),
            error => console.log(error),
        )
        this.apptchildModal.hide();
    }

   

  
  }

