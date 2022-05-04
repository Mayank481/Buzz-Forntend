import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
export default function Admin() {
  const [post, allPost] = useState([]);
  const [refresh, setRefresh] = useState(0);

    useEffect(() => {

        axios
            .get(`${API_URL}/posts/allPost`)
            .then((res) => {
                allPost(res.data);
              
            })
            .catch((err) => console.log(err.message));

    }, [refresh])
    const delPost = (e, id, post_uid) => {
      
        fetch(`${API_URL}/posts/delReport`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                post_uid: post_uid

            }),
        }).then((r) => {
            setRefresh(refresh + 1)
            console.log(r)
        });

    }
    return (
        <div className='container mt-5'>

            <h1 className='text-center'>Admin Panel</h1>
            <hr></hr>

            <div className="container ">


                <div className=" mb-3">
                    {post.length===0 ? <h4 className="text-center" data-testid="reportedPosts">No any posts</h4>:
                        post.map((element,index)=>{
                            return(
                                <div className="row shadow-lg bg-body g-0 mb-3">
                                <div className="col-md-5">
                               
                                    <p className="card-text">{"post_url" in element ? <img className='reportedPic' src={element.post_url} /> : <img className='reportedPic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png' />}</p>

                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">Reported Post Details</h5>
                                        <hr></hr>
                                      
                                        {"post_caption" in element ? <><p className="card-text text-success  fw-bold">{element.post_caption}</p></> : <><p className="card-text  fw-bold">no caption</p></>}
                                        <p className='text-secondary'>Posted By - {element.posted_by.firstname + " " + element.posted_by.lastname}</p>
                                        <p className='text-danger'>Reported By - {element.reported_by.firstname + " " + element.reported_by.lastname}</p>
                                        
                                         
                                        <button className="btn btn-dark" onClick={(e) => delPost(e, element._id, element.post_uid)}>Delete this post</button>
    
                                    </div>
                                </div>
                            </div>
                            )
                        })
                        }
                      
                    </div>
            </div>

        </div>
      

  );
}
