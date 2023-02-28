import { Component } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent {
  coll$: Observable<any>;
  bin$: Observable<any>;

  constructor (public firestore: Firestore,
    public dialog: MatDialog,
    public dataservice: DataService) {
    const bin = collection(this.firestore, 'bin');
    this.bin$ = collectionData(bin);
    const coll = collection(this.firestore, 'new-note');
    this.coll$ = collectionData(coll);
  }

  openDialog(newNote) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(async () => {
      if (this.dataservice.delete) {
        await deleteDoc(doc(this.firestore, 'bin', newNote.docId));
      }
    });
  }

  async restoreNote(newNote) {
    await setDoc(doc(this.firestore, 'new-note', newNote.docId), {
      note: newNote.note,
      title: newNote.title,
      docId: newNote.docId
    });
    await deleteDoc(doc(this.firestore, 'bin', newNote.docId));
  }
}
