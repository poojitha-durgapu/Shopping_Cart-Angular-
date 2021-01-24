import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { PconvertToSpaces } from './convertToSpaces.pipe';
@NgModule({
  declarations: [
    StarComponent,
    PconvertToSpaces
  ],
  imports: [
    CommonModule
  ],
  exports:[
    StarComponent,
    PconvertToSpaces,
    FormsModule,
    CommonModule
  ]
})
export class SharedModule { }
