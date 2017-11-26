import React from 'react';

export default class CdnjsSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      result: {},
      isLoading: false,
      query: 'jquery',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ isLoading: true });
    const apiUrl = this.constructApiUrl();
    $.getJSON(apiUrl, (data) => {
      this.setState({ isLoading: false, result: data });
    });
  }

  constructApiUrl() {
    const query = this.state.query.trim();
    if (!query) {
      return '';
    }
    return `https://api.cdnjs.com/libraries/${encodeURIComponent(query)}`;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container" style={{ margin: '15px auto' }}>
          <h3>Loading...</h3>
        </div>
      );
    }

    const { name, filename, version, license, assets = [] } = this.state.result;
    return (
      <div className="container" style={{ margin: '15px auto' }}>
        <label>Name</label> {name} <br />
        <label>File name</label> {filename} <br />
        <label>Version</label> {version} <br />
        <label>License</label> {license} <br />
        <label>All versions</label>
        <div>
          {assets.map(x => (<div>{x.version}</div>))}
        </div>
      </div>
    );
  }
}
