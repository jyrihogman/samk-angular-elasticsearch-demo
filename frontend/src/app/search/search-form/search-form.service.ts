import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SearchFormService {
  constructor(private http: HttpClient) {}

  getDocuments(queryString: string): Observable<{}> {
    return this.http.post("http://localhost:5000/search", {
      query: queryString
    });
  }
}
