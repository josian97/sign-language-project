import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../shared/progress.service';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  cards: any = [];
  categoryName = '';
  categoryId = '';
  showPopup = false;
  selectedCard: any = null;

  learnedCount = 0;
  progress = 0;
  showToast = false;

  progressService = inject(ProgressService);
  private route = inject(ActivatedRoute);

  @ViewChild('Video') Video!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    const currentRoute = this.route.snapshot.paramMap.get('id');
    this.loadData(currentRoute);
    this.subscribeToProgress();
  }

  loadData(id: string | null) {
    fetch('assets/data/data.json')
      .then(res => res.json())
      .then(data => {

        const category = data.categories.find((cat: any) => cat.id == id);
        this.categoryName = category.name;
        this.cards = category.items;
        this.updateProgress();

      });
  }

  openPopup(card: any) {
    this.selectedCard = card;
    this.showPopup = true;
    console.log(card)
  }

  closePopup() {
    this.showPopup = false;
    this.selectedCard = null;
  }

  play() {
    this.Video.nativeElement.play();
  }

  toggleLearned(card: any) {
    if (!card) return;
    this.progressService.toggleLearned(this.route.snapshot.paramMap.get('id')!, card.id);
    this.showToastMessage()
  }

  updateProgress() {
    const categoryId = this.route.snapshot.paramMap.get('id')!;
    const total = this.cards.length;
    const learned = this.progressService.getLearnedItems(categoryId).length;
    this.learnedCount = learned;
    this.progress = total ? (learned / total) * 100 : 0;
  }

  subscribeToProgress() {
    this.progressService.progress$.subscribe(() => {
      this.updateProgress();
    });
  }

  showToastMessage() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

