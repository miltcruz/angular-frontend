import { Component, OnInit } from "@angular/core";
import { InputFormComponent } from "../../component/input-form/input-form";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.template.html",
  styleUrls: ["./home.styles.css"],
  imports: [InputFormComponent],
})
export class HomeComponent implements OnInit { 

  constructor(public api: ApiService) {}

  ngOnInit(): void {
      this.loadObjects();
  }

  loadObjects() {
    this.api.getObjects().subscribe({
      next: (response) => {
        console.log(response);
        this.api.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.api.error.set('Failed to load objects');
        this.api.loading.set(false);
      }
    });
  }
}