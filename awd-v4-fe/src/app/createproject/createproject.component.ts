import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-createproject',
	templateUrl: './createproject.component.html',
	styleUrls: ['./createproject.component.sass']
})
export class CreateprojectComponent implements OnInit {


	public azkabanProjectName: string = ""
	public revoClientName: string = ""
	public revoProjectName: string = ""
	public azkabanDBUrl: string = ""
	public azkabanDBUsername: string = ""
	public azkabanDBPassword: string = ""

	constructor(private router: Router) { }



	ngOnInit(): void {
	}

	goToHome() {
		this.router.navigateByUrl("/")
	}

}
