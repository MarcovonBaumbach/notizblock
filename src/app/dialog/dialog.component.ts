import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';

export interface DialogData {
  note: string;
  title: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dataservice: DataService
  ) {

  }

  onYesClick() {
    this.dataservice.abort = false;
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dataservice.abort = true;
    this.dialogRef.close();
  }
}
