import { TranslateService } from '@ngx-translate/core';
import { Directive, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LocalizationService } from '../services/localization/localization.service';

@Directive()
export class ComponentBase implements OnDestroy {
  destroy$: Subject<unknown> = new Subject();
  constructor(
    protected _LocalizationService: LocalizationService,
    protected _TranslateService: TranslateService,
  ) {
    this.initTranslate();
  }

  initTranslate() {
    this._LocalizationService.langChangeObserver
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => {        
        this._TranslateService.use(lang);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
