import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { FancyButtonComponent } from './components/fancy-button/fancy-button.component';
import { EditComponentOverlayComponent } from './components/edit-component-overlay/edit-component-overlay.component';
import { ComponentConfigurationComponent } from './components/component-configuration/component-configuration.component';
import { ConfigurationInputComponent } from './components/configuration-input/configuration-input.component';
import { EventConfigurationComponent } from './components/event-configuration/event-configuration.component';
import { ActionConfigurationComponent } from './components/action-configuration/action-configuration.component';

@NgModule({
    declarations: [
        AppComponent,
        EditPageComponent,
        FancyButtonComponent,
        EditComponentOverlayComponent,
        ComponentConfigurationComponent,
        ConfigurationInputComponent,
        EventConfigurationComponent,
        ActionConfigurationComponent,
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
