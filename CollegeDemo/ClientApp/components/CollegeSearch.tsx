import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Button, ControlLabel, Form, FormControl, FormGroup, OverlayTrigger, PageHeader, Popover, Tooltip } from 'react-bootstrap';
import { SearchForm } from './SearchForm';
import { LineItem } from './LineItem';

interface CollegeSearchState {
    defaultSearchName: string;
    defaultSearchState: string;
    lastSearchName: string;
    lastSearchState: string;
    colleges: CollegeModel[];
    loadingColleges: boolean;
    minNameSearchLength: number;
}

export class CollegeSearch extends React.Component<RouteComponentProps<{}>, CollegeSearchState> {
    constructor() {
        super();
        this.state = {
            defaultSearchName: '',
            defaultSearchState: 'WI', //Pre-load the grid using the best state :)
            lastSearchName: '',
            lastSearchState: '',
            colleges: [],
            loadingColleges: false,
            minNameSearchLength: 3
        };

        this.refreshCollegesTable(this.state.defaultSearchName, this.state.defaultSearchState);
    }

    public render() {
        let searchFormContents = <SearchForm
            defaultSearchName={this.state.defaultSearchName}
            defaultSearchState={this.state.defaultSearchState} 
            minNameSearchLength={this.state.minNameSearchLength}
            handleSearchFormChanges={this.refreshCollegesTable.bind(this)} />;

        let collegeContents = this.state.loadingColleges
            ? <p><em>Loading Colleges...</em></p>
            : CollegeSearch.renderCollegesTable(this.state.colleges);

        return <div>
            {searchFormContents}
            {collegeContents}
        </div>;
    }
    
    private refreshCollegesTable(newSearchName: string, newSearchState: string) {
        let minNameSearchLength = this.state.minNameSearchLength;
        let searchState = newSearchState && newSearchState != 'all' ? newSearchState : '';
        let searchName = newSearchName && (newSearchName.length >= minNameSearchLength || searchState.length != 0) ? newSearchName : '';
        
        let lastSearchName = this.state.lastSearchName ? this.state.lastSearchName : '';
        let lastSearchState = this.state.lastSearchState ? this.state.lastSearchState : '';        

        let clearColleges = searchName.length == 0 && searchState.length == 0;
        if (clearColleges) {
            this.setState({ colleges: [] });
            return;
        }

        let nameSearchChanged = searchName != lastSearchName;
        let stateSearchChanged = searchState != lastSearchState;
        if (!nameSearchChanged && !stateSearchChanged) {
            return;
        }

        let nameQueryString = searchName.length > 0 ? ('name=' + searchName) : '';
        let stateQueryString = searchState.length > 0 ? (nameQueryString.length > 0 ? '&' : '') + ('state=' + searchState) : '';
        let queryString = nameQueryString.length > 0 || stateQueryString.length > 0 ? ('?' + nameQueryString + stateQueryString) : '';

        fetch('api/colleges' + queryString)
            .then(response => response.json() as Promise<CollegeModel[]>)
            .then(data => {
                this.setState({
                    colleges: data,
                    loadingColleges: false,
                    lastSearchName: searchName,
                    lastSearchState: searchState
                });
            });
    }

    private static renderCollegesTable(colleges: CollegeModel[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Total Enrollment</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {colleges.map(college =>
                    <LineItem college={ college } />
                )}
            </tbody>
        </table>;
    }
}

export interface CollegeModel {
    id: number;
    name: string;
    city: string;
    state: string;
    zip: string;
    totalEnrollment: number;
    percentFemaleEnrollment: number;
    percentMaleEnrollment: number;
    averageAnnualNetPrice: number;
    averageLoanPrincipal: number;
    overallCompletionRate: number;
    medianEarnings6YearsAfterEntry: number;
    medianEarnings10YearsAfterEntry: number;
}