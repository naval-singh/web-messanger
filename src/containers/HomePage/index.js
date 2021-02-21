import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeUsers } from '../../actions';
import Layout from '../../componants/Layout';
import './style.css';

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatUser, setChatUser] = useState('');
    const [chatStarted, setChatStarted] = useState(false);
    let unsubscribe;

    useEffect(() => {
        unsubscribe = dispatch(getRealTimeUsers(auth.uid))
            .then(unsubscribe => {
                return unsubscribe
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // componentWillUnmount
    useEffect(() => {
        return () => {
            unsubscribe.then(f => f()).catch(e => console.log(e))
        }
    }, [])

    const initChat = (user) => {
        setChatStarted(true)
        setChatUser(`${user.firstName} ${user.lastName}`)
    }

    const renderListOfUsers = () => {
        return (
            user.users.map(user => {
                return (
                    <div onClick={() => initChat(user)} className="displayName" key={user.uid}>
                        <div className="displayPic">
                            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
                            <span style={{ fontWeight: 500 }}>{`${user.firstName} ${user.lastName}`}</span>
                            <span>{user.isOnline ? 'online' : 'offline'}</span>
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <Layout>
            <section className="container">

                <div className="listOfUsers">
                    {renderListOfUsers()}
                </div>

                <div className="chatArea">
                    <div className="chatHeader">
                        {chatUser ? chatUser : ''}
                    </div>
                    <div className="messageSections">
                        {
                            chatStarted &&
                            <div style={{ textAlign: 'left' }}>
                                <p className="messageStyle" >Hello User</p>
                            </div>
                        }
                    </div>
                    {
                        chatStarted &&
                        <div className="chatControls">
                            <textarea />
                            <button>Send</button>
                        </div>
                    }
                </div>

            </section>
        </Layout>
    )
}

export default HomePage;