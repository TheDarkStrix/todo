import { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { staticPosts } from "../constants/constants";
// import Api from "./api";
import CreatePost from "./createPost/createPost";
import style from "./posts.module.css";
const Posts = () => {
  const [postData, setPostData] = useState(staticPosts);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(null);

  const deletePost = (id) => {
    const updatedData = postData.filter((item) => item.id !== id);
    if (updatedData) {
      setPostData(updatedData);
    }
  };

  const editExistingPost = (post) => {
    console.log(post);
    let editedPost = postData;
    const index = postData.findIndex((x) => x.id === post.id);
    editedPost[index] = post;
    console.log(editedPost);
    setPostData(editedPost);
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
    let temp = postData;
    let newDate = new Date();
    const post = {
      title: title,
      desc: description,
      date: `${newDate.getDate()} ${newDate.toLocaleString("en", {
        month: "long",
      })}, ${newDate.getFullYear()}`,
      id: postData.length + 1,
    };
    temp.push(post);
    setPostData(temp);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end w-100 my-4">
        <Button color="primary" onClick={() => createPost()}>
          Create Post
        </Button>
      </div>
      <Row>
        {postData.map((post) => (
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
              <div className={style.editButton} onClick={() => editPost(post)}>
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
