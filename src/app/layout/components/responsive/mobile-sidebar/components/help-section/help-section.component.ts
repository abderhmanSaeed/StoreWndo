import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
})
export class HelpSectionComponent implements OnInit {
  helpNavList: any[] = [
    {
      name: 'help.contactUs',
      route: 'https://wndo.com/contact-us/',
      imgPath: 'assets/media/svg/contact-us.svg',
    },
    {
      name: 'help.helpCenter',
      route: 'https://wndo.com/contact-us/',
      imgPath: 'assets/media/svg/help-center.svg',
    },
    {
      name: 'help.faq',
      route: 'https://wndo.com/faq/',
      imgPath: 'assets/media/svg/faqs.svg',
    },
  ];

  subscription: Subscription = new Subscription();

  @Output() closeDrawer: EventEmitter<boolean> = new EventEmitter(false);

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  closeSidebar() {
    this.closeDrawer.emit(true);
  }
}
