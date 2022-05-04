import React, { useState } from 'react'

export default function Comment({data}) {
    const [loadmore, setloadmore] = useState(true);
    return (
      <>
        <div className="d-flex container bg-light mt-1 align-items-center">
          <div className="">
            {data.picture_url ? (
              <div className="">
                <img
                  data-testid='userCommentPic'
                  src={data.picture_url}
                  className=" mt-2 small-round-pic me-2  round-img "
                  alt="..."
                />
              </div>
            ) : (
              <i className="mt-2 me-2 fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
            )}
          </div>
          <div data-testid='cmnt' className={loadmore && 'text-comment'}>{data.message}</div>
        </div>
        <div
          className="seemore"
          onClick={() => {
            setloadmore((p) => !p);
          }}
        >
          {loadmore ? 'Show More' : 'Show less'}
        </div>
      </>
    );
}
