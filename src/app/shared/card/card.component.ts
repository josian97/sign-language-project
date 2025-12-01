
import { Component, Input, inject } from '@angular/core';
import { FavoritesService } from "../../shared/favorites.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() name!: string
  @Input() image!: string
  @Input() id!: string

  fav = inject(FavoritesService)

  toggleFav() {
    if(this.id) this.fav.toggle(this.id)
  }

  isFav() {
    return this.id ? this.fav.isFav(this.id) : false
  }
}


