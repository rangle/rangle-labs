import React, { Component } from 'react';
import './ProjectDetail.scss';
import axios from 'axios';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import DifficultyPips from '../DifficultyPips/DifficultyPips';
import TeamListing from '../TeamListing/TeamListing';
import TechListing from '../TechListing/TechListing';

class ProjectDetail extends Component {
    state = {
        project: null
    };

    getProject = async (project_id) => {
        const res = await axios.get(`/projects/${project_id}`)
        return res.data;
    }

    async componentDidMount() {
        const { project_id } = this.props.match.params;
        const project = await this.getProject(project_id);
        this.setState({ project });
    }

    render () {
        const { project } = this.state;

        if (!this.state.project) return <div className="loading">Loading</div>;

        return (
            <div className="project-box">
                <div className="project-details">
                    <h3>{project.title}</h3>
                    <ProjectStatus status={project.status} />
                    <DifficultyPips difficulty={project.difficulty} />
                    <p>{project.description}</p>
                    <div className="technologies">
                        <p>Technologies Used:</p>
                        {/* TECH TOOL LISTING */}
                        <TechListing technologies={project.technologies} />
                    </div>
                    {/* PROJECT LEAD LISTING */}
                    <p>Project Owner:</p>
                    <TeamListing teamMembers={project.projectLead} />
                    {/* TEAM LISTING*/}
                    <p>Team:</p>
                    <TeamListing teamMembers={project.agents} />
                </div>
            </div>
        )
    }
}

export default ProjectDetail;