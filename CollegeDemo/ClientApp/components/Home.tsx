import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>College Listing Demo</h1>
            <br/>
            <p>Welcome to this awesome demo project where you can find a college or university by either its name or state.</p>
            <br />
            <br />
            <p><strong>GitHub Repository: </strong> </p>
            <p><strong>Contact Information: </strong>
                <a href="mailto:chris.wegner@gmail.com?Subject=Your%20College%20Demo%20Site" target="_top">chris.wegner@gmail.com</a> or
                <a href="tel:+12623477894" target="_top"> 262-347-7894</a>
            </p>
        </div>;
    }
}