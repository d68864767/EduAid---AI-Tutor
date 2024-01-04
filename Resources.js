import React, { Component } from 'react';
import axios from 'axios';

class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: []
        };
    }

    componentDidMount() {
        axios.get('/api/resources')
            .then(response => {
                this.setState({ resources: response.data });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {
        return (
            <div className="resources">
                <h2>Educational Resources</h2>
                <ul>
                    {this.state.resources.map((resource) => (
                        <li key={resource._id}>
                            <h3>{resource.title}</h3>
                            <p>Subject: {resource.subject}</p>
                            <p>Grade Level: {resource.gradeLevel}</p>
                            <p>Type: {resource.resourceType}</p>
                            <p>Description: {resource.description}</p>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer">Access Resource</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Resources;
