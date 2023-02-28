import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public dataservice: DataService
  ) {

  }

  onYesClick() {
    this.dataservice.delete = true;
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
