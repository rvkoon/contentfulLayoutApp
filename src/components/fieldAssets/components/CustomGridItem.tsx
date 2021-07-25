import React from "react";
import { GridItem, Button } from "@contentful/forma-36-react-components";
import STYLES from "../../../common/styles";
import ContentModal from "./ContentModal";

interface propsInterface {
  sectionSpan: object;
  sdk: any;
}

const CustomGridItem = ({ sectionSpan, sdk }: propsInterface) => {
  const [isShown, setIsShown] = React.useState(false);
  const [editIsShown, setEditIsShown] = React.useState(false);

  const closeModal = () => {
    setIsShown(false);
  };

  return (
    <GridItem style={{ ...sectionSpan, minHeight: 300 }}>
      <ContentModal
        isShown={isShown}
        closeModal={closeModal}
        data={{}}
        sdk={sdk}
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
      </div>
    </GridItem>
  );
};

export default CustomGridItem;
