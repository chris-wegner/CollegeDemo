import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

interface CollegeSearchState {
    searchName: string;
    searchState: string;
    states: StateModel[];
    loadingStates: boolean;
    colleges: CollegeModel[];
    loadingColleges: boolean;
}

export class CollegeSearch extends React.Component<RouteComponentProps<{}>, CollegeSearchState> {
    constructor() {
        super();
        this.state = { searchName: "", searchState: "WI", states: [], loadingStates: true, colleges: [], loadingColleges: false };

        fetch('api/states')
            .then(response => response.json() as Promise<StateModel[]>)
            .then(data => {
                this.setState({ states: data, loadingStates: false });
            });
    }

    public render() {
        let searchFormContents = this.state.loadingStates
            ? <p><em>Loading States...</em></p>
            : CollegeSearch.renderSearchForm(this.state);

        let collegeContents = this.state.loadingColleges
            ? <p><em>Loading Colleges...</em></p>
            : CollegeSearch.renderCollegesTable(this.state.colleges);

        return <div>
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

    private static renderSearchForm(searchState: CollegeSearchState) {
        return <div>
            <Form>
                <br />
                <FormGroup
                    controlId="nameSearchInput"
                    bsClass=".nameSearch"
                    bsSize="sm"
                >
                    <ControlLabel>Enter a school name</ControlLabel>
                    <FormControl
                        type="text"
                        value={searchState.searchName}
                        placeholder="School Name"
                        //onChange={this.handleChange}
                    />
                </FormGroup>
                                
                <br />
                <FormGroup
                    controlId="stateSearchInput"
                    bsClass=".stateSearch"
                    bsSize="sm"
                >
                    <ControlLabel>Select a state</ControlLabel>
                    <FormControl
                        componentClass="select"
                        placeholder="select"
                        value={searchState.searchState}
                        //onChange={this.handleChange}
                    >
                        <option value="select">-Select-</option>
                        {searchState.states.map(state =>
                            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                        )}  
                    </FormControl>
                </FormGroup>
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