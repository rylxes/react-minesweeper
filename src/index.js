import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configure';

import Routes from './routes';

import { cellStatus, ROW_BEGINNER, COL_BEGINNER, MINES_BEGINNER, STOPWATCH_INITIAL_VALUE }  from './constants';
import { fillMineGrid, fillMultiArray, fillWarningNumbers, fillRandomBoolean } from './utils/grid';

import 'normalize.css';
import './index.css';

const POSITION_QUANTITY = MINES_BEGINNER * 2;

const positionMines = fillRandomBoolean(POSITION_QUANTITY, ROW_BEGINNER);

const grid = fillMultiArray(ROW_BEGINNER, COL_BEGINNER, {
  warning: 0,
  status: cellStatus.CELL_INITIAL,
  visibility: false,
})

const gridWithMines = fillMineGrid(grid, positionMines);

const gridWithWarningNumbers = fillWarningNumbers(
  gridWithMines,
  positionMines
);

const initialState = {
  grid: { grid: gridWithWarningNumbers, rows: ROW_BEGINNER, cols: COL_BEGINNER, mines: MINES_BEGINNER, level: 'Beginner' },
  stopwatch: { text: STOPWATCH_INITIAL_VALUE, seconds: 0, minutes: 0, hours: 0 }
}

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);