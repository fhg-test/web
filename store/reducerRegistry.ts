/**
 * See http://nicolasgallagher.com/redux-modules-and-code-splitting/
 * for reasoning and explanations on how this works
 */

// tslint:disable readonly-keyword no-object-mutation
class ReducerRegistry {
  private emitChange = null;
  private reducers = {};

  public getReducers() {
    return { ...this.reducers };
  }

  public register(name: string, reducer: any) {
    this.reducers = { ...this.reducers, [name]: reducer };

    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  public setChangeListener(listener: Function) {
    this.emitChange = listener;
  }

  // Preserve initial state for not-yet-loaded reducers
  public getCombinedReducers(initialState = {}) {
    const reducers = this.getReducers();
    const reducerNames = Object.keys(reducers);

    Object.keys(initialState).forEach((item) => {
      if (reducerNames.indexOf(item) === -1) {
        reducers[item] = (state = null) => state;
      }
    });

    return reducers;
  }
}
// tslint:enable readonly-keyword no-object-mutation

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
