import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {


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

  constructor() { }

  ngOnInit(): void {
  }

}
