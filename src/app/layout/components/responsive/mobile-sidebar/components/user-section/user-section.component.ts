import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss'],
})

export class UserSectionComponent implements OnInit {
  // @Input() isAuthenticated: boolean = true;

  ByerData: BuyerProfile | null = {};

  @Input() set buyerProfile(data: BuyerProfile | null) {
    this.ByerData = data;
    console.log(this.ByerData, 'this.ByerData');
  }

  constructor(
    public authService: AuthService,
  ) {}

  ngOnInit(): void {}

  onImgError(event: any) {
    event.target.src = 'assets/media/users/user-placeholder.png';
  }
}
