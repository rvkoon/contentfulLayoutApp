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
  sectionIdx: number
  columnIdx: number
}

const ContentModal = ({ isShown, closeModal, sectionIdx, columnIdx }: IContentModal) => {

  const {state, fieldActions, sdk} = React.useContext(FieldContext)
  const [isAddContentOpen, setAddContentOpen] = React.useState(false);

  const renderContent = (content: any, i: number) => {
    if(content.contentType === 'text'){
      return (
        <TextContent
          content={content}
          mode="edit"
          sectionIdx={sectionIdx}
          columnIdx={columnIdx}
          contentIdx={i}
          key={i}
        />
      )
    }else if(content.contentType === 'media'){
      return (
        <MediaContent 
          sectionIdx={sectionIdx}
          columnIdx={columnIdx}
          content={content}
          contentIdx={i}
          mode="edit"
          key={i}
        />
      )
    }
  }

  const addTextContent = () => {
    fieldActions.addColumnContent({sectionIdx, columnIdx, contentType: "text"})
    setAddContentOpen(false)
  }

  const openMediaDialog = async () => {
    try{
      const media = await sdk.dialogs.selectSingleAsset()
      setAddContentOpen(false)
      fieldActions.addColumnContent({sectionIdx, columnIdx, contentType: "media", data: media})
    }catch(e){
      alert("Can't reach contentful API")
    }
  }

  const openNewMediaDialog = async () => {
    try{
      await sdk.navigator.openNewAsset({ slideIn: true })
    }catch(e){
      console.log(e)
    }
  }

  React.useEffect(() => {
    console.log(state.sections[sectionIdx].columns[columnIdx].contents)
  }, [state.sections[sectionIdx].columns[columnIdx].contents])

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
          {state.sections[sectionIdx].columns[columnIdx].contents.map((content:any, i:number) => {
            return renderContent(content, i)
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
                <DropdownListItem onClick={openNewMediaDialog}>
                  Add New Media
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

