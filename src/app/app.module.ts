import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutsComponent } from './workouts/workouts.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './workouts/workout.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      
     workout: reducer,
    
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: true, // not set environment , because in this case it doesnt need it 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
