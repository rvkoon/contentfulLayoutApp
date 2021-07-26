import React from "react";
import { GridItem, Button, Paragraph } from "@contentful/forma-36-react-components";
import STYLES from "../../../common/styles";
import ContentModal from "./ContentModal";
import FieldContext from "../context/context"

interface propsInterface {
  columnSpan: object;
  sectionId: any
  columnId: any
}

const CustomGridItem = ({ columnSpan, sectionId, columnId }: propsInterface) => {
  const [isShown, setIsShown] = React.useState(false);
  const [editIsShown, setEditIsShown] = React.useState(false);
  const {state} = React.useContext(FieldContext)

  const closeModal = React.useCallback(() => {
    setIsShown(false);
  }, [setIsShown]);

  return (
    <GridItem style={{ ...columnSpan, minHeight: 300 }}>
      <ContentModal
        isShown={isShown}
        closeModal={closeModal}
        sectionId={sectionId}
        columnId={columnId}
      />
      <div
        style={{ ...STYLES.columnStyle, position: "relative" as "relative" }}
        onMouseEnter={() => setEditIsShown(true)}
        onMouseLeave={() => setEditIsShown(false)}
      >
        {editIsShown && (
          <Button
            onClick={() => setIsShown(true)}
            buttonType="muted"
            icon="Edit"
            aria-label="Edit"
            style={{ ...STYLES.editButton, position: "absolute" as "absolute" }}
          />
        )}
            {Object.values(state.sections[sectionId].columns[columnId].contents).map((content:any) => {
              return (
                <>
                  <Paragraph>{content.data.text}</Paragraph>
                </>
              )
            })}
        </div>
    </GridItem>
  );
};

export default CustomGridItem;
