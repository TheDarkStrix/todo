import { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { staticPosts } from "../constants/constants";
import style from "./posts.module.css";
const Posts = () => {
  const [postData, setPostData] = useState(staticPosts);

  const deletePost = (id) => {
    const updatedData = postData.filter((item) => item.id !== id);
    if (updatedData) {
      setPostData(updatedData);
    }
  };

  return (
    <div className="container">
      <Row>
        {postData.map((post) => (
          <Col md={3} key={post.id}>
            <div className={style.cardContainer}>
              <div className={style.card}>
                <div className={style.date}>{post.date}</div>
                <div>
                  <ul className={style.list}>
                    <li className={style.title}>{post.title}</li>
                  </ul>
                </div>
                <div className={style.desc}>{post.desc}</div>
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
    </div>
  );
};

export default Posts;
