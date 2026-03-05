import { Component, OnInit, inject } from "@angular/core";
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
  api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
 

  object: APIResponse | null = null; 
  private id = '';

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