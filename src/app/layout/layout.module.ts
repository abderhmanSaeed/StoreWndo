import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialListComponent } from './components/footer/footer-data/components/social-list/social-list.component';
import { UserMenuComponent } from './components/header/components/user-menu/user-menu.component';
import { SearchInputComponent } from './components/header/components/search-input/search-input.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarAdComponent } from './components/sidebar/components/sidebar-ad/sidebar-ad.component';
import { ChangeLanguageComponent } from './components/header/components/change-language/change-language.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SellDialogComponent } from './components/header/components/sell-dialog/sell-dialog.component';
import { HelpComponent } from './components/help/help.component';
import { AukVideoModule } from '../shared-modules/auk-video/auk-video.module';
import { FormsModule } from '@angular/forms';
import { MobileSidebarComponent } from './components/responsive/mobile-sidebar/mobile-sidebar.component';
import { MobileHeaderComponent } from './components/responsive/mobile-header/mobile-header.component';
import { HelpSectionComponent } from './components/responsive/mobile-sidebar/components/help-section/help-section.component';
import { SectionsComponent } from './components/responsive/mobile-sidebar/components/sections/sections.component';
import { ChangeLanguageSectionComponent } from './components/responsive/mobile-sidebar/components/change-language-section/change-language-section.component';
import { UserSectionComponent } from './components/responsive/mobile-sidebar/components/user-section/user-section.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UserMenuComponent,
    BottomBarComponent,
    SocialListComponent,
    SearchInputComponent,
    SidebarAdComponent,
    ChangeLanguageComponent,
    SellDialogComponent,
    HelpComponent,
    MobileSidebarComponent,
    MobileHeaderComponent,
    SectionsComponent,
    HelpSectionComponent,
    ChangeLanguageSectionComponent,
    UserSectionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    AukVideoModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    LayoutRoutingModule,
  ]
})
export class LayoutModule { }
