import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>College Search Demo</h1>
            <br/>
            <p>Welcome to this demo project where you can find a U.S. based college or university by either its name or state.  Use the menu and choose "Search for Colleges" to experience this demo.</p>
            <br />
            <br />
            <p><strong>Tech Stack:</strong> </p>
            <ul>
                <li><b>Languages:</b> C#, TypeScript</li>
                <li><b>Frameworks:</b> ASP.Net Core 2.0, React, react-bootstrap, Swagger (Swashbuckle), Newtonsoft.Json and AutoMapper</li>
                <li><b>Utilities:</b> Webpack</li>
                <li><b>Host:</b> Azure</li>
            </ul>
            <br />
            <p><strong>Source API:</strong> </p>
            <ul>
                <li>U.S. Department of Education's College Scorecard Data: <a href="https://collegescorecard.ed.gov/data/documentation/">https://collegescorecard.ed.gov/data/documentation/</a></li>
                <li>Obtain a free API key by filling out the form at: <a href="https://api.data.gov/signup">https://api.data.gov/signup</a></li>
            </ul>
            <br />
            <p><strong>Localhost Swagger API Documentation: </strong><a href="http://localhost:65108/swagger">http://localhost:65108/swagger</a></p>
            <p><strong>GitHub Repository: </strong><a href="https://github.com/chris-wegner/CollegeDemo">https://github.com/chris-wegner/CollegeDemo</a></p>
        </div>;
    }
}