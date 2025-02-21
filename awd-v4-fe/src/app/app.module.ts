import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GojsAngularModule } from 'gojs-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateprojectComponent } from './createproject/createproject.component';
import { DesignerComponent } from './designer/designer.component';


const appRoutes: Routes = [
	{
		path: 'createproject',
		component: CreateprojectComponent
	},
	{
		path: 'designer',
		component: DesignerComponent
	},
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CreateprojectComponent,
		DesignerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		GojsAngularModule,
		RouterModule.forRoot(appRoutes, {
			enableTracing: true
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
