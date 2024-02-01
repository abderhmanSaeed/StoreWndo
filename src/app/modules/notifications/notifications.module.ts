import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationsCardComponent } from './components/notifications-card/notifications-card.component';


@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationsCardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        TranslateModule,
        NotificationsRoutingModule,
    ]
})
export class NotificationsModule { }
