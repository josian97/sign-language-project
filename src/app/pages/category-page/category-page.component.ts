import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-page',
  imports: [CardComponent, CommonModule],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent {
  constructor(private route: ActivatedRoute) { }
  cards: any = []
  showPopup = false;
  selectedCard: any = null;

  @ViewChild('Video') Video!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    const currentRoute = this.route.snapshot.paramMap.get('id');
    this.loadData(currentRoute)
  }

  loadData(id: any) {
    fetch('assets/data/data.json')
      .then(res => res.json())
      .then(data => {

        const category = data.categories.find((cat: any) => cat.id == id);
        this.cards = category.items
        console.log(this.cards)

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
}
