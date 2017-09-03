import { INCREMENT } from './actions';
import { Map } from 'immutable';

// This interface is also not useful anymore
export interface AppState {
    counter: number;
    messages: {
        count: number;
        newMessages: number;
    };
}

export const INITIAL_STATE: AppState = {
    counter: 0,
    messages: {
        count: 10,
        newMessages: 2
    }
};

export function rootReducer(state: Map<string, any>, action: any): Map<string, any> {
    switch (action.type) {
      case INCREMENT:
          // state.set('isOnline', true); --> although this should not be allowed, it is still possible!
          return state.set('counter', state.get('counter') + 1);
        default:
            return state;
    }

}
