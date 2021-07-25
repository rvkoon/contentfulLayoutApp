import React from "react";
import {
  Button,
  Modal,
  Form,
  FieldGroup,
  TextField,
} from "@contentful/forma-36-react-components";
import { RichTextEditor } from "@contentful/field-editor-rich-text";

interface IContentModal {
  isShown: boolean;
  closeModal: () => void;
  data: object;
  sdk: any;
}

const ContentModal = ({ isShown, closeModal, data, sdk }: IContentModal) => {
  return (
    <Modal
      title="Centered modal"
      isShown={isShown}
      onClose={() => null}
      size="fullWidth"
    >
      {() => (
        <React.Fragment>
          <Modal.Header title="Content" />
          <Modal.Content>
            <Form>
              <RichTextEditor sdk={sdk} />
              {/* <FieldGroup>
                <TextField
                  id="titleInput"
                  name="titleInput"
                  labelText="Title"
                />
              </FieldGroup>
              <TextField
                id="subTitleInput"
                name="subTitleInput"
                labelText="subTitleInput"
              /> */}
            </Form>
          </Modal.Content>
          <Modal.Controls position="right">
            <Button buttonType="primary" onClick={closeModal}>
              Validate
            </Button>
          </Modal.Controls>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default ContentModal;
