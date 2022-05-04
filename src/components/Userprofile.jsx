import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIUSERINFO_URL,APISENTREQ_URL,APIDELREQ_URL } from '../config';
import { DeleteFriend, SendReq } from '../services/userservice';
import UserlistWidget from './UserlistWidget';

export default function Userprofile({ suggestFriend, myData, refresh }) {
  const [user, setUser] = useState({});
  const { id } = useParams();
 
  let isFriend = myData.friends.myFriends
    .map(({ _id }) => _id === id)
    .includes(true);

  let isPending =
    myData.friends.mySentRequests.map(({ _id }) => _id === id).includes(true) ||
    myData.friends.myFriendRequests.map(({ _id }) => _id === id).includes(true);

  useEffect(() => {
    axios
      .get(`${APIUSERINFO_URL}` + id, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const SentReq = () => SendReq(id,refresh);  
  
  const DelReq = () => DeleteFriend(id,refresh); 

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-9 bg-white">
          <div className="position-relative">
            <img
              src="https://images.unsplash.com/photo-1495277493816-4c359911b7f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80"
              className="coverpic"
            />
            <img
              src={user.picture_url || require('../images/blank-profile.png')}
              className="size"
            />
          </div>
          <div className="mx-4 ">
            <h1 className="mt-5" data-testid='userfullname'>{"firstname" in user ? user.firstname + ' ' + user.lastname : "Unknown User"}</h1>
            <p>{user.bio} </p>
            <p>
              {`${user?.city} , ${user?.state} , India | ${user?.friends?.myFriends?.length}  Friend`}
            </p>
            <div className="d-flex">

              {isFriend ? (
                <div onClick={DelReq} className="btn btn-danger me-3">
                  REMOVE FRIEND
                </div>
              ) : isPending ? (
                <div className="btn btn-dark me-3">Request Pending</div>
              ) : (
                <div onClick={SentReq} className="btn btn-primary me-3">
                 ADD FRIEND
                </div>
              )}
              <a rel="noopener noreferrer" href={user.website} target="_blank" className='btn btn-outline-dark' >Visit Website</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 profile-sidebar">
          <UserlistWidget
            title="Friend Suggestions"
            friendList={suggestFriend}
          />
        </div>
      </div>
    </div>
  );
}
