import { setTimeboxes } from '../../actions/timeboxesActions';

describe('actions setTimeboxes', () => {
  it('setTimeboxes emits TIMEBOXES_SET action', () => {
    expect(setTimeboxes([])).toEqual({ type: 'TIMEBOXES_SET', timeboxes: [] });
  });
});
