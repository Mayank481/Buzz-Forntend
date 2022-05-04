import React, { useEffect, useState } from 'react';
import { APIUSER_URL } from '../config';
import Post from './Post';
import UserlistWidget from './UserlistWidget';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
import FullPageSpinner from './FullPageSpinner';
import DefaultCard from './DefaultCard';
import {
  commentBox,
  Inlike,
  reportPost,
  unlike,
  publishPost,
} from '../services/postservices';
import { loadPost, totalPosts } from '../services/feedServices';

export default function Feeds(user) {
  const [refresh, setRefresh] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', files: '' });
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [loadDisable, setLoadDisable] = useState(false);
  const [count, setCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 4,
    total: 4,
  });
  const toggleRefresh = () => setRefresh((p) => !p);
  useEffect(() => {
    loadPost(
      pagination.page,
      pagination.limit,
      setPosts,
      setPageLoading,
      setLoadDisable
    );
  }, [pagination.page]);

  useEffect(() => {
    
    window.addEventListener('scroll', handleScroll);
    whenLoad();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [refresh]);

  async function whenLoad() {
    setPageLoading(true);
    setUserData(user.user);
    const { myPostsCount, totalPostCount } = await totalPosts(user.user._id);
    setCount(myPostsCount);
    console.log(count);
 
    setPagination((pre) => ({ ...pre, total: totalPostCount }));
  }

  function handleScroll() {
    if (
      Math.round(window.innerHeight + window.scrollY) >=
      Math.round(document.body.scrollHeight - 5)
    ) {
      !loadDisable && setPagination((pre) => ({ ...pre, page: pre.page + 1 }));
    }
  }

  const like = (id) => Inlike(id, setPosts, posts);
  const dislike = (id) => unlike(id, setPosts, posts);
  const commentbox = (id, message, commentInput, setcommentmessage) =>
    commentBox(id, message, commentInput, setcommentmessage, setPosts, posts);
  const report = (id) => reportPost(id, setPosts, posts);

  const publish = async () => {
    setPageLoading(true);
    const result = await publishPost(user.user._id, newPost);

    if (result.error) {
      setPageLoading(false);
      toast.error(result.error);
      return;
    }

    setNewPost({ title: '', files: undefined });
    setPosts([]);
    const total = await totalPosts(user.user._id);
    setPagination((pre) => ({ ...pre, total: total.totalPostCount }));
    toggleRefresh();
    
    loadPost(0, pagination.limit, setPosts, setPageLoading, setLoadDisable);
    toast.success('Your post uplaoded successfully');
  };

  return (
    <>
      {pageLoading && <FullPageSpinner />}

      <div style={{ backgroundColor: '#F0F2F5' }}>
        <div className="container">
          <div className="row">
            {/*======================================================================== column 1st ============================================================================== */}
            <div className="col-md-3 sticky side-height mt-3 ">
              <div className="card p-5 shadow-lg p-3 mb-2 bg-body rounded border-0">
                <div className="d-flex justify-content-center">
                  {'picture_url' in user.user ? (
                    <img
                      src={user.user.picture_url}
                      className="card-img-top small-round-pic  round-img"
                      alt="..."
                    />
                  ) : (
                    <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center" data-testid="userProName">
                    {'firstname' in user.user
                      ? user.user.firstname + ' ' + user.user.lastname
                      : 'Edit Profile'}
                  </h5>
                  <p className="card-text text-center">Newly Recruit at TTN </p>
                  <div className="d-flex justify-content-between mt-4">
                    <div>
                      <div className="text-center">
                        {user.user.friends.myFriends.length}
                      </div>
                      <div>Friends</div>
                    </div>
                    <div className="vr border"></div>
                    <div>
                      <div className="text-center">{count}</div>
                      <div>Post</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="card">
                  <img
                    src="https://media-s3-us-east-1.ceros.com/abbott/images/2020/06/18/5003c26bb33afd98eb9dc65ba64e18d0/asset-1.png?imageOpt=1"
                    className="card-img-top position-relative "
                    alt="..."
                  />
                  <div className="position-abs">
                    <img
                      className=" p-5  "
                      src="https://static1.tothenew.com/blog/wp-content/themes/ttn/images/social-logo.png"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            {/* ======================================================================= column 2nd ======================================================================== */}
            <div className="col-md-6   mt-3  position-relative">
              <div className="shadow p-3 mb-4 bg-body rounded">
                <div className="d-flex align-items-center">
                  <div className="">
                    {'picture_url' in user.user ? (
                      <img
                        src={user.user.picture_url}
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                    ) : (
                      <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                    )}
                  </div>
                  <div className="w-100 ms-2 me-2">
                    <input
                      type="text"
                      id="comment-box"
                      className="caption p-2 rounded-pill form-control"
                      placeholder={`What's on your mind ${user.user.firstname} ${user.user.lastname} ?`}
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="text-center d-flex align-items-center">
                    <input
                      type="file"
                      className="myFile"
                      id="file"
                      onChange={(e) =>
                        setNewPost((prev) => ({
                          ...prev,
                          files: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="text-center d-grid gap-2 w-100 mt-5 text-center mt-2">
                  <button
                    className="btn btn-success rounded-pill"
                    onClick={publish}
                  >
                    Upload
                  </button>
                </div>
              </div>

              {posts.map((element, index) => {
                return (
                  <Post
                    index={index}
                    data={element}
                    inclike={like}
                    deslike={dislike}
                    commentBox={commentbox}
                    userdata={user.user}
                    reportPost={report}
                    uid={user.user._id}
                  />
                );
              })}

              {posts.length === 0 && <DefaultCard />}

              <div className="d-flex mb-4">
                {pagination.total !== posts.length && (
                  <div
                    className="btn btn-outline-dark mx-auto"
                    onClick={() =>
                      !loadDisable &&
                      setPagination((pre) => ({ ...pre, page: pre.page + 1 }))
                    }
                  >
                    {loadDisable ? 'loading...' : 'Load More'}
                  </div>
                )}
              </div>
            </div>
            {/* ======================================================================= column 3rd ================================================================================================== */}
            <div className="col-md-3 sticky side-height mt-3 ">
              <UserlistWidget
                title={'My Contacts'}
                friendList={user.user.friends.myFriends}
                ifEmpty="You have no friends"
              />
              <UserlistWidget
                title={'Friends Sugesstions'}
                friendList={user.suggestFriend}
                ifEmpty="No Suggestions found"
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" />
    </>
  );
}
