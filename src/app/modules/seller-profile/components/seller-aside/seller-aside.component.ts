import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/shared/services/responsive/responsive.service';

@Component({
  selector: 'seller-aside',
  templateUrl: './seller-aside.component.html',
  styleUrls: ['./seller-aside.component.scss']
})
export class SellerAsideComponent implements OnInit {
  subscriptionMobile: Subscription = new Subscription();
  isMobile: boolean = false;

  // Inputs
  @Input() data: any = {}

  constructor(private responsiveService: ResponsiveService,) { }

  ngOnInit(): void {
    this.subscriptionMobile = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      }
    );
  }

}
