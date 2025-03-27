import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private storageKey = 'events';

    private events: { [key: string]: string[] } = {};

    constructor() {
        this.loadEvents();
    }

    private saveEvents() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.storageKey, JSON.stringify(this.events));
        }
    }

    private loadEvents() {
        if (typeof localStorage !== 'undefined') {
            const storedEvents = localStorage.getItem(this.storageKey);
            if (storedEvents) {
                this.events = JSON.parse(storedEvents);
            }
        }
    }

    addEvent(date: string, event: string) {
        if (!this.events[date]) {
            this.events[date] = [];
        }
        this.events[date].push(event);
        this.saveEvents();
    }

    getEvents(date: string): string[] {
        return this.events[date] || [];
    }

    removeEvent(date: string, event: string) {
        if (this.events[date]) {
            this.events[date] = this.events[date].filter((e) => e !== event);
            if (this.events[date].length === 0) {
                delete this.events[date];
            }
            this.saveEvents();
        }
    }
}
