import React from "react"
import { GridItem, Button, Modal } from '@contentful/forma-36-react-components';
import STYLES from "../../../common/styles"

interface propsInterface {
  sectionSpan: object
}

const CustomGridItem = ({
  sectionSpan
}: propsInterface) => {

  const [isShown, setIsShown] = React.useState(false)
  const [editIsShown, setEditIsShown] = React.useState(false)

  return(
    <GridItem style={{...sectionSpan, minHeight: 150}}>
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
      <div style={{...STYLES.columnStyle, position: "relative" as "relative"}} onMouseEnter={() => setEditIsShown(true)} onMouseLeave={() => setEditIsShown(false)}>
        {editIsShown && <Button onClick={() => setIsShown(true)} buttonType="muted" icon="Edit" aria-label="Edit" style={{...STYLES.editButton, position: "absolute" as "absolute"}}/>}
      </div>
    </GridItem>
  )
}

export default CustomGridItem