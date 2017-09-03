import { Component } from '@angular/core';
import { NgRedux, select } from "ng2-redux/lib";
import { AppState } from "./store";
import { INCREMENT } from "./actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @select('counter') counter$;
  @select(['messages', 'count']) messageCount$;
  @select((s: AppState) => s.messages.newMessages) newMessages$;

  constructor(private ngRedux: NgRedux<AppState>) {
    ngRedux.subscribe(() => {
      console.log('store', ngRedux.getState());
    });
    
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT })
  }
}
