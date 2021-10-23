import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutsComponent } from './Workouts/Workouts.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './Workouts/Workout.reducer';
import { EffectsModule } from '@ngrx/effects';

import {WorkoutEffects} from '../app/Workouts/Workout.effects'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'bg',
        loader: {

          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }
    ),
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([WorkoutEffects]),
    StoreModule.forRoot({
      
     Workout: reducer,
    
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
