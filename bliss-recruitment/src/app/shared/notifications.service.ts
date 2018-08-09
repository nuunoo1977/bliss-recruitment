import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    defaultDuration = 5000;

    constructor(
        private snackBar: MatSnackBar
    ) { }

    public newSucess(msg: string): MatSnackBarRef<any> {
        return this.new(msg, 'sucess');
    }
    public newInfo(msg: string): MatSnackBarRef<any> {
        return this.new(msg, 'info');
    }
    public newAlert(msg: string): MatSnackBarRef<any> {
        return this.new(msg, 'alert');
    }
    public newError(msg: string): MatSnackBarRef<any> {
        return this.new(msg, 'error');
    }

    public new(msg: string, notificationClass: string): MatSnackBarRef<any> {

        return this.snackBar.open(msg, null, {
            duration: this.defaultDuration,
            panelClass: ['notification-snackbar', notificationClass]
        });

    }
}
