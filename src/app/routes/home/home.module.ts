import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {AngularEchartsModule} from 'ngx-echarts';
const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        AngularEchartsModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
