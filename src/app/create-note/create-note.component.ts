import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc  } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../data.service';

export interface DialogData {
  note: string;
  title: string;
}

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  titleEmpty: boolean = true;
  item$: Observable<any>;


  constructor(public dialog: MatDialog,
    public firestore: Firestore,
    public dataservice: DataService) {
    const coll = collection(firestore, 'new-note');
    this.item$ = collectionData(coll);

    this.item$.subscribe((newNote) => {
      console.log('neue Note:', newNote);
    });
  }

  ngOnInit() {
    this.dialogDisabled();
  }

  dialogDisabled() {
    setInterval(() => {
      if(this.dataservice.title ) {
        this.titleEmpty = false;
      } else this.titleEmpty = true;
    }, 200);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      if(!this.dataservice.abort) {
      if(this.dataservice.note) {
        const coll = collection(this.firestore, 'new-note');
      
        setDoc(doc(coll), {note: this.dataservice.note,
        title: this.dataservice.title});
      }
    }
     
      //setDoc(doc(coll), {title: this.dataservice.title});
    });
  }

}
