import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private rest_api_server = "http://127.0.0.1:5000/"
	constructor(private httpClient: HttpClient) {

	}
	public getProjectsRequest(){
		return this.httpClient.get(
			this.rest_api_server + "getprojects"
		)
	}
}
