# Redux in Angular with ng2-redux

## Installing redux and ng2-redux

```shell
$ npm install --save redux ng2-redux
```

[GitHub - angular-redux/store: Angular 2+ bindings for Redux](https://github.com/angular-redux/store)


## ngRedux is an observable

ngRedux is an observable so we can subscribe to it and get the current store as follows:

```typescript
ngRedux.subscribe(() => {
	console.log('store', ngRedux.getState());
});
```

## Reading state from the store

In order to get state out of the store we can used the `select` decorator.

First we import it:

```typescript
import { NgRedux, select } from 'ng2-redux'

// ... define component ....

// property in component
@select() counter$;
```

The above code will look for a property in the store that matches the same name as the name of the property it is decorating. (It seems to ignore the dollar sign used for Finnish notation which indicates this property is an Observable).

If the names do not match, the select decorator can be given a string which is the name of the property in the store to select.

```typescript
@select('counter') counter$;
```

### Accessing nested properties in the store

We can access nested properties in the store by using array syntax in the select decorator:

```typescript
@select(['messages', 'count'] messagesCount$;
//this will access: messages.count in the store
```

### Accessing state using function

The select decorator also allows a function to be passed to the decorator which will be used to resolve the state to be selected from the store:

```typescript
@select((s: AppState) => s.messages.newMessages) newMessages$;
```


## High quality runtime assertions for Typescript

`tassert` can be used as a replacement for `Object.assign` on a more type-safe manner to ensure that extra properties are not assigned when copying state.

Take the following example that is possible when copying state:

```typescript

export interface AppState {
	counter: number;
}

export function reduce(state: AppState, action: Action): AppState) {

	switch(action.type) {
		case INCREMENT:
			return Object.assign({}, state, { counter: state.counter + 1 });
		case default:
			return state;
	}
}

```

In the above code snippet  we using `Object.assign` to copy the state object  and apply mutations. The `Object.assign` works from left-to-right copying properties from objects on the right to properties on the left.

One of the problems of using `Object.assign` in this approach is that it does not prevent us from adding properties that does not exist in our interface. So for example, we can do the following:

```typescript
return Object.assign({}, state, { counter: state.counter + 1, isOnline: true });
```

In the above, while the `isOnline` property is not part of our `AppState` interface it is nonetheless copied to the target object.

For this reason, there is a way to get a type-safe version of `Object.assign` using `tassert`. To install, run:

```shell
$ npm install --save tassign
```

Then we can use it as follows:

```typescript
import { tassign } from 'tassign'

return tassign(state, { counter: state.counter + 1 });
```

This `tassign` function is type-safe and does not allow the addition of extra properties.

Another advantage of using `tassign` in this manner is that the parameters seem to make more sense.  There is no need to have an empty target object as the first argument, you simply send in the object you want copied as the first argument and the mutations as the second.

## Using Immutable Objects

Of course, nothing in the reducer prevents us from actually modifying the state (even though we should not) which can lead to hard to detect bugs. One way of making this requirement explicit is to use the [Immutable.js](https://facebook.github.io/immutable-js/) library.

### Installing 

```sh
$ npm install --save immutable
```

### Using 

In order to use this library, we have to change the type of our store from `AppState` to `Map<string, any>` and use `get` and `set` methods to read and modify the properties in our store.

### Problems with using immutable.js with ng2-redux
Used Immutable.js to enforce that the store object remains immutable.
However, there are a number of problems that this library causes:

- Working with `Map<string, any>` and the `get` and `set` methods are much more verbose than using property access directly.
- The `AppState` interface is useless as the store is effectively a map
- The Map does not prevent additional properties being added to the map on the fly (like `tassign` would)
- The select decorator syntax seems to only allow the function argument and is also quite verbose. 

## Installing Redux Dev Tools

```typescript
import { DevToolsExtension } from 'ng2-redux'
```

Then we update the constructor in `app.module.ts` as follows:

```typescript
  constructor(ngRedux: NgRedux<AppState>,
              devTools: DevToolsExtension) {

    const middleware = [];
    const enhancers: StoreEnhancer<AppState>[] = isDevMode() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(rootReducer, INITIAL_STATE, middleware, enhancers);
  }
```

- - - -

https://www.npmjs.com/package/tassert
https://github.com/bcherny/tassert
[Immutable.js](https://facebook.github.io/immutable-js/)


## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
