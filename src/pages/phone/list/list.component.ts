import { Component, OnInit, inject } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { APIResponse } from "../../../models/api.object";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-phone-list",
  templateUrl: "./list.template.html",
  imports: [FormsModule, RouterLink, CommonModule],
})
export class PhoneListComponent implements OnInit {
  api = inject(ApiService);
 

  objects: APIResponse[] = [];
  query = '';
  currentPage = 1;
  itemsPerPage = 3;

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

  sortAscending() {
    this.FilteredObjects.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortDescending() {
    this.FilteredObjects.sort((a, b) => b.name.localeCompare(a.name));
  }

  paginatedObjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.FilteredObjects.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.FilteredObjects.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
        this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
    }
  }
}