import { Component } from '@angular/core';
import { collectionData, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
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
  editMode:boolean = true;
  item$: Observable<any>;

  constructor(public firestore: Firestore,
    public dialog: MatDialog,
    public dataservice: DataService) {
    const coll = collection(firestore, 'new-note');
    this.item$ = collectionData(coll);
  }

  editNote(newNote): void {
    this.dataservice.note = newNote.note;
    this.dataservice.title = newNote.title;
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async() => {
      if(!this.dataservice.abort) {
      if(this.dataservice.note) {
        //const currentNote = collectionData(collection(this.firestore, 'new-note'), { idField: 'id'});
        const notesRef = doc(this.firestore, 'new-note', newNote.docId);
        await updateDoc(notesRef , {
          note: this.dataservice.note
        });
        // updateDoc(doc(this.firestore, `new-note/${docId}`), {note: this.dataservice.note,
        // title: this.dataservice.title});
      }
    }
     
      //setDoc(doc(coll), {title: this.dataservice.title});
    });
  }
}
