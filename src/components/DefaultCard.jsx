import React from "react";

export default function DefaultCard() {
  return (
    <>      
      <div className="card p-3 mb-3 shadow p-3 mb-5 bg-body rounded border-0">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <img
              src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              className="card-img-top small-round-pic  round-img"
              alt="..."
            />

            <div className="ms-2 fw-bold">Buzz Team</div>
          </div>

          {/* ========================================================Report System============================================================================== */}
          <div className="pointer">
            <i
              className="fa-solid fa-ellipsis "
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            ></i>
          </div>
          {/* ========================================================Report System============================================================================== */}
        </div>
        <div className="ms-2 mb-2"></div>
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80"
          className="card-img-top rounded-3"
          alt="..."
        />

        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex">
            <div className="me-2">
              <i className="fa-solid fa-thumbs-up bg-primary round-img text-white p-1 me-2"></i>
              0
            </div>
            <div>
              <i className="fa-solid fa-thumbs-down bg-primary round-img text-white p-1 me-2"></i>
              0
            </div>
          </div>
          <div className="me-1">0 comments</div>
        </div>

        <div className="d-flex justify-content-between mt-3 border-top border-bottom p-2">
          <div className="pointer">
            <i className="fa-regular fa-thumbs-up me-2"></i>Like
          </div>
          <div className="pointer">
            <i className="fa-regular fa-thumbs-down me-2"></i>Dislike
          </div>
          <div className="pointer">
            <i className="fa-regular fa-message me-2"></i>Comment
          </div>
        </div>
      </div>
    </>
  );
}
