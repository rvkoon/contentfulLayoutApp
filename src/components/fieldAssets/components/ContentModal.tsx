import React from "react";
import {
  Button,
  Modal,
  Dropdown,
  DropdownList,
  DropdownListItem
} from "@contentful/forma-36-react-components";
import FieldContext from "../context/context"
import TextContent from './TextContent'
import MediaContent from './MediaContent'

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
    }else if(content.contentType === 'media'){
      return (
        <MediaContent 
          sectionId={sectionId}
          columnId={columnId}
          content={content}
          mode="edit"
        />
      )
    }
  }

  const addTextContent = () => {
    fieldActions.addColumnContent({sectionId, columnId, contentType: "text"})
    setAddContentOpen(false)
  }

  const openMediaDialog = async () => {
    try{
      const media = await sdk.dialogs.selectSingleAsset()
      fieldActions.addColumnContent({sectionId, columnId, contentType: "media", data: media})
    }catch(e){
      alert("Can't reach contentful API")
    }
    
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
                <DropdownListItem onClick={addTextContent}>
                  Add Text Element
                </DropdownListItem>
                <DropdownListItem onClick={openMediaDialog}>
                  Add Existing Media
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

