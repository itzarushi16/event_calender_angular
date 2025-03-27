import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from '../event-list/event-list.component';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'app-month-view',
    standalone: true,
    imports: [CommonModule, EventListComponent],
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent implements OnInit {
    @Input() date!: Date;
    days: Date[] = [];
    events: { [key: string]: string[] } = {};
    selectedDate: Date | null = null;

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.days = this.getDaysInMonth();
        this.loadEvents();
    }

    ngOnChanges() {
        this.days = this.getDaysInMonth();
        this.loadEvents();
    }
    selectDate(day: Date) {
        this.selectedDate = day;
    }
    getDaysInMonth(): Date[] {
        const days = [];
        const year = this.date.getFullYear();
        const month = this.date.getMonth();
        const numDays = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= numDays; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }

    loadEvents() {
        this.days.forEach((day) => {
            const dateString = day.toISOString().split('T')[0];
            this.events[dateString] = this.eventService.getEvents(dateString);
        });
    }

    addEvent(day: Date) {
        const event = prompt('Enter event:');
        if (event) {
            const dateString = day.toISOString().split('T')[0];
            this.eventService.addEvent(dateString, event);
            this.loadEvents();
        }
    }

    removeEvent(day: Date, event: string) {
        const dateString = day.toISOString().split('T')[0];
        this.eventService.removeEvent(dateString, event);
        this.loadEvents();
    }
    checkEvent(day: Date) {
        const dateString = day.toISOString().split('T')[0];
        const arr = this.eventService.getEvents(dateString);
        return arr.length;
    }
}
