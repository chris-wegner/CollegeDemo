import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button id='collapseButton' type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Demo Project</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active' onClick={() => this.closeNavMenu()}>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/colleges'} activeClassName='active' onClick={() => this.closeNavMenu()}>
                                <span className='glyphicon glyphicon-th-list'></span> Search for Colleges
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }

    public closeNavMenu() {
        var collapseButton = document.getElementById('collapseButton');
        if (collapseButton)
            collapseButton.click();
    }
}
