import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { useState, useEffect } from "react";

const CreatePost = ({ modal, toggle, updatePost, editProps, editPost }) => {
  const [title, setTitle] = useState(editProps ? editProps.title : "");
  const [description, setDescription] = useState(
    editProps ? editProps.desc : ""
  );

  const sendData = () => {
    let newDate = new Date();
    if (editProps) {
      console.log(editProps.desc, description);
      editPost({
        title,
        desc: description,
        id: editProps.id,

        date: `${newDate.getDate()} ${newDate.toLocaleString("en", {
          month: "long",
        })}, ${newDate.getFullYear()}`,
      });
    } else {
      updatePost(title, description);
    }
    toggle();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="mb-4">
              <Label for="exampleEmail">Title</Label>
              <Input
                type="title"
                name="title"
                id="title"
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label for="exampleText">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => sendData()}>
            {editProps ? "Edit Post" : "Create Post"}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreatePost;
