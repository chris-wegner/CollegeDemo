import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>College Search Demo</h1>
            <br/>
            <p>Welcome to this super awesome demo project where you can find a college or university, located in the United States, by either its name or state.  Use the menu and choose "Search for Colleges" to experience this demo in all of its glory.</p>
            <br />
            <br />
            <br />
            <p><strong>Tech Stack:</strong> </p>
            <ul>
                <li>Languages: C#, TypeScript</li>
                <li>Frameworks: ASP.Net Core 2.0, React, react-bootstrap, Newtonsoft.Json and AutoMapper</li>
                <li>Utilities: Webpack</li>
            </ul>
            <br />
            <p><strong>Source API:</strong> </p>
            <ul>
                <li>U.S. Department of Education's College Scorecard Data: <a href="https://collegescorecard.ed.gov/data/documentation/">https://collegescorecard.ed.gov/data/documentation/</a></li>
                <li>Obtain a free API key by filling out the form at: <a href="https://api.data.gov/signup">https://api.data.gov/signup</a></li>
            </ul>
            <br />
            <p><strong>GitHub Repository: </strong><a href="https://github.com/chris-wegner/CollegeDemo">https://github.com/chris-wegner/CollegeDemo</a></p>
            <p><strong>Contact Information: </strong>
                <a href="mailto:chris.wegner@gmail.com?Subject=Your%20College%20Demo%20Site" target="_top">chris.wegner@gmail.com</a> or
                <a href="tel:+12623477894" target="_top"> 262-347-7894</a>
            </p>
        </div>;
    }
}