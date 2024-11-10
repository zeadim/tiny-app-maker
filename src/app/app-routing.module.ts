import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { AppPageComponent } from './pages/app-page/app-page.component';

const routes: Routes = [
    {
        path: 'tiny-app-maker/x',
        component: AppPageComponent,
    },
    {
        path: 'x',
        component: AppPageComponent,
    },
    {
        path: '**',
        component: EditPageComponent,
    },
    /*{
        path: '**',
        redirectTo: '',
    }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
