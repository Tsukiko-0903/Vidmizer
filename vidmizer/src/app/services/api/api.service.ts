import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region } from 'src/assets/models/region.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRegions() {
    return this.http.get<Region[]>(`https://geo.api.gouv.fr/regions`);
}
}
