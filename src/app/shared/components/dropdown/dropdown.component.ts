import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Languages } from '../../enums/languages/languages';
import { ComponentBase } from '../../helpers/component-base.directive';
import { DropdownItem } from '../../models/dropdown-item/dropdown-item';
import { LocalizationService } from '../../services/localization/localization.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends ComponentBase implements OnInit, OnDestroy {

  // inputs 
  @Input() set value(val: number) {
    this.initVal = val;
  }
  @Input() label: any = '';
  @Input() asSelect: boolean = false;
  @Input() set items(items: any[]) {
    if (items.length) {
      this.dropdownItems = [...items];
      this.setInitialValue(); 
    }
  }
  @Input() dropdownToggleIcon: any = faEllipsisVertical;


  // outputs 
  @Output() onClick: EventEmitter<DropdownItem> = new EventEmitter();

  
  // props 
  initVal: any = null;
  selectedItem: any = '';
  LanguagesEnum = Languages;
  dropdownItems: any[] = [];
  faEllipsisVertical = faEllipsisVertical;
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);

  constructor(
    translateService: TranslateService,
    LocalizationService: LocalizationService,
  ) { 
    super( LocalizationService, translateService );
  }


  ngOnInit(): void {
    this.onLangChange();
  }


  
  override ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }


  setInitialValue(): void {
    if (this.initVal == null) return
    this.selectedItem = [...this.dropdownItems.filter( item => item.id == this.initVal )][0].label;
  }


  onChabge(item: DropdownItem): void {
    this.onClick.emit(item);

    if (!this.asSelect) return
    this.selectedItem = item.label;
  }


  clear(): void {
    this.onClick.emit();
    this.selectedItem = null;
  }

}
