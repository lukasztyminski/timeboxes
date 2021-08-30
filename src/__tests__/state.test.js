import { createStore } from 'redux';
import { addTimebox, removeTimebox } from '../actions/timeboxesActions';
import timeboxesReducer, {
  getAllTimeboxes,
  getTimeboxById,
} from '../reducers/timeboxesReducer';

let store = null;

describe('timeboxes state changes', () => {
  beforeEach(() => {
    store = createStore(timeboxesReducer);
  });
  test('initially timeboxes are empty', () => {
    const timeboxes = getAllTimeboxes(store.getState());
    expect(timeboxes).toEqual([]);
  });

  test('addTimebox action inserts a new timebox', () => {
    const newTimebox = { id: '211' };
    store.dispatch(addTimebox(newTimebox));
    const timeboxes = getAllTimeboxes(store.getState());
    expect(timeboxes).toEqual([newTimebox]);
  });

  test('removeTimebox action removes a timebox', () => {
    const timebox = { id: '1new' };
    const anotherTimebox = { id: 'other' };
    const anotherOtherTimebox = { id: 'other2' };
    store.dispatch(addTimebox(timebox));
    store.dispatch(addTimebox(anotherTimebox));
    store.dispatch(addTimebox(anotherOtherTimebox));
    store.dispatch(removeTimebox(timebox));

    expect(getTimeboxById(store.getState(), timebox.id)).toBe(undefined);
    expect(getTimeboxById(store.getState(), anotherTimebox.id)).toBe(
      anotherTimebox
    );
  });
});
