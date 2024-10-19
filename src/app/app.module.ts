import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { FancyButtonComponent } from './components/fancy-button/fancy-button.component';

@NgModule({
    declarations: [
        AppComponent,
        EditPageComponent,
        FancyButtonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
