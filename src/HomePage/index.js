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

                        <p><Link to="/login"><button type="button" className="btn btn-secondary btn-sm">Logout</button></Link></p>
                    </div>
                </div>
                <Chart />

                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul className='container '>
                        {users.items.map((user, index) =>


                            <li className='row d-flex justify-content-between mb-2' key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                <div className='d-flex col justify-content-end'>
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <a onClick={''}>
                                                    <button type="button" className="btn btn-primary  btn-sm ">Edit</button></a>
                                    }
                                    {

                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <a classname='ml-2' onClick={this.handleDeleteUser(user.id)}>
                                                    <button type="button" className="btn btn-danger btn-sm ">Delete</button></a>
                                    }


                                </div>
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