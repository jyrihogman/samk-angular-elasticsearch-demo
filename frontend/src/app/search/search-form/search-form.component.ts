import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SearchFormService } from "./search-form.service";

@Component({
  selector: "search-form-component",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.css"]
})
export class SearchFormComponent {
  searchText: string = "";
  @Output() searched = new EventEmitter<{}>();

  constructor(private searchFormService: SearchFormService) {}

  onBlur(searchText: string): void {
    this.searchText = searchText;
  }

  performSearch(event: any): void {
    this.searchFormService
      .getDocuments(event)
      .subscribe(h => this.searched.emit(h));
  }
}
