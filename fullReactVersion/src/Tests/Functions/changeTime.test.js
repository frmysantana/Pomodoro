import changeTime from '../../Functions/changeTime';

test('Should increase session minutes by 1.', () => {
  const state = {
    selected: 'session',
    unit: 'min',
    sessionLength: '9:00',
    breakLength: '3:00'
  };
  const timer = {
    countDown: null
  };
  const mode = 'add';
  const limType = 'maximum';
  const lim1 = 59.59; const lim2 = 29.59;
  const newState = {
    selected: 'session',
    unit: 'min',
    sessionLength: '10:00',
    breakLength: '3:00'
  }
  const result = changeTime(mode, limType, lim1, lim2, state, timer);
  expect(result).toEqual(newState);
});