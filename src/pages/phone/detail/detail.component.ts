import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { APIResponse } from "../../../models/api.object";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-phone-detail",
  templateUrl: "./detail.template.html",
  imports: [FormsModule],
})
export class PhoneDetailComponent implements OnInit { 

  object: APIResponse | null = null; 
  private id: string = '';
  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.api.getObjectById(this.id).subscribe(data => {
          this.object = data as APIResponse;
        });
      }
    });
  }

  deleteObject() {
        if (confirm('Are you sure?')) {
            this.api.deleteObject(this.id).subscribe({
                next: () => {
                    this.router.navigate(['/phone']);
                },
                error: (err) => console.error('Delete failed:', err)
            });
        }
    }


}