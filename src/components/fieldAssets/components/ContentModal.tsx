import React from "react";
import {
  Button,
  Paragraph,
  Modal,
} from "@contentful/forma-36-react-components";
import FieldContext from "../context/context"

interface IContentModal {
  isShown: boolean;
  closeModal: () => void;
  sectionId: any
  columnId: any
}

const ContentModal = ({ isShown, closeModal, sectionId, columnId }: IContentModal) => {

  const {state, fieldActions, sdk} = React.useContext(FieldContext)

  return (
    <Modal
      title="Centered modal"
      isShown={isShown}
      onClose={() => null}
      size="fullWidth"
      position="top"
    >
      {() => (
        <React.Fragment>
          <Modal.Header title="Content" />
          <Modal.Content>
            {/* <Button onClick={() => sdk.space.createAsset({}).then((asset: any) => sdk.navigator.openAsset(asset.sys.id, { slideIn: true }))}></Button> */}
            {Object.values(state.sections[sectionId].columns[columnId].contents).map((content:any) => {
              return (
                <>
                  <Paragraph>{content.data.text}</Paragraph>
                </>
              )
            })}
            <Button onClick={() => fieldActions.addColumnData({sectionId, columnId, content: {text: "Hello World"}})}></Button>
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

