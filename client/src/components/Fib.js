import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });

    this.setState({ index: '' });
    this.fetchValues();
    this.fetchIndexes();
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For number {key}, the value is: {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  refreshValues(event) {
    event.preventDefault();
    this.fetchValues();
    this.renderValues();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="ui action input">
            <input value={this.state.index} onChange={(event) => this.setState({ index: event.target.value })} />
            <button className="ui primary button">Submit a number</button>
            <button className="ui secondary button" onClick={(event) => this.refreshValues(event)}>
              Refresh
            </button>
          </div>
        </form>

        <h3 className="ui header">Numbers submitted</h3>
        <div className="ui message">{this.renderSeenIndexes()}</div>

        <h3 className="ui header">Computed values</h3>
        <div className="ui message">{this.renderValues()}</div>
      </div>
    );
  }
}

export default Fib;
