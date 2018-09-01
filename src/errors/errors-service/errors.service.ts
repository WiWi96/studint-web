import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  private updateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  update$: Observable<number> = this.updateSubject.asObservable();

  updateError(error: number) {        
      this.updateSubject.next(error);
  }
}
