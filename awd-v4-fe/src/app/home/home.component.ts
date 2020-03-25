import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

	constructor(private apiSerice: ApiService) {

	}

	project_names: any = [];

	ngOnInit() {

		this.apiSerice.getProjectsRequest().subscribe((data: any[]) => {
			this.project_names = Object.keys(data["message"]["projects"])
			console.log(this.project_names)
		})
	}

}
