//  src/app/components/event-list/event-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-event-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
    @Input() events!: string[];
    @Output() removeEvent = new EventEmitter<string>();

    onRemoveEvent(event: string) {
        this.removeEvent.emit(event);
    }
}
