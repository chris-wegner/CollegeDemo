import * as React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { CollegeModel } from './CollegeSearch';

interface LineItemState {
    college: CollegeModel;
}

export class LineItem extends React.Component<any, LineItemState> {
    constructor(props: any) {
        super();
        this.state = {
            college: props.college
        };
    }

    public render() {
        return <tr key={this.state.college.id}>
            <td>{this.state.college.name}</td>
            <td>{this.state.college.city}</td>
            <td>{this.state.college.state}</td>
            <td>{this.state.college.totalEnrollment ? this.state.college.totalEnrollment.toLocaleString() : ''}</td>
            <td>
                <OverlayTrigger trigger='focus' placement='left' overlay={
                    <Popover id='modal-popover' title={this.state.college.name}>
                        <div>Completion Rate: {this.state.college.overallCompletionRate ? ((Math.round(this.state.college.overallCompletionRate * 10000) / 100) + '%') : ''}</div>
                        <div>Avg. Annual Net Cost: {this.state.college.averageAnnualNetPrice ? ('$' + this.state.college.averageAnnualNetPrice.toLocaleString()) : ''}</div>
                        <div>Avg. Loan Principal: {this.state.college.averageLoanPrincipal ? ('$' + this.state.college.averageLoanPrincipal.toLocaleString()) : ''}</div>
                        <div>Med. Earnings 6 Years After Entry: {this.state.college.medianEarnings6YearsAfterEntry ? ('$' + this.state.college.medianEarnings6YearsAfterEntry.toLocaleString()) : ''}</div>
                        <div>Med. Earnings 10 Years After Entry: {this.state.college.medianEarnings10YearsAfterEntry ? ('$' + this.state.college.medianEarnings10YearsAfterEntry.toLocaleString()) : ''}</div>
                        <div>Pct. Female: {this.state.college.percentFemaleEnrollment ? ((Math.round(this.state.college.percentFemaleEnrollment * 10000) / 100) + '%') : ''}</div>
                        <div>Pct. Male: {this.state.college.percentMaleEnrollment ? ((Math.round(this.state.college.percentMaleEnrollment * 10000) / 100) + '%') : ''}</div>
                    </Popover>
                }>
                    <a href='#' onClick={e => e.preventDefault()}>Detail</a>
                </OverlayTrigger>
            </td>
        </tr>;
    }
}