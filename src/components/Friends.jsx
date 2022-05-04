import React from 'react';
import UserlistWidget from './UserlistWidget';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleConfirmRequest, handleDeleteRequest } from '../services/userservice';

function Friends({ user, refresh }) {
  const confirmReq = (id) => handleConfirmRequest(id, refresh);
  const delReq = (id) => handleDeleteRequest(id, refresh);

  return (
    <>

      <div className="container p-4 mt-5">
        <div className="row">
          {/* ===========================================================Friend Requests==================================================================  */}
          <div className="col-md-8 shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="mt-2 ">Friend Requests</h3>
            {user && user.friends.myFriendRequests.length === 0 && (
              <p>No  friend requests </p>
            )}
            {user &&
              user.friends.myFriendRequests.map((friend) => (
                <div className="col-12 col-md-6 ">
                  <div className="d-flex friend-req justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          friend.picture_url ||
                          require('../images/blank-profile.png')
                        }
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                      <div className="px-3">
                        <h5 className="my-1" data-testid="friendRequestUser">
                          {friend.firstname + ' ' + friend.lastname}
                        </h5>
                        <p className="card-text">Delhi, India</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center controls">
                      <div
                        className="btn btn-primary mx-1"
                        onClick={() => confirmReq(friend._id)}
                      >
                        Confirm
                      </div>
                      <div
                        className="btn btn-outline-danger mx-1"
                        onClick={() => delReq(friend._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* ===========================================================Friend Lists==================================================================  */}

          <div className="col-lg-4 bg-warning">
            <UserlistWidget
              title="My Friend"
              friendList={user.friends.myFriends}
            />
      
          </div>

        </div>
        <div className='row'>
          {/* ===========================================================Pending Requests==================================================================  */}

          <div className='col-md-8 shadow-lg p-3 mb-5 bg-body rounded'>
            <h3 className="mt-2 mb-4">Pending Requests</h3>
            {user && user.friends.mySentRequests.length === 0 && (
              <p>No pending friend requests </p>
            )}
            {user &&
              user.friends.mySentRequests.map((friend) => (
                <div className="col ">
                  <div className="d-flex friend-req justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          friend.picture_url ||
                          require('../images/blank-profile.png')
                        }
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                      <div className="px-3">
                        <h5 className="my-1">
                          {friend.firstname + ' ' + friend.lastname}
                        </h5>
                        <p className="card-text">Delhi, India</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center controls">
                      <div
                        className="btn btn-outline-danger mx-1"
                        onClick={() => delReq(friend._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          

        </div>
      </div>


      <div className='container p-4'>
      
      </div>






      <ToastContainer theme="colored" />
    </>
  );
}

export default Friends;
