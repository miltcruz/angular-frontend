import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { APIResponse } from "../models/api.object";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class ApiService {
private base = 'https://api.restful-api.dev/objects';
readonly loading = signal(false);
readonly error = signal<string | null>(null);

constructor(private http: HttpClient) {}
    
    getObjects(): Observable<APIResponse[]> {
        this.error.set(null);
        this.loading.set(true);
        return this.http.get<APIResponse[]>(this.base);
    }
    
    getObjectById(id: string) {
        this.error.set(null);
        this.loading.set(true);
        return this.http.get<APIResponse>(`${this.base}/${id}`);
    }

    deleteObject(id: string) {
        this.error.set(null);
        this.loading.set(true);
        return this.http.delete(`${this.base}/${id}`);
    }
}
