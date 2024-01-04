import React, { Component } from 'react';
import axios from 'axios';

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({
            question: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/ask', { question: this.state.question })
            .then(res => {
                this.setState({
                    answer: res.data.answer
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="QA">
                <h2>Ask a Question</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Question:
                        <input type="text" value={this.state.question} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Ask" />
                </form>
                {this.state.answer && (
                    <div className="Answer">
                        <h2>Answer</h2>
                        <p>{this.state.answer}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default QA;
