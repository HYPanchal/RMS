//inject is Angular's modern way of getting a dependency.
import { Injectable, inject } from '@angular/core';
/**
 * HttpClient is Angular's HTTP communication tool.
 * It allows Angular to communicate with your Spring Boot backend.
 * 
 * HttpParams is used to construct URL query parameters.
 */
import { HttpClient, HttpParams } from '@angular/common/http';
//Angular's HttpClient returns an Observable.
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

/*
  The @Injectable() decorator is a core marker in Angular that specifies a class can be 
  The class can therefore be injected into other services/components.

  providedIn: 'root'
  It tells Angular to create one application-wide instance of ApiService.
*/
@Injectable({ providedIn: 'root' })
export class ApiService {
    //This obtains Angular's HttpClient object.
    private http = inject(HttpClient);
    //This obtains development environment api request url.
    private baseUrl = environment.apiUrl;

    /** 
     * GET request for getting all the users
     * 
     * get<T> - T is a generic type.
     * 
     * @param endpoint :- base url of the api.
     * 
     * @param params :- Optional
     * 
     * @returns Observable<T> :- Return an observable response type <T>(generic).
     *      Observable represents an asynchronous stream/result.
     * 
     * return type - Observable<T>
     * */
    get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
        //Creating new HttpParams object.
        let httpParams = new HttpParams();

        //Checking if params are exist.
        if (params) {
            //Getting all the params keys.
            Object.keys(params).forEach((key) => {
                //Checking all the keys are not null and undefined.
                if (params[key] !== null && params[key] !== undefined) {
                    //Setting all the keys if the params keys are not null and undefined.
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }

        //Sending HTTP get reques.
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
    }

    /** 
     * GET single record by id 
     * 
     * @param id: string | number :- can handel both the type, also know as union type.
     * */
    getById<T>(endpoint: string, id: string | number): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
    }

    /** 
     * POST request (Create) 
     * 
     * @param body: unknown :- dont know about the type of the body but still treat it safely.
     * 
     * */
    post<T>(endpoint: string, body: unknown): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
    }

    /** PUT request (Full update) */
    put<T>(endpoint: string, id: string | number, body: unknown): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, body);
    }

    /** PATCH request (Partial update) */
    patch<T>(endpoint: string, id: string | number, body: unknown): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${endpoint}/${id}`, body);
    }

    /** DELETE request */
    delete<T>(endpoint: string, id: string | number): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`);
    }
}