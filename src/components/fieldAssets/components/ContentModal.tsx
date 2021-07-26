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
  sectionIdx: any
  columnIdx: any
}

const ContentModal = ({ isShown, closeModal, sectionIdx, columnIdx }: IContentModal) => {

  const {state, fieldActions, sdk} = React.useContext(FieldContext)

  console.log(state)

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
            {state.sections[sectionIdx].columns[columnIdx].data.map((d:any) => {
              return (
                <Paragraph>{JSON.stringify(d)}</Paragraph>
              )
            })}
            <Button onClick={() => fieldActions.addColumnData(sectionIdx, columnIdx, {text: "Hello World"})}></Button>
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

