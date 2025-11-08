import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  template: `
    <div class="category-page">
      <h2>Category Page Coming Soon</h2>
      <p>This page will display items for the selected category.</p>
    </div>
  `,
  styles: [`
    .category-page {
      text-align: center;
      padding: 80px 20px;
      font-family: 'Poppins', sans-serif;
    }
    h2 {
      color: #333;
      font-size: 2rem;
    }
  `]
})
export class CategoryComponent {}
