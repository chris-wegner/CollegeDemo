import * as React from 'react';
import { LineItemDetail } from './LineItemDetail';

export class LineItem extends React.Component<any> {
    public render() {
        return <tr key={this.props.college.id}>
            <td>{this.props.college.name}</td>
            <td>{this.props.college.city}</td>
            <td>{this.props.college.state}</td>
            <td>{this.props.college.totalEnrollment ? this.props.college.totalEnrollment.toLocaleString() : ''}</td>
            <td>
                <LineItemDetail college={this.props.college} />
            </td>
        </tr>;
    }
}