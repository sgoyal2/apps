import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule,MatCardModule,MatToolbarModule, MatButtonModule, MatIconModule,MatTabsModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,MatFormFieldModule,MatTabsModule
  ],
  declarations: []
})
export class MaterialModule { }
