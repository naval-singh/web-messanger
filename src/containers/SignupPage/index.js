import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';
import Layout from '../../componants/Layout';
import Card from '../../componants/UI/Card';
import '../style.css';

/**
* @author
* @function SignupPage
**/

const SignupPage = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }

    if (auth.authenticated) {
        return <Redirect to='/' />
    }

    return (
        <Layout>
            <div className='credentialContainer'>
                <Card>
                    <form onSubmit={handleSubmit} className='credentialForm'>
                        <h3>Sign Up</h3>
                        <div style={{ display: 'flex' }}>
                            <input
                                style={{ marginRight: 7 }}
                                required
                                type='text'
                                value={firstName}
                                placeholder='first name'
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <input
                                style={{ marginLeft: 8 }}
                                required
                                type='text'
                                value={lastName}
                                placeholder='last name'
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        <input
                            required
                            type='email'
                            value={email}
                            placeholder='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className='btn'>
                            <button>Sign Up</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    )
}

export default SignupPage;