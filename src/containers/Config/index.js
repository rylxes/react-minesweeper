import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ConfigOptions from '../../components/ConfigOptions';
import { newGrid } from '../../actions/grid';
import { newStopwatch } from '../../actions/stopwatch';
import{ STOPWATCH_INITIAL_VALUE }  from '../../constants';

import './index.css';

class Config extends Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e){
    const {
      history,
      newGrid,
      newStopwatch
    } = this.props;

    const option = e.target.value;

    if (option === 'R') {
      history.push('/game');
    }
    if (option === 'S') {
      newGrid();
      newStopwatch(STOPWATCH_INITIAL_VALUE);
      history.push('/game');
    }
  }

  render() {
    return (
      <div className="config-container">
        <ConfigOptions onSelect={this.onSelect} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newGrid: bindActionCreators(newGrid, dispatch),
    newStopwatch: bindActionCreators(newStopwatch, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Config);
