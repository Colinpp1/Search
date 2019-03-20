import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

class Search extends React.Component {
  state = {
    search: [],
    showRemoveIcon: false,
    searchValue: ""
  };


  handleClick = e =>
  {
    this.setState({
      searchValue: e.data,

    })
  
    Client.search(e.data, search => {
      this.setState({
        search: search.slice(0, MATCHING_ITEM_LIMIT)
      });
    });
  }

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        search: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      Client.search(value, search => {
        this.setState({
          search: search.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      search: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon,search } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const dataRows = search.map((search_item, idx) => (
      <tr key={idx} onClick={() => this.handleClick(search_item)}>
        <td>{search_item.data}</td>
      </tr>
    ));

    return (
      <div id="item-search">
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th colSpan="5">
                <div className="ui fluid search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Search ..."
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className="search icon" />
                  </div>
                  <i
                    className="remove icon"
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className="eight wide">Description</th>
            </tr>
          </thead>
          <tbody>
            {dataRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Search;