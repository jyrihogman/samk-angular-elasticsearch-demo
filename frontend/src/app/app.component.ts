import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "frontend";
  searchResults: {}[] = [];

  onSearch(result) {
    this.searchResults = result;
  }
}
