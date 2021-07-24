import React from "react"
import { GridItem, Button, Modal } from '@contentful/forma-36-react-components';
import { RichTextEditor } from '@contentful/field-editor-rich-text';

interface propsInterface {
  sectionSpan: object
}

const CustomGridItem = ({
  sectionSpan
}: propsInterface) => {

  const [isShown, setIsShown] = React.useState(false)

  return(
    <GridItem style={{...sectionSpan, backgroundColor: "red", minHeight: 150}}>
    <Modal title="Centered modal" isShown={isShown} onClose={() => null}>
      {() => (
        <React.Fragment>
          <Modal.Header title="Title" />
          <Modal.Content>Hello from controlled modal window</Modal.Content>
          <Modal.Controls>
            <Button buttonType="positive" onClick={() => setIsShown(false)}>
              Confirm
            </Button>
            <Button buttonType="muted" onClick={() => setIsShown(false)}>
              Close
            </Button>
          </Modal.Controls>
        </React.Fragment>
      )}
    </Modal>
    <button onClick={() => setIsShown(true)}>
      openModal
    </button>
  </GridItem>
  )
}

export default CustomGridItem