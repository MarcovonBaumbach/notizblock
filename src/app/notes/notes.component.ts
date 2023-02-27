import { Component } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  editMode: boolean = true;
  coll$: Observable<any>;
  bin$: Observable<any>;

  constructor(public firestore: Firestore,
    public dialog: MatDialog,
    public dataservice: DataService) {
    const coll = collection(firestore, 'new-note');
    this.coll$ = collectionData(coll);
    const bin = collection(firestore, 'bin');
    this.bin$ = collectionData(bin);
  }

  async deleteNote(newNote) {
    await setDoc(doc(this.firestore, 'bin', newNote.docId), {
      note: newNote.note,
      title: newNote.title,
      docId: newNote.docId
    });
    await deleteDoc(doc(this.firestore, 'new-note', newNote.docId));
    window.alert('Note got moved to bin!');
  }

  editNote(newNote): void {
    this.dataservice.note = newNote.note;
    this.dataservice.title = newNote.title;
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async () => {
      if (!this.dataservice.abort) {
        if (this.dataservice.note) {
          const notesRef = doc(this.firestore, 'new-note', newNote.docId);
          await updateDoc(notesRef, {
            note: this.dataservice.note
          });
        }
      }
    });
  }
}
