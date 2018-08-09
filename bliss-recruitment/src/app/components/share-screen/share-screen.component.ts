import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShareParameters } from '../../shared/models/share-parameters';
import { QuestionsService } from '../../shared/questions.service';
import { NotificationsService } from '../../shared/notifications.service';

export interface ShareScreenOptions {
    title: string;
    link: string;
}

@Component({
    templateUrl: './share-screen.component.html',
    styleUrls: ['./share-screen.component.scss']
})
export class ShareScreenComponent {
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ShareScreenOptions,
        public dialogRef: MatDialogRef<ShareScreenComponent>,
        private formBuilder: FormBuilder,
        private questionsService: QuestionsService,
        private notificationsService: NotificationsService
    ) {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]]
        });
    }

    share() {
        const param: ShareParameters = {
            destination_email: this.form.controls.email.value,
            content_url: window.location.origin + this.data.link
        };
        this.questionsService.shareContent(param)
            .subscribe(
                (result) => {
                    if (result) {
                        this.notificationsService.newSucess('Content shared with success to ' + this.form.controls.email.value);
                        this.dialogRef.close();
                    }
                }
            );
    }
}
