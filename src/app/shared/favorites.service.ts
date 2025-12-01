import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FavoritesService {

  private key = "favorites";

  getList() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  toggle(id: string) {
    let list = this.getList();

    if (list.includes(id)) {
     list = list.filter((x: string) => x !== id);
    } else {
      list.push(id);
    }

    localStorage.setItem(this.key, JSON.stringify(list));
  }

  isFav(id: string) {
    return this.getList().includes(id);
  }
}
