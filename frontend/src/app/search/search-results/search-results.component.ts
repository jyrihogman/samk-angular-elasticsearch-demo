import { Component, Input } from "@angular/core";

@Component({
  selector: "search-results-component",
  templateUrl: "./search-results.component.html"
})
export class SearchResultsComponent {
  @Input() searchResults = {};
}
