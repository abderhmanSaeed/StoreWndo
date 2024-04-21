import { Component, OnInit } from '@angular/core';
import { App } from '../../models/app/app';
import { FooterLink } from '../../models/footer-link/footer-link';
import { PaymentItem } from '../../models/payment-item/payment-item';
import {
  appsList,
  linksList1,
  linksList2,
  paymentsList,
} from './footer-data/footer-links';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.component.rtl.scss'],
})
export class FooterComponent implements OnInit {
  // Props
  apps: App[] = appsList;
  faChevronUp = faChevronUp;
  currentYear = moment().year();
  footerLinks: FooterLink[] = linksList1;
  footerLinksL2: FooterLink[] = linksList2;
  paymentItems: PaymentItem[] = paymentsList;

  //Responsive
  isMobile: boolean = false;
  subscriptionMobile: Subscription = new Subscription();

  // begin:: booleans
  showFloatingFooter: boolean = false;

  currentUrl: string = '';

  showFooter: boolean = true;

  constructor(
    private router: Router,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    if (this.currentUrl === '/explore') {
      this.showFooter = false;
    } else {
      this.showFooter = true;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showFooter = this.currentUrl === '/explore' ? false : true;
      }
    });

    this.subscriptionMobile = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );
  }
}
