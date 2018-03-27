import changeTime from '../../Functions/changeTime';

let state, timer;

beforeEach(() => {
  state = {
    selected: 'session',
    unit: 'min',
    sessionLength: '9:00',
    breakLength: '3:00'
  };
  timer = {
    countDown: null
  };
});

test('Should increase session minutes by 1.', () => {
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

test('Should not change the time.', () => {
  const mode = 'add';
  const limType = 'maximum';
  const lim1 = 59.59; const lim2 = 29.59;
  state.sessionLength = '59.00';
  const result = changeTime(mode, limType, lim1, lim2, state, timer);
  expect(result).toEqual(state);
});

test('Should decrease break seconds by 1.', () => {
  state.selected = 'break'; state.unit = 'sec';
  const mode = 'sub'; const limType = 'minimum'; const lim1 = 5.00; const lim2 = 1.00;
  const newState = {
    ...state,
    breakLength: '2:59'
  };
  const result = changeTime(mode, limType, lim1, lim2, state, timer);
  expect(result).toEqual(newState);
});

test('Should not decrease time.', () => {
  const mode = 'sub'; const limType = 'minimum'; const lim1 = 5.00; const lim2 = 1.00;
  state.selected = 'break'; state.unit = 'sec';

  const result = changeTime(mode, limType, lim1, lim2, state, timer);
  expect(result).toEqual(state);
});
