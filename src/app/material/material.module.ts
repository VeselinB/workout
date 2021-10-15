import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio'; 









const MODULES = [
  MatSortModule,
  MatRadioModule,
  MatSortModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatProgressBarModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatTabsModule,
  MatMenuModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatInputModule,
  DragDropModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [],

  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],

})
export class MaterialModule { }