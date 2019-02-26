import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import { Log } from '../models/logs';

import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class LogService {

  logs: Log[];
  private  logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

private stateSource = new BehaviorSubject<boolean>(true);
stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'Milk', date: new Date('06/07/2018 08:15:23')},
    //   {id: '2', text: 'Eggs', date: new Date('06/08/2018 07:15:23')},
    //   {id: '3', text: 'Chicken', date: new Date('06/09/2018 06:15:23')}
    // ];
    this.logs = [];
  }
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }

  clearState() {
    this.stateSource.next(true);
  }
}
