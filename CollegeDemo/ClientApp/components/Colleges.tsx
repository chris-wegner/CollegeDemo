import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Form } from 'react-bootstrap';

interface CollegeSearchState {
    states: StateModel[];
    loadingStates: boolean;
    colleges: CollegeModel[];
    loadingColleges: boolean;
}

export class CollegeSearch extends React.Component<RouteComponentProps<{}>, CollegeSearchState> {
    constructor() {
        super();
        this.state = { states: [], loadingStates: true, colleges: [], loadingColleges: false };

        fetch('api/states')
            .then(response => response.json() as Promise<StateModel[]>)
            .then(data => {
                this.setState({ states: data, loadingStates: false });
            });
    }

    public render() {
        let searchFormContents = this.state.loadingStates
            ? <p><em>Loading States...</em></p>
            : CollegeSearch.renderSearchForm(this.state.states);

        let collegeContents = this.state.loadingColleges
            ? <p><em>Loading Colleges...</em></p>
            : CollegeSearch.renderCollegesTable(this.state.colleges);

        return <div>
            <h1>Find your college or university</h1>
            {searchFormContents}
            {collegeContents}
        </div>;
    }

    private static renderCollegesTable(colleges: CollegeModel[]) {
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
                    <td>{college.name}</td>
                    <td>{college.city}</td>
                    <td>{college.state}</td>
                    <td>{college.zip}</td>
                    <td>{college.totalEnrollment}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    private static renderSearchForm(states: StateModel[]) {
        return <div>
            <Form>
                <br />
                <strong>Name:&nbsp;</strong>
                <input type="text" name="searchName" id="searchName" />
                <br />
                <br />
                <strong>State: &nbsp;</strong>
                <input type="select" name="searchState" id="searchState"> 
                </input>
                <br />
                <br />
            </Form>

            
        </div>;
        //    <table className='table'>
        //    <thead>
        //        <tr>
        //            <th>abbreviation</th>
        //            <th>name</th>
        //        </tr>
        //    </thead>
        //    <tbody>
        //        {states.map(college =>
        //            <tr key={college.abbreviation}>
        //                <td>{college.abbreviation}</td>
        //                <td>{college.name}</td>
        //            </tr>
        //        )}
        //    </tbody>
        //</table>;
    }
}

interface StateModel {
    name: string;
    abbreviation: string;
}

interface CollegeModel {
    id: number;
    name: string;
    city: string;
    state: string;
    zip: string;
    totalEnrollment: number;
}