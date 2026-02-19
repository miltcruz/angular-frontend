import { Component, OnInit } from "@angular/core";
import { InputFormComponent } from "../../component/input-form/input-form";
import { ApiService } from "../../services/api.service";
import { APIResponse } from "../../models/api.object";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-home",
  templateUrl: "./home.template.html",
  styleUrls: ["./home.styles.css"],
  imports: [InputFormComponent, FormsModule],
})
export class HomeComponent implements OnInit { 

  objects: APIResponse[] = [];
  query: string = '';
 

  constructor(public api: ApiService) {}

  ngOnInit(): void {
      this.loadObjects();
  }

  get FilteredObjects(): APIResponse[] {
    if (!this.query) {
      return this.objects;
    }
    return this.objects.filter(obj => obj.name.toLowerCase().includes(this.query.toLowerCase().trim()));
  }

  loadObjects() {
    this.api.getObjects().subscribe({
      next: (response) => {
        console.log(response);
        this.objects = response as APIResponse[];
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