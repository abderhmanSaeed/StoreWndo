import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExploreView } from 'src/app/modules/explore/enums/explore-view';


@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  private currentViewSource = new BehaviorSubject<ExploreView>(ExploreView.Shorts);
  currentView$ = this.currentViewSource.asObservable();

  changeView(view: ExploreView) {
    this.currentViewSource.next(view);
  }
}
