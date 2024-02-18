import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  isMobile: boolean = false;

  subscription: Subscription = new Subscription();

  helpNavList: any[] = [
    {
      name: 'Contact Us',
      route: 'https://wndo.com/contact-us/',
      imgPath: 'assets/media/svg/contact-us.svg'
    },
    {
      name: 'Help Center',
      route: 'https://wndo.com/contact-us/',
      imgPath: 'assets/media/svg/help-center.svg'
    },
    {
      name: 'FAQ',
      route: 'https://wndo.com/faq/',
      imgPath: 'assets/media/svg/faqs.svg'
    },
  ]

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.subscription = this.responsiveService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

}
