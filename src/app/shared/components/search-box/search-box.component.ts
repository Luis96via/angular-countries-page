import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  private debouncer = new Subject<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(600) // 600ms delay between keystrokes
      )
      .subscribe((value) => {
        if (value.length >= 3) {
          this.onValue.emit(value);
        }
      });
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.debouncer.complete();
    this.debouncer.unsubscribe();
  }
}
