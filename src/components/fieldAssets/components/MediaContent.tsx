import React from "react"
import { Flex, Paragraph, DisplayText, Button } from "@contentful/forma-36-react-components"
import STYLES from "../../../common/styles"

interface IMediaContentProps {
  content: any
}

const MediaContent = ({content}: IMediaContentProps) => {

  return (
    <div 
      style={{...STYLES.mediaContentEdit}}
    >
      <Flex 
        justifyContent="space-between"
        alignItems="center"
        style={{...STYLES.mediaContentHeader}}
      >
        <div style={{width: "60%"}}>
          <Paragraph
            style={{
              width: "100%",
              wordSpacing: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {content.data.fields.file['en-US'].fileName}
          </Paragraph>
        </div>
        <div>
          <Button
            buttonType="muted"
            size="small"
            icon="Edit"
            aria-label="Edit"
            onClick={() => {}}
            style={{marginRight: 10}}
          />  
          <Button
            buttonType="negative"
            size="small"
            icon="Delete"
            aria-label="Delete"
            onClick={() => {}}
          />
        </div>
      </Flex>
      <Flex justifyContent="center">

        <img src={`https:${content.data.fields.file['en-US'].url}`} alt="" style={{borderRadius: 6, maxHeight: 400, maxWidth: "100%", objectFit: "cover"}}/>
      </Flex>
    </div>
  )
}

export default MediaContent