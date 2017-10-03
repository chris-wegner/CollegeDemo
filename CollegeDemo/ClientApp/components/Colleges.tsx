import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface CollegesExampleState {
    colleges: CollegeModel[];
    loading: boolean;
}

export class Colleges extends React.Component<RouteComponentProps<{}>, CollegesExampleState> {
    constructor() {
        super();
        this.state = { colleges: [], loading: true };

        fetch('api/Colleges?state=wi')
            .then(response => response.json() as Promise<CollegeModel[]>)
            .then(data => {
                this.setState({ colleges: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Colleges.renderForecastsTable(this.state.colleges);

        return <div>
            <h1>Find your college or university</h1>
            { contents }
        </div>;
    }

    private static renderForecastsTable(colleges: CollegeModel[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Total Enrollment</th>
                </tr>
            </thead>
            <tbody>
            {colleges.map(college =>
                    <tr key={college.id}>
                    <td>{ college.name}</td>
                    <td>{ college.city }</td>
                    <td>{ college.state }</td>
                    <td>{ college.zip }</td>
                    <td>{ college.totalEnrollment }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

interface CollegeModel {
    id: number;
    name: string;
    city: string;
    state: string;
    zip: string;
    totalEnrollment: number;
}
