import { Component } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';


@Component({
    selector: 'app-internet-connection-alert',
    templateUrl: './internet-connection-alert.component.html',
    styleUrls: ['./internet-connection-alert.component.scss']
})
export class InternetConnectionAlertComponent  {

    online: Observable<boolean>;

     constructor() {
         // TODO: not working for all cases. One possible solution: ping 2 (or more) know public url
        this.online = merge(
          of(navigator.onLine),
          fromEvent(window, 'online').pipe(mapTo(true)),
          fromEvent(window, 'offline').pipe(mapTo(false))
        ).pipe(
            tap(
                (result) => (console.log('Network connection: ' + result))
            )
        );
      }
}
