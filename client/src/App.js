import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

//const e = React.createElement;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "facebook",
            profile_pic_url: "",
            name: "",
            nameURL: "",
            bio: "",
            repos: [],
            reposURLs: [],
        };
    }

    componentDidMount() {

        this.callAPI();
    }

    callAPI(){
        
        // GitHub endpoint, passing in specified username from constructor
        const url = `https://api.github.com/users/`+ this.state.username;
        
        fetch(url) 
            .then(function(response) {
                return response.json();
            })
            .then(jsonResponse => this.setState({ 
                profile_pic_url: jsonResponse.avatar_url,
                name: jsonResponse.name, 
                nameURL: jsonResponse.html_url,
                bio: jsonResponse.bio,
            }))
            .catch(err => err);
        
        
        async function getRepos(username, currentComponent) {
            const rurl = `https://api.github.com/users/${username}/repos`;
            var tempRepoNames = [];
            var tempRepoURLs = [];

            let response = await fetch(rurl);
            let result = await response.json();
            for (var i=0; i<result.length; i++) {
                tempRepoNames.push(result[i].name);
                tempRepoURLs.push(result[i].html_url);
            }
            currentComponent.setState({ 
                repos: tempRepoNames,
                reposURLs: tempRepoURLs,
            });
        }

        getRepos(this.state.username, this);
    
    }

    render() {

        return (

            <div className="card card-cascade wider github-component m-4">
                <div className="view overlay hoverable mx-4 mt-4 rounded">
                    <a href={this.state.nameURL} onClick={() => {
                                fetch("http://localhost:9000/save", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ url: this.state.nameURL, name: "Avatar" })});
                    }}>
                    <img className="card-img-top img-fluid" src={this.state.profile_pic_url}  alt="avatar"/>
                    </a>
                </div>

                <div className="card-body card-body-cascade text-center">
                    <a className="text-decoration-none" href={this.state.nameURL} onClick={() => {
                        fetch("http://localhost:9000/save", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: this.state.nameURL, name: this.state.name })});
                    }}><h1 className="card-title"><strong>{this.state.name}</strong></h1></a>
                    
                    <p className="card-text font-italic">{this.state.bio}</p>
                    <a className="text-decoration-none" href={this.state.nameURL} onClick={() => {
                            fetch("http://localhost:9000/save", {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: this.state.nameURL, name: 'Repositories:' })});
                    }}>
                    <h5 className="repo-title">Repositories:</h5></a>
                    <ul className="list-group rounded text-left" id="repos">
                        <a className="text-decoration-none" href={this.state.reposURLs[0]} onClick={() => {
                            fetch("http://localhost:9000/save", {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: this.state.reposURLs[0], name: this.state.repos[0] })});
                        }}><li className="list-group-item list-group-item-action list-group-item-secondary rounded mb-1">{this.state.repos[0]}</li></a>
                        <a className="text-decoration-none" href={this.state.reposURLs[1]} onClick={() => {
                            fetch("http://localhost:9000/save", {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: this.state.reposURLs[1], name: this.state.repos[1] })});
                        }}><li className="list-group-item list-group-item-action list-group-item-secondary rounded mb-1">{this.state.repos[1]}</li></a>
                        <a className="text-decoration-none" href={this.state.reposURLs[2]} onClick={() => {
                            fetch("http://localhost:9000/save", {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: this.state.reposURLs[2], name: this.state.repos[2] })});
                        }}><li className="list-group-item list-group-item-action list-group-item-secondary rounded mb-1">{this.state.repos[2]}</li></a>
                        <a href={this.state.nameURL} onClick={() => {
                            fetch("http://localhost:9000/save", {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: this.state.nameURL, name: 'More Button' })});
                        }}><button id="moreBtn" className="btn btn-info mt-1">More Repositories</button></a>
                    </ul>  
                </div>
            </div>
        );
    }
    
}
//const domContainer = document.querySelector('#app_component');
//const domContainer = document.querySelector('#root');
// const domContainer = document.getElementById('root');
// ReactDOM.render(e(App), domContainer);
//React.render(<App />, document.getElementById('root'));
export default App; 
