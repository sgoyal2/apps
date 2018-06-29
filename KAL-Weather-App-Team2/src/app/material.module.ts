import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule,MatCardModule,MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,MatFormFieldModule
  ],
  declarations: []
})
export class MaterialModule { }
