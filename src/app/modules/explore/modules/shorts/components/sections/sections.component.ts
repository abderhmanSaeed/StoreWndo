import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Section } from '../../../../../../shared/models/section/section';
import { ShortsService } from '../../services/shorts/shorts.service';

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit, OnDestroy {

  // props 
  sections: Section[] = []
  selectedSecttionIndex = -1;
  selectedSectionId: number | null = null;
  subscription: Subscription = new Subscription();


  constructor(
    private _HttpService: HttpService,
    private _ShortsService: ShortsService,
  ) { }

  ngOnInit(): void {
    this.getAllData();
    this.sectionChange();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  sectionChange(): void {
    this.subscription.add(
      this._ShortsService.sectionChange$.subscribe( (id: number | null) => {
        this.selectedSectionId = id;
      })
    );
  }


  getAllData(): void {
    this.getSections();
  }

  getSections(): void {
    this.subscription.add(this._HttpService.get(APIs.getSections).subscribe((res: HResponse ) => {
      this.sections = res.responseData?.items;
    }));
  }

}
