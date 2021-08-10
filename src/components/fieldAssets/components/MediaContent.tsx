import React from "react"
import { Flex, Paragraph, Button } from "@contentful/forma-36-react-components"
import STYLES from "../../../common/styles"
import FieldContext from "../context/context"

interface IMediaContentProps {
  sectionIdx: number
  columnIdx: number
  contentIdx: number
  content: any
  mode: string
}

const MediaContent = ({sectionIdx, columnIdx, contentIdx, content, mode}: IMediaContentProps) => {

  const {fieldActions} = React.useContext(FieldContext)

  if(mode === 'edit'){
    return (
      <div 
        style={{...STYLES.mediaContentEdit}}
      >
        <Flex 
          justifyContent="space-between"
          alignItems="center"
          style={{...STYLES.mediaContentHeader}}
        >
          <Flex 
            alignItems="center"
            style={{width: "60%"}}
          >
            <Paragraph
              style={{
                maxWidth: "70%",
                wordSpacing: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginRight: 10
              }}
            >
              {content.data.fields.file['en-US'].fileName}
            </Paragraph>
          </Flex>
          <div>
            <Button
              buttonType="negative"
              size="small"
              icon="Delete"
              aria-label="Delete"
              onClick={() => fieldActions.deleteContent(sectionIdx, columnIdx, contentIdx)}
            />
          </div>
        </Flex>
        <Flex justifyContent="center">
  
          <img src={`https:${content.data.fields.file['en-US'].url}`} alt="" style={{borderRadius: 6, maxHeight: 400, maxWidth: "100%", objectFit: "cover"}}/>
        </Flex>
      </div>
    )
  }else if(mode === "view"){
    return(
      <img src={`https:${content.data.fields.file['en-US'].url}`} alt="" style={{borderRadius: 6, minWidth: "100%", maxWidth: "100%", objectFit: "cover", marginBottom: 20}}/>
    )
  }

  return(<div></div>)
}

export default MediaContent