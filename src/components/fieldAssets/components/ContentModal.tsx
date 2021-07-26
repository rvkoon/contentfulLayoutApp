import React from "react";
import {
  Button,
  Paragraph,
  Modal,
  Dropdown,
  DropdownList,
  DropdownListItem,
  Textarea,
  Flex,
  ToggleButton,
} from "@contentful/forma-36-react-components";
import FieldContext from "../context/context"
import TextContent from './TextContent'

interface IContentModal {
  isShown: boolean;
  closeModal: () => void;
  sectionId: any
  columnId: any
}

const ContentModal = ({ isShown, closeModal, sectionId, columnId }: IContentModal) => {

  const {state, fieldActions, sdk} = React.useContext(FieldContext)
  const [isAddContentOpen, setAddContentOpen] = React.useState(false);

  const renderContent = (content: any) => {
    if(content.contentType === 'text'){
      return (
        <TextContent
          content={content}
          mode="edit"
          sectionId={sectionId}
          columnId={columnId}
          contentId={content.id}
        />
      )
    }
  }

  const addContent = () => {
    fieldActions.addColumnContent({sectionId, columnId, contentType: "text"})
    setAddContentOpen(false)
  }

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
              return renderContent(content)
            })}
            <Dropdown
              isOpen={isAddContentOpen}
              onClose={() => setAddContentOpen(false)}
              usePortal
              position="bottom-left"
              toggleElement={
                <Button
                  size="small"
                  buttonType="muted"
                  indicateDropdown        
                  icon="Plus"
                  aria-label="Add"
                  onClick={() => setAddContentOpen(!isAddContentOpen)}
                >
                  Add content
                </Button>
              }
            >
              <DropdownList>
                <DropdownListItem onClick={addContent}>
                  Add Text Element
                </DropdownListItem>
              </DropdownList>
            </Dropdown>
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

