// src/app/app.component.ts
import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CalendarComponent],
    template: '<app-calendar></app-calendar>',
    styleUrls: ['./app.component.css'],
})
export class AppComponent { }
