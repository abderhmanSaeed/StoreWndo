import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { timer, map, takeWhile, Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {


  // Inputs 
  @Input() seconds = environment.otpExpiredIn;


  // Outputs
  @Output() end: EventEmitter<boolean> = new EventEmitter();
  @Output() start: EventEmitter<void> = new EventEmitter();


  // Props 
  timeRemaining$: any;
  subscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.start.emit();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.counter();
    this.timeRemainingSubscription();
  }

  timeRemainingSubscription(): void {
    this.timeRemaining$.subscribe((time: any) => {      
      if (time == 0) {
        this.end.emit(true);
      }
    });
  }


  counter(): void {
    this.timeRemaining$ = timer(0, 1000).pipe(
      map(n => (this.seconds - n) * 1000),
      takeWhile(n => n >= 0),
    );
  }

  repeat(): void {
    this.end.emit(false);
    this.counter();
    this.timeRemainingSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  
}
