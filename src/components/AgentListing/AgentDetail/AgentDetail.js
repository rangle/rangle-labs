import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AgentDetail.scss';
import axios from 'axios';


class AgentDetail extends Component {
    state = {
        agent: null
      };

    componentDidMount() {
    }

    getAgent = async (agent_id) => {
        const res = await axios.get(`/agents/${agent_id}`)
        return res.data;
    }

    async componentDidMount() {
        const { agent_id } = this.props.match.params;
        console.log(agent_id);
        const agent = await this.getAgent(agent_id);
        this.setState({ agent });
    }

    renderAgentTechnologies(technologies) {
        return technologies.map(technology => {
            return (
                <div>{technology.name}</div>
            );

        })
    }

    render () {
        const { agent } = this.state;

        if (!this.state.agent) return <div className="loading">Loading</div>;

        return (
            <div className="agent-detail-box">
                <div className="detail-header">
                    <div className="agent-image">
                        <img src={agent.image} />
                    </div>
                    <div>
                        <h3>{`${agent.firstName} ${agent.lastName}`}</h3>
                        <h4>{agent.role}</h4>
                    </div>
                </div>
                <div className="agent-details">
                    <div className="current-technologies">
                        <p>Current skills</p>
                        {this.renderAgentTechnologies(agent.currentTechnologies)}
                    </div>
                    <div className="aspirational-technologies">
                        <p>Wants to learn</p>
                        {this.renderAgentTechnologies(agent.aspirationalTechnologies)}
                    </div>

                </div>
            </div>
        )
    }
}

export default AgentDetail;
