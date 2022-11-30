import { DialogComponent } from './../dialog/dialog.component';
import { Detail } from './../../../shared/types/models/detail';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'lib-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
 [x: string]: {};
 @Input()
 item!: Detail;

 constructor(public dialog: MatDialog) { }
 
 openDialog(): void {
  this.dialog.open(DialogComponent, {
   width: '650px'
  })
 }
}
