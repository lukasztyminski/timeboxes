import timeboxesReducer, {
  areTimeboxesLoading,
} from '../../reducers/timeboxesReducer';

describe('Timeboxes Reducer', () => {
  test('areTimeboxesLoading return true when state.areTimeboxesLoading is set to true', () => {
    const state = {
      areLoadingTimeboxes: true,
    };

    expect(areTimeboxesLoading(state)).toBe(true);
  });

  test('adds a timebox when given a TIMEBOX_ADD action', () => {
    const state = {
      timeboxes: [],
    };

    const newTimebox = {
      id: 'I am a new timebox',
    };

    expect(
      timeboxesReducer(state, { type: 'TIMEBOX_ADD', timebox: newTimebox })
    ).toEqual({
      timeboxes: [newTimebox],
    });
  });
});
