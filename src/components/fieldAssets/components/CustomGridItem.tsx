import React from "react";
import { GridItem, Button } from "@contentful/forma-36-react-components";
import STYLES from "../../../common/styles";
import ContentModal from "./ContentModal";
import FieldContext from "../context/context"
import TextContent from './TextContent'
import MediaContent from './MediaContent'

interface propsInterface {
  columnSpan: object;
  sectionIdx: number
  columnIdx: number
}

const CustomGridItem = ({ columnSpan, sectionIdx, columnIdx }: propsInterface) => {
  const [isShown, setIsShown] = React.useState(false);
  const [editIsShown, setEditIsShown] = React.useState(false);
  const {state} = React.useContext(FieldContext)

  const closeModal = React.useCallback(() => {
    setIsShown(false);
  }, [setIsShown]);

  const renderContent = (content: any, i: number) => {
    if(content.contentType === 'text'){
      return (
        <TextContent
          content={content}
          mode="view"           
          sectionIdx={sectionIdx}
          columnIdx={columnIdx}
          contentIdx={i}
        />
      )
    }else if(content.contentType === 'media'){
      return (
        <MediaContent 
          sectionIdx={sectionIdx}
          columnIdx={columnIdx}
          contentIdx={i}
          content={content}
          mode="view"
        />
      )
    }
  }

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
        {state.sections[sectionIdx].columns[columnIdx].contents.map((content:any, i:number) => {
          return (
            renderContent(content, i)
          )
        })}
        </div>
    </GridItem>
  );
};

export default CustomGridItem;
