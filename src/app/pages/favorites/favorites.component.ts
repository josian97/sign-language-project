import { Component, OnInit, inject } from '@angular/core';
import { FavoritesService } from '../../shared/favorites.service';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favService = inject(FavoritesService)
  favCards: any[] = []

  ngOnInit(): void {
    const favIds = this.favService.getList()
    // لو عندك data.json عشان تجيب البيانات الكاملة
    fetch('assets/data/data.json')
      .then(res => res.json())
      .then(data => {
        const allCards = data.categories.flatMap((cat: any) => cat.items)
        this.favCards = allCards.filter((c: any) => favIds.includes(c.id))
      })
  }

  selectedCard: any = null;
showPopup = false;

openPopup(card: any) {
  this.selectedCard = card;
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}

}

