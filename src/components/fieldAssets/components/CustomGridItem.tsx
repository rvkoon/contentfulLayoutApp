import React from "react";
import { GridItem, Button, Paragraph } from "@contentful/forma-36-react-components";
import STYLES from "../../../common/styles";
import ContentModal from "./ContentModal";
import FieldContext from "../context/context"

interface propsInterface {
  columnSpan: object;
  sectionIdx: any
  columnIdx: any
}

const CustomGridItem = ({ columnSpan, sectionIdx, columnIdx }: propsInterface) => {
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
        sectionIdx={sectionIdx}
        columnIdx={columnIdx}
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
        {state.sections[sectionIdx].columns[columnIdx].data.map((d:any) => {
          return (
            <Paragraph>{JSON.stringify(d)}</Paragraph>
          )
        })}
        </div>
    </GridItem>
  );
};

export default CustomGridItem;
