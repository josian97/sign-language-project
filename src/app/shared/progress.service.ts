import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageUtil } from './local-storage.util';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private key = 'learnedWords';
  private learned = LocalStorageUtil.get(this.key) || {};

  private progressSubject = new BehaviorSubject<any>(this.learned);
  progress$ = this.progressSubject.asObservable();

  toggleLearned(categoryId: string, itemId: number) {
    if (!this.learned[categoryId]) {
      this.learned[categoryId] = [];
    }

    const index = this.learned[categoryId].indexOf(itemId);

    if (index === -1) {
      this.learned[categoryId].push(itemId);
    } else {
      this.learned[categoryId].splice(index, 1);
    }

    LocalStorageUtil.set(this.key, this.learned);
    this.progressSubject.next(this.learned);
  }

  getLearnedItems(categoryId: string): number[] {
    return this.learned[categoryId] || [];
  }

  
  getProgress(categoryId: string, totalItems: number): number {
    const learnedCount = this.getLearnedItems(categoryId).length;
    return totalItems ? (learnedCount / totalItems) * 100 : 0;
  }
}

