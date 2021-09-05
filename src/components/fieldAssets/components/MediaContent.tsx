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

  const {state, fieldActions} = React.useContext(FieldContext)
  const contentsLen = state.sections[sectionIdx].columns[columnIdx].contents.length

  if(mode === 'edit'){
    return (
      <>
        <Flex justifyContent={'flex-end'}  style={{}}>
          {contentIdx > 0 &&
            <Button
              buttonType="muted"
              size="small"
              icon="ArrowUp"
              aria-label="Delete"
              onClick={() => fieldActions.changeContentOrder(sectionIdx, columnIdx, contentIdx, 'up')}
              style={{ borderRadius: '6px 6px 0 0', borderBottom: 0, position: 'relative', bottom: -1, boxShadow: 'none', marginLeft: 10}}
            />
          }
          {contentIdx < (contentsLen - 1) && 
            <Button
              buttonType="muted"
              size="small"
              icon="ArrowDown"
              aria-label="Delete"
              onClick={() => fieldActions.changeContentOrder(sectionIdx, columnIdx, contentIdx, 'down')}
              style={{ borderRadius: '6px 6px 0 0', borderBottom: 0, position: 'relative', bottom: -1, boxShadow: 'none', marginLeft: 10}}
            />
          }
          <Button
            buttonType="negative"
            size="small"
            icon="Delete"
            aria-label="Delete"
            onClick={() => fieldActions.deleteContent(sectionIdx, columnIdx, contentIdx)}
            style={{borderRadius: '6px 6px 0 0', borderBottom: 0 , position: 'relative', bottom: -1, boxShadow: 'none', marginLeft: 10}}
          />
        </Flex>
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
              <b>
              {content.data.fields.file['en-US'].fileName}
              </b>
            </Paragraph>
          </Flex>
        </Flex>
        <Flex justifyContent="center">
  
          <img src={`https:${content.data.fields.file['en-US'].url}`} alt="" style={{borderRadius: 6, maxHeight: 400, maxWidth: "100%", objectFit: "cover"}}/>
        </Flex>
      </div>
      </>
    )
  }else if(mode === "view"){
    return(
      <img src={`https:${content.data.fields.file['en-US'].url}`} alt="" style={{borderRadius: 6, minWidth: "100%", maxWidth: "100%", objectFit: "cover", marginBottom: 20}}/>
    )
  }

  return(<div></div>)
}

export default MediaContent