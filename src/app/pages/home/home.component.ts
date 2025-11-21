import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService } from '../../shared/progress.service';

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
  
  learnedCounts: { [key: string]: number } = {};
  progressMap: { [key: string]: number } = {};

  progressService = inject(ProgressService);

  ngOnInit(): void {
    this.loadCategories();
    this.subscribeToProgress();
  }

  loadCategories() {
    fetch('/assets/data/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data');
        return res.json();
      })
      .then(data => {
        this.categories = data.categories || [];
        this.updateProgressMaps();
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
        this.errorMsg = 'Something went wrong while loading data.';
        this.loading = false;
        this.categories = [
          { id: 'alphabet', name: 'Alphabet', color: '#FFD6E0', image: 'assets/images/alphabet.png', items: [] },
          { id: 'numbers', name: 'Numbers', color: '#FFFACD', image: 'assets/images/numbers.png', items: [] },
          { id: 'animals', name: 'Animals', color: '#E0BBFF', image: 'assets/images/animals.png', items: [] },
          { id: 'family-nature', name: 'Family and Nature', color: '#E0D6FF', image: 'assets/images/family-nature.png', items: [] },
          { id: 'colors', name: 'Colors', color: '#C9F8FF', image: 'assets/images/colors.png', items: [] },
          { id: 'days', name: 'Days of the Week', color: '#E0FFF1', image: 'assets/images/days.png', items: [] }
        ];
      });
  }

  
  subscribeToProgress() {
    this.progressService.progress$.subscribe(() => {
      this.updateProgressMaps();
    });
  }

  
  updateProgressMaps() {
    this.categories.forEach(cat => {
      const learned = this.progressService.getLearnedItems(cat.id).length;
      const total = cat.items?.length || 0;
      this.learnedCounts[cat.id] = learned;
      this.progressMap[cat.id] = total ? (learned / total) * 100 : 0;
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



