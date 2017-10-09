import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Button, ControlLabel, Form, FormControl, FormGroup, OverlayTrigger, PageHeader, Popover, Tooltip } from 'react-bootstrap';
import { LineItem } from './LineItem';

interface SearchFormState {
    searchName: string;
    searchState: string;
    minNameSearchLength: number;
    states: StateModel[];
    loadingStates: boolean;
}

export class SearchForm extends React.Component<any, SearchFormState> {
    constructor(props: any) {
        super();
        
        this.state = {
            searchName: props.defaultSearchName,
            searchState: props.defaultSearchState,
            minNameSearchLength: props.minNameSearchLength,
            states: [],
            loadingStates: true
        };

        this.loadStatesInput();
    }

    public render() {
        let searchFormContents = this.state.loadingStates
            ? <p><em>Loading States...</em></p>
            : this.renderSearchForm();

        return <div>
            {searchFormContents}
        </div>;
    }

    private handleSearchNameChange(event: any): void {
        this.setState({ searchName: event.target.value }, () => this.pushSearchFormChangeToConsumer());
    }

    private handleSearchStateChange(event: any): void {
        this.setState({ searchState: event.target.value }, () => this.pushSearchFormChangeToConsumer());
    }

    private loadStatesInput() {
        fetch('api/states')
            .then(response => response.json() as Promise<StateModel[]>)
            .then(data => {
                this.setState({ states: data, loadingStates: false });
            });
    }

    private pushSearchFormChangeToConsumer() {
        this.props.handleSearchFormChanges(this.state.searchName, this.state.searchState);
    }
    
    private renderSearchForm() {
        return <div>
            <Form>
                
                <FormGroup
                    controlId='nameSearchInput'
                    bsClass='.nameSearch'
                    bsSize='sm'
                >
                    <ControlLabel>Enter a School Name</ControlLabel>
                    <OverlayTrigger placement="bottom" overlay={
                        <Tooltip id='nameSearchTooltip'>{'When the State is set to -All-, a School Name that is less than ' + this.state.minNameSearchLength + ' characters will not be used to filter schools.'}</Tooltip>
                    }>
                        <FormControl
                            type='text'
                            value={this.state.searchName}
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
                        value={this.state.searchState}
                        onChange={e => this.handleSearchStateChange(e)}
                    >
                        <option value='all'>-All-</option>
                        {this.state.states.map(state =>
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

interface SearchFormValues {
    searchName: string;
    lastSearchName: string;
    searchState: string;
    lastSearchState: string;
}