import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShortsService } from 'src/app/modules/explore/modules/shorts/services/shorts/shorts.service';
import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/shared/services/router/router.service';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { Section } from 'src/app/shared/models/section/section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  sections: Section[] = [];
  selectedSectionId: number | null = null;

  subscription: Subscription = new Subscription();

  @Output() closeDrawer: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private _HttpService: HttpService,
    private _ShortsService: ShortsService,
    public routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.onSectionChange();
  }

  getAllData(): void {
    this.getSectionsWithCategories();
  }

  onSectionChange(): void {
    this.subscription.add(
      this._ShortsService.sectionChange$.subscribe((id: number | null) => {
        this.selectedSectionId = id;
      })
    );
  }

  /**
   *
   * @param svgURL
   * @returns
   */
  bindSvgIcon(svgURL: string): object {
    return {
      '-webkit-mask-image': `url(${svgURL})`,
      'mask-image': `url(${svgURL})`,
    };
  }

  getSectionsWithCategories(): void {
    this.subscription.add(
      this._HttpService
        .get(APIs.getSectionsWithCategories)
        .subscribe((res: HResponse) => {
          this.sections = res.responseData?.items;
        })
    );
  }

  closeSidebar() {
    this.closeDrawer.emit(true);
  }
}
