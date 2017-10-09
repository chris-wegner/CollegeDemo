import * as React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export class LineItemDetail extends React.Component<any> {
    public render() {
        return (
            <OverlayTrigger trigger='focus' placement='left' overlay={
                <Popover id='modal-popover' title={this.props.college.name}>
                    <div>Completion Rate: {this.props.college.overallCompletionRate ? ((Math.round(this.props.college.overallCompletionRate * 10000) / 100) + '%') : ''}</div>
                    <div>Avg. Annual Net Cost: {this.props.college.averageAnnualNetPrice ? ('$' + this.props.college.averageAnnualNetPrice.toLocaleString()) : ''}</div>
                    <div>Avg. Loan Principal: {this.props.college.averageLoanPrincipal ? ('$' + this.props.college.averageLoanPrincipal.toLocaleString()) : ''}</div>
                    <div>Med. Earnings 6 Years After Entry: {this.props.college.medianEarnings6YearsAfterEntry ? ('$' + this.props.college.medianEarnings6YearsAfterEntry.toLocaleString()) : ''}</div>
                    <div>Med. Earnings 10 Years After Entry: {this.props.college.medianEarnings10YearsAfterEntry ? ('$' + this.props.college.medianEarnings10YearsAfterEntry.toLocaleString()) : ''}</div>
                    <div>Pct. Female: {this.props.college.percentFemaleEnrollment ? ((Math.round(this.props.college.percentFemaleEnrollment * 10000) / 100) + '%') : ''}</div>
                    <div>Pct. Male: {this.props.college.percentMaleEnrollment ? ((Math.round(this.props.college.percentMaleEnrollment * 10000) / 100) + '%') : ''}</div>
                </Popover>
            }>
                <a href='#' onClick={e => e.preventDefault()}>Detail</a>
            </OverlayTrigger>);
    }
}