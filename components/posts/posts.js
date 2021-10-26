import { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { staticPosts } from "../constants/constants";
// import Api from "./api";
import CreatePost from "./createPost/createPost";
import style from "./posts.module.css";

import { db } from "../../firebase";
import {
  push,
  ref,
  set,
  get,
  onValue,
  child,
  update,
  remove,
} from "firebase/database";

const Posts = () => {
  const [postData, setPostData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(null);

  const deletePost = async (id) => {
    await remove(ref(db, "todo/" + id));
  };

  const editExistingPost = (post) => {
    update(ref(db, "todo" + `/${post.id}`), post);
  };

  const createPost = () => {
    console.log(openModal);
    if (openModal && editModal) {
      setEditModal(null);
    }
    setOpenModal((prev) => !prev);
  };

  const editPost = (post) => {
    setEditModal(post);
    createPost();
  };

  const createPostFromModal = (title, description) => {
    const newPostKey = push(child(ref(db), "todo")).key;
    let newDate = new Date();
    const post = {
      title: title,
      desc: description,
      id: newPostKey,
      date: `${newDate.getDate()} ${newDate.toLocaleString("en", {
        month: "long",
      })}, ${newDate.getFullYear()}`,
    };

    update(ref(db, "todo" + `/${post.id}`), post);
  };

  useEffect(() => {
    onValue(ref(db, "todo"), (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        setPostData(Object.values(data));
      } else {
        console.log("data", data);
        setPostData([]);
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-end w-100 my-4">
        <Button color="primary" onClick={() => createPost()}>
          Create Post
        </Button>
      </div>

      {!postData ? (
        <div>Loading ...</div>
      ) : postData && postData.length > 0 ? (
        <Row>
          {postData &&
            postData.map((post) => (
              <Col md={3} key={post.id}>
                <div className={style.cardContainer}>
                  <div className={style.card}>
                    {"ID " + post.id}
                    <div className={style.date}>{post.date}</div>
                    <div>
                      <ul className={style.list}>
                        <li className={style.title}>{post.title}</li>
                      </ul>
                    </div>
                    <div className={style.desc}>{post.desc}</div>
                  </div>
                  <div
                    className={style.editButton}
                    onClick={() => editPost(post)}
                  >
                    <img
                      src="/edit.svg"
                      alt="edit_icon"
                      className={style.editIcon}
                    />
                  </div>
                  <div
                    className={style.deleteButton}
                    onClick={() => deletePost(post.id)}
                  >
                    <img
                      src="/delete.svg"
                      alt="delete_icon"
                      className={style.deleteIcon}
                    />
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      ) : (
        "No Posts"
      )}
      {openModal ? (
        editModal ? (
          <CreatePost
            modal={openModal}
            toggle={createPost}
            updatePost={createPostFromModal}
            editProps={editModal}
            editPost={editExistingPost}
          />
        ) : (
          <CreatePost
            modal={openModal}
            toggle={createPost}
            updatePost={createPostFromModal}
          />
        )
      ) : (
        <></>
      )}
      {/* <Api /> */}
    </div>
  );
};

export default Posts;
