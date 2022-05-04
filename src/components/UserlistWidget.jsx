import React from 'react';
import { Link } from 'react-router-dom';

function UserlistWidget({ title, friendList, ifEmpty }) {
  return (
    <div className="border p-2 mb-3 scroll bg-white shadow-lg p-3 bg-body rounded border-0 ">
      <div className="d-flex justify-content-between">
        <h6>{title}</h6>
       
      </div>
      {friendList.length === 0 && <div className="text-center">{ifEmpty}</div>}

      {friendList.map((friend,index) => (
        <Link
        key={index}
          to={'/profile/' + friend._id}

          className="d-flex mt-2 text-decoration-none "
        >
          <div>
            <img
              src={friend.picture_url || require('../images/blank-profile.png')}
              className="card-img-top small-round-pic me-2  round-img"
              alt="..."
            />
          </div>
          <div data-testid="friendName" className="d-flex align-items-center text-dark">
            {'firstname' in friend
              ? friend.firstname + ' ' + friend.lastname
              : 'Unknown User'}
          </div>
        </Link>
      ))}
      {/* <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li>
      <li>hii</li> */}
    </div>
  )
}

export default UserlistWidget;
