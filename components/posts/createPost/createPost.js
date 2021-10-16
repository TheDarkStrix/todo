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
import { useState } from "react";

const CreatePost = ({ modal, toggle, updatePost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const sendData = () => {
    updatePost(title, description);
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
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label for="exampleText">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => sendData()}>
            Create Post
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
