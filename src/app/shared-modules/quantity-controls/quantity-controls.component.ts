import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faPlus , faMinus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'quantity-controls',
  templateUrl: './quantity-controls.component.html',
  styleUrls: ['./quantity-controls.component.scss']
})
export class QuantityControlsComponent implements OnInit {

  // Outputs 
  @Output() onChange: EventEmitter<number> = new EventEmitter();

  // Inpusts
  @Input() maxQuantity: number = 0;
  @Input() set initQuantity(quantity: number) {
    this.quantity = quantity;
  }
  

  // props
  faPlus = faPlus;
  faMinus = faMinus;
  quantity: number = 0

  constructor() { }

  ngOnInit(): void {
  }


  increaseQuantity() {  
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.emitQuantity();
    }
  }

  decreaseQuantity() {   
    if (this.quantity != 1) this.quantity--; 
    this.emitQuantity();
  }


  emitQuantity(): void {
    this.onChange.emit(this.quantity);
  }

}