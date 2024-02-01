import { Component, OnInit } from '@angular/core';
import { App } from '../../models/app/app';
import { FooterLink } from '../../models/footer-link/footer-link';
import { PaymentItem } from '../../models/payment-item/payment-item';
import { appsList, linksList1, linksList2, paymentsList } from './footer-data/footer-links';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.component.rtl.scss']
})
export class FooterComponent implements OnInit {


  // Props 
  apps: App[] = appsList;
  faChevronUp = faChevronUp;
  currentYear = moment().year();
  footerLinks: FooterLink[] = linksList1;
  footerLinksL2: FooterLink[] = linksList2;
  paymentItems: PaymentItem[] = paymentsList;

  // begin:: booleans 
  showFloatingFooter: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
