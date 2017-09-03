import { INCREMENT } from './actions';

export interface AppState {
    counter: number;
    messages: {
        count: number;
        newMessages: number;
    }
}

export const INITIAL_STATE: AppState = {
    counter: 0,
    messages: {
        count: 10,
        newMessages: 2
    }
}

export function rootReducer(state: AppState, action: any): AppState {
    switch(action.type) {
        case INCREMENT:
            return Object.assign({}, state, { counter: state.counter + 1 });
        default:
            return state;
    }

}