import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Chart } from '../_components/Chart'


class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        
    }
    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                <h1>Hi {user.firstName}!</h1>
                    </div>
                    <div className='col d-flex justify-content-end mt-2'>
                    
                <p><Link to="/login"><button type="button" class="btn btn-secondary btn-sm">Logout</button></Link></p>
                    </div>
                </div>
                <Chart />
                
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

const mapState = (state) => {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };