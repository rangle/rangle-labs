import React, { Component } from 'react';

import axios from "axios";

import TeamListing from "../../../../../lib/components/team-listing/team-listing";

class AddProjectAgents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
      search: {
        searchResult: [],
        searchValue: "",
      }
    }
  }


  onInput = event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState(prevState => ({
      search: {
        ...prevState.search,
        [name]: value
      },
    }));
  };

  searchForAgent = async event => {
    this.onInput(event);
    const searchTerm = event.target.value;

    if (!searchTerm) {
      this.setState(prevState => ({
        search: {
          ...prevState.search,
          searchResult: [],
        }
      }));
      return;
    }
    const res = await axios.get(`/agents/search/${searchTerm}`);
    
    this.setState(prevState => ({
      search: {
        ...prevState.search,
        searchResult: res.data,
      }
    }));
  }

  addAgentToTeam = event => {
    event.preventDefault();
    const teamMemberIndex = event.target.value;
    const teamMember = (this.state.search.searchResult[teamMemberIndex]);
    const newAgents = [...this.state.project.agents];
    newAgents.push(teamMember)
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        agents: newAgents
      }
    }));
  };

  render() {
    return(
      <div>
        <input
          name="searchValue"
          type="text"
          placeholder="Start typing a name..."
          value={this.state.search.searchValue}
          onChange={this.searchForAgent}
        />
        <TeamListing
          teamMembers={this.state.search.searchResult}
          onAddClick={this.addAgentToTeam}
        />
      </div>
    );
  }
}

export default AddProjectAgents;
