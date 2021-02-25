import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeMessages, getRealTimeUsers, updateMessage } from '../../actions';
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
    const [message, setMessage] = useState('');
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

    const submitMessage = e => {
        const messageObject = {
            user_uid_1: auth.uid,
            user_uid_2: chatUser.uid,
            message
        }
        if (message !== "") {
            dispatch(updateMessage(messageObject))
            setMessage('')
        }
    }

    const initChat = (user) => {
        setChatStarted(true)
        setChatUser(user)
        dispatch(getRealTimeMessages({ uid_1: auth.uid, uid_2: user.uid }))
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
                            <span className={user.isOnline ? 'onlineStatus' : 'onlineStatus off'}></span>
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
                    {/* <div className='onlineUsers'></div> */}
                    {renderListOfUsers()}
                </div>

                <div className="chatArea">
                    <div className="chatHeader">
                        {chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : ''}
                    </div>
                    <div className="messageSections">
                        {
                            chatStarted &&
                            user.conversations.map((con, index) =>
                                <div key={index} style={con.user_uid_1 == auth.uid ? { textAlign: 'right' } : { textAlign: 'left' }}>
                                    <p className="messageStyle" style={con.user_uid_1 == auth.uid ? { background: 'skyblue' } : { background: 'lightgreen' }}>{con.message}</p>
                                </div>
                            )
                        }
                    </div>
                    {
                        chatStarted &&
                        <div className="chatControls">
                            <textarea
                                value={message}
                                placeholder={'Write message here..'}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <button onClick={submitMessage}>Send</button>
                        </div>
                    }
                </div>

            </section>
        </Layout>
    )
}

export default HomePage;