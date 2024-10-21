import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { FancyButtonComponent } from './components/fancy-button/fancy-button.component';
import { ModalComponent } from './components/modal/modal.component';
import { EditComponentOverlayComponent } from './components/edit-component-overlay/edit-component-overlay.component';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
    declarations: [
        AppComponent,
        EditPageComponent,
        FancyButtonComponent,
        ModalComponent,
        EditComponentOverlayComponent,
        OverlayComponent
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
