import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Button, ControlLabel, Form, FormControl, FormGroup, OverlayTrigger, PageHeader, Popover, Tooltip } from 'react-bootstrap';

interface CollegeSearchState {
    searchName: string;
    lastSearchName: string;
    searchState: string;
    lastSearchState: string;
    states: StateModel[];
    loadingStates: boolean;
    colleges: CollegeModel[];
    loadingColleges: boolean;
    minNameSearchLength: number;
}

export class CollegeSearch extends React.Component<RouteComponentProps<{}>, CollegeSearchState> {
    constructor() {
        super();
        this.state = {
            searchName: '',
            lastSearchName: '',
            searchState: 'WI', //Default to the best state.
            lastSearchState: '', //Force the initial load.
            states: [],
            loadingStates: true,
            colleges: [],
            loadingColleges: false,
            minNameSearchLength: 3
        };

        this.loadStatesInput();
        this.refreshCollegesTable();        
    }

    public render() {
        let searchFormContents = this.state.loadingStates
            ? <p><em>Loading States...</em></p>
            : this.renderSearchForm(this.state);

        let collegeContents = this.state.loadingColleges
            ? <p><em>Loading Colleges...</em></p>
            : CollegeSearch.renderCollegesTable(this.state.colleges);

        return <div>
            {searchFormContents}
            {collegeContents}
        </div>;
    }

    private handleSearchNameChange(event: any): void {
        this.setState({ searchName: event.target.value }, () => this.refreshCollegesTable());
    }

    private handleSearchStateChange(event: any): void {
        this.setState({ searchState: event.target.value }, () => this.refreshCollegesTable());
    }

    private loadStatesInput() {
        fetch('api/states')
            .then(response => response.json() as Promise<StateModel[]>)
            .then(data => {
                this.setState({ states: data, loadingStates: false });
            });
    }

    private refreshCollegesTable() {
        let minNameSearchLength = this.state.minNameSearchLength;
        let searchState = this.state.searchState && this.state.searchState != 'all' ? this.state.searchState : '';
        let searchName = this.state.searchName && (this.state.searchName.length >= minNameSearchLength || searchState.length != 0) ? this.state.searchName : '';
        
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

        let nameQueryString = searchName.length > 0 ? ('name=' + this.state.searchName) : '';
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
                    <tr key={college.id}>
                    <td>{college.name}</td>
                    <td>{college.city}</td>
                    <td>{college.state}</td>
                    <td>{college.totalEnrollment ? college.totalEnrollment.toLocaleString() : ''}</td>
                    <td>
                        <OverlayTrigger trigger='focus' placement='left' overlay={
                            <Popover id='modal-popover' title={college.name}>
                                <div>Completion Rate: {college.overallCompletionRate ? ((Math.round(college.overallCompletionRate * 10000) / 100) + '%') : ''}</div>
                                <div>Avg. Annual Net Cost: {college.averageAnnualNetPrice ? ('$' + college.averageAnnualNetPrice.toLocaleString()) : ''}</div>
                                <div>Avg. Loan Principal: {college.averageLoanPrincipal ? ('$' + college.averageLoanPrincipal.toLocaleString()) : ''}</div>
                                <div>Med. Earnings 6 Years After Entry: {college.medianEarnings6YearsAfterEntry ? ('$' + college.medianEarnings6YearsAfterEntry.toLocaleString()) : ''}</div>
                                <div>Med. Earnings 10 Years After Entry: {college.medianEarnings10YearsAfterEntry ? ('$' + college.medianEarnings10YearsAfterEntry.toLocaleString()) : ''}</div>
                                <div>Pct. Female: {college.percentFemaleEnrollment ? ((Math.round(college.percentFemaleEnrollment * 10000) / 100) + '%') : ''}</div>
                                <div>Pct. Male: {college.percentMaleEnrollment ? ((Math.round(college.percentMaleEnrollment * 10000) / 100) + '%') : ''}</div>
                            </Popover>
                        }>
                            <a href='#' onClick={e => e.preventDefault()}>Detail</a>
                        </OverlayTrigger>
                    </td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    private renderSearchForm(collegeSearchState: CollegeSearchState) {
        return <div>
            <Form>
                <PageHeader>Find a college or university</PageHeader>
                <FormGroup
                    controlId='nameSearchInput'
                    bsClass='.nameSearch'
                    bsSize='sm'
                >
                    <ControlLabel>Enter a School Name</ControlLabel>
                    <OverlayTrigger placement="bottom" overlay={
                        <Tooltip id='nameSearchTooltip'>{'When the State is set to -All-, a School Name that is less than ' + collegeSearchState.minNameSearchLength + ' characters will not be used to filter schools.'}</Tooltip>
                    }>
                        <FormControl
                            type='text'
                            value={collegeSearchState.searchName}
                            placeholder='School Name'
                            onChange={e => this.handleSearchNameChange(e)}
                        />
                    </OverlayTrigger>
                </FormGroup>           
                <br />
                <FormGroup
                    controlId='stateSearchInput'
                    bsClass='.stateSearch'
                    bsSize='sm'
                >
                    <ControlLabel>Select a State</ControlLabel>
                    <FormControl
                        componentClass='select'
                        placeholder='select'
                        value={collegeSearchState.searchState}
                        onChange={e => this.handleSearchStateChange(e)}
                    >
                        <option value='all'>-All-</option>
                        {collegeSearchState.states.map(state =>
                            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                        )}
                    </FormControl>
                </FormGroup>
                <br />
                <br />
            </Form>
        </div>;
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
    percentFemaleEnrollment: number;
    percentMaleEnrollment: number;
    averageAnnualNetPrice: number;
    averageLoanPrincipal: number;
    overallCompletionRate: number;
    medianEarnings6YearsAfterEntry: number;
    medianEarnings10YearsAfterEntry: number;
}