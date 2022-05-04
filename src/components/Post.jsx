import React, { useState, useRef } from 'react';
import  Comment from './Comment';

export default function Post({
  index,
  data,
  inclike,
  deslike,
  commentBox,
  userdata,
  reportPost,
  uid,
}) {
  let { post_url, _id, like, dislike, comment, post_caption } = data;
  let { firstname, lastname, picture_url } = data.posted_by;
  const [commentmessage, setcommentmessage] = useState();

  const commentInput = useRef(null);

  let toggle = true;

  const oninputchange = (e) => {
    setcommentmessage({ ...commentmessage, [e.target.name]: e.target.value });
  };
  const openCommentBox = (e, index) => {
    const box = document.getElementById(index);

    if (toggle) {
      box.style.display = 'block';
      toggle = false;
    } else {
      box.style.display = 'none';
      toggle = true;
    }
  };

  return (
    <>
      <div
        key={index}
        className="card p-3 mb-3 shadow p-3  bg-body rounded border-0"
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            {picture_url ? (
              <img
                src={picture_url}
                className="card-img-top small-round-pic  round-img"
                alt="..."
              />
            ) : (
              <i
                className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img text-success d-flex justify-content-center align-items-center"
                style={{ backgroundColor: '#F0F2F5' }}
              ></i>
            )}

            <div className="ms-2 fw-bold" data-testid="whoPosted">{firstname + ' ' + lastname}</div>
          </div>

          {/* ========================================================Report System============================================================================== */}
          <div className="pointer">
            <i
              className="fa-solid fa-ellipsis "
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            ></i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <div
                  className="dropdown-item"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    reportPost(data);
                  }}
                >
                  Report
                </div>
              </li>
            </ul>
          </div>
          {/* ========================================================Report System============================================================================== */}
        </div>
        <div className="ms-2 mb-2">{post_caption}</div>
        {'post_url' in data ? (
          <img src={post_url} className="card-img-top rounded-3" alt="..." />
        ) : (
          ''
        )}

        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex">
            <div className="me-2">
              <i className="fa-solid fa-thumbs-up bg-primary round-img text-white p-1 me-2"></i>
              {like.length}
            </div>
            <div>
              <i className="fa-solid fa-thumbs-down bg-danger round-img text-white p-1 me-2"></i>
              {dislike.length}
            </div>
          </div>
          <div className="me-1">{comment.length} comments</div>
        </div>

        <div className="d-flex justify-content-between mt-3 border-top border-bottom p-2">
          <div
            className="pointer"
            onClick={() => {
              inclike(_id);
            }}
          >
            {data.like.includes(uid) ? (
              <>
                <i className="fa-regular text-primary fa-thumbs-up me-2"></i>
                Unlike
              </>
            ) : (
              <>
                <i className="fa-regular fa-thumbs-up me-2"></i>Like
              </>
            )}
          </div>
          <div
            className="pointer"
            onClick={() => {
              deslike(_id);
            }}
          >
            {data.dislike.includes(uid) ? (
              <>
                {' '}
                <i className="fa-regular text-danger fa-thumbs-down me-2"></i>
                Disliked
              </>
            ) : (
              <>
                <i className="fa-regular fa-thumbs-down me-2"></i>Dislike
              </>
            )}
          </div>
          <div
            onClick={(e) => {
              openCommentBox(e, index);
            }}
            className="pointer"
          >
            <i className="fa-regular fa-message me-2"></i>Comment
          </div>
        </div>

        {/* ================================================================Commnet section================================================================== */}
        <div  id={index}  style={{ display: 'none' }}>
          <div className=" mt-3 ">
            <div className="d-flex">
              {userdata.picture_url ? (
                <div className="d-flex align-items-center">
                  <img
                    src={userdata.picture_url}
                    className="card-img-top small-round-pic   round-img"
                    alt="..."
                  />
                </div>
              ) : (
                <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
              )}
              <div className="form-control d-flex align-items-center border-0 ">
                <input
                  type="text"
                  className="form-control  rounded-pill  p-2"
                  ref={commentInput}
                  placeholder="Write a comment..."
                  onChange={(e) => oninputchange(e)}
                  name="message"
                />
              </div>
              <div
                onClick={() => {
                  commentBox(
                    _id,
                    commentmessage,
                    commentInput,
                    setcommentmessage
                  );
                }}
                className="d-flex align-items-center pointer justify-content-center  rounded-circle border border-success p-2  "
              >
                {' '}
                <i className="fa-solid fa-2x fa-paper-plane text-success circle p-2"></i>
              </div>
            </div>
          </div>
          {comment.map((data) => {
            return <Comment data={data} />;
          })}
        </div>
      </div>
    </>
  );
}
