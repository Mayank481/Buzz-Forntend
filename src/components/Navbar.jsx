import { Link } from 'react-router-dom';
import { handleLogout } from '../services/authServices';

export default function Navbar({ user }) {
  return (
    <>
      <nav className="navbar  navbar-light bg-light p-0">
        <div className="container-fluid">
          <div>
            <Link to={'/'}>
         
              <div id='logo-img'></div>
            </Link>
          </div>

          <div className="d-flex position-relative">
            <Link to="/profile" className="nav-link text-dark">
              <div className="d-flex">
                <div className="">
                  {'picture_url' in user ? (
                    <img
                      src={user.picture_url}
                      className="card-img-top small-round-pic  round-img"
                      alt="..."
                    />
                  ) : (
                    <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                  )}
                </div>
                <div className=" align-items-center ms-2 resp-hide" data-testid="userInfo">
                  {'firstname' in user
                    ? user.firstname + ' ' + user.lastname
                    : 'Edit Profile'}
                </div>
              </div>
            </Link>

            <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
              <Link to={'/'} className="text-dark">
                <i className="fa-solid fa-house"></i>
              </Link>
            </div>
            <div className="position-relative d-flex ">
              <Link
                to={'/friends'}
                className="d-flex align-items-center  ms-2 round-img border rounded-circle icon-bg text-dark p-2 "
              >
                <i className="fa-solid fa-user"></i>
              </Link>
              <div className="round-img bg-danger p-1 text-white incoming position-absolute bottom-50 end-0">
                {user.friends.myFriendRequests.length}
              </div>
            </div>
            <div
              onClick={handleLogout}
              className="d-flex align-items-center ms-2 me-3 round-img border rounded-circle icon-bg text-dark p-2 pointer"
            >
              <i className="fa fa-sign-out "></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
