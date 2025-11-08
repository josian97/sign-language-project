
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] = [];
  loading = true;
  errorMsg = '';
  learnedCount = 0;
  totalItems = 0;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    fetch('/assets/data/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data');
        return res.json();
      })
      .then(data => {
        this.categories = data.categories || [];
        this.totalItems = this.categories.reduce(
          (sum: number, c: any) => sum + (c.items?.length || 0), 0
        );
        this.learnedCount = 0;
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
        this.errorMsg = 'Something went wrong while loading data.';
        this.loading = false;
        this.categories = [
          { name: 'Alphabet', color: '#FFD6E0', image: 'assets/images/alphabet.png' },
          { name: 'Numbers', color: '#FFFACD', image: 'assets/images/numbers.png' },
          { name: 'Animals', color: '#E0BBFF', image: 'assets/images/animals.png' },
          { name: 'Family and Nature', color: '#E0D6FF', image: 'assets/images/family-nature.png' },
          { name: 'Colors', color: '#C9F8FF', image: 'assets/images/colors.png' },
          { name: 'Days of the Week', color: '#E0FFF1', image: 'assets/images/days.png' }
        ];
      });
  }

  niceName(name: string): string {
    return name
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  }

  scrollToCategories() {
    const section = document.getElementById('categories');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}



