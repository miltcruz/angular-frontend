import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { APIResponse } from "../models/api.object";
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiService {
private base = 'https://api.restful-api.dev/objects';
readonly loading = signal(false);
readonly error = signal<string | null>(null);

constructor(private http: HttpClient) {}
    
    getObjects() {
        this.loading.set(true);
        this.error.set(null);
        return this.http.get<APIResponse[]>(this.base).pipe(
            finalize(() => this.loading.set(false)),
            catchError((err) => {
                this.error.set('Could not load objects. Please try again.');
                return throwError(() => err);
            })
        );
    }
    
    getObjectById(id: string) {
        this.loading.set(true);
        this.error.set(null);
        return this.http.get<APIResponse>(`${this.base}/${id}`).pipe(
            finalize(() => this.loading.set(false)),
            catchError((err) => {
                this.error.set('Could not load the object. Please try again.');
                return throwError(() => err);
            })
        );
    }
    
    deleteObject(id: string) {
        this.loading.set(true);
        this.error.set(null);
        return this.http.delete<APIResponse>(`${this.base}/${id}`).pipe(
            finalize(() => this.loading.set(false)),
            catchError((err) => {
                this.error.set('Could not delete the object. Please try again.');
                return throwError(() => err);
            })
        );
    }

    clearError() {
        this.error.set(null);
    }
}
