import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { statusViewModel } from '../viewModels/statusViewModel';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class StatusService {


    uri: string;
    constructor(private http: HttpClient, private location: Location, @Inject(DOCUMENT) private document) {
        this.uri = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + '/status';
    }

    add(status: statusViewModel) {
        return this.http.post(`${this.uri}/add`, status);
    }

    getAll() {
        return this.http.get(`${this.uri}/`);
    }

    edit(id) {
        return this.http.get(`${this.uri}/edit/${id}`);
    }

    update(status: statusViewModel, ) {
        return this.http.post(`${this.uri}/update/${status._id}`, status);
    }


    delete(id) {
        const obj = {

        };
        return this.http.post(`${this.uri}/delete/${id}`, obj);
    }

}
