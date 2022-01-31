import { Injectable } from '@angular/core';

/**Http Module */
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

/**
 * APP constants
 */
import { URLconstant } from "../../constants/url.constant";

/**
 * Interfaces in APP
 */
import { Location } from "../../interfaces/locations.interface";
import { LoadChildren } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationListsService {

  constructor(
    private _http: HttpClient
  ) { }

 /**
  * @param : searchQuery
  * This method will request the location data from weather API
  * based on the search query provided by User 
  */

 public getLocationLists(searchQuery) : Observable<Array<Location>> {
    
    const uriPath = 'location/search/?query='
     
    return new Observable((observer) => {
           const URL = `${URLconstant.WeatherApiBaseUrl}${uriPath}${searchQuery}`;
           
           this._http.get<Array<Location> | []>(URL).subscribe((data: Array<Location> | []) => {
                   this.validateResponseForError(data) ? (() => {
                    observer.next(data);
                    observer.complete();
                   })() : observer.error(new Error('No Location found'));
           })
     })
 }

 /**
   * 
   * @param data - check if the data is present or not
   * @returns 0 | 1
   *   if the function returns 0, it means there is no data form the API for the
   *   user input data in the form else it will retun 1 stating the data is valid.
   */
 private validateResponseForError(data : Array<Location> | []) {
       if(!data.length) {
            return 0;
       }

       return 1;
 }

}
