import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    submittted: [],
    computed: {},
    input: ''
  };

  componentDidMount() {
    this.fetchComputed();
    this.fetchSubmited();
  }

  async fetchComputed() {
    const res = await axios.get('/api/values/current');
    console.log('Redis: ', res);
    if (res.status === 200 && typeof res.data === 'object') {
      this.setState({ computed: res.data });
    }
  }

  async fetchSubmited() {
    const res = await axios.get('/api/values/all');
    console.log('Postgres: ', res);
    if (res.status === 200 && typeof res.data === 'object') {
      this.setState({ submittted: res.data });
    }
  }

  renderSubmitted() {
    return this.state.submittted.map(({ number }) => number).join(', ');
  }

  renderComputed() {
    const entries = [];

    for (let key in this.state.computed) {
      entries.push(
        <div key={key}>
          {key} &rarr; {this.state.computed[key]}
        </div>
      );
    }
    return entries;
  }

  refreshComputed(event) {
    event.preventDefault();
    this.fetchComputed();
    this.renderComputed();
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.input
    });

    this.setState({ input: '' });
    this.fetchComputed();
    this.fetchSubmited();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="ui action input">
            <input value={this.state.input} onChange={(event) => this.setState({ input: event.target.value })} />
            <button className="ui primary button">Submit a number</button>
            <button className="ui secondary button" onClick={(event) => this.refreshComputed(event)}>
              Refresh
            </button>
          </div>
        </form>

        <h3 className="ui header">Numbers submitted</h3>
        <div className="ui message">{this.renderSubmitted()}</div>

        <h3 className="ui header">Computed values</h3>
        <div className="ui message">{this.renderComputed()}</div>
      </div>
    );
  }
}

export default Fib;
