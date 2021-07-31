import React from "react"
import { Button, DisplayText, Flex, Paragraph, Textarea, ToggleButton, Icon } from "@contentful/forma-36-react-components"
import GLOBALS from "../../../common/globals"
import FieldContext from "../context/context"
import left from "../images/alignIcons/left.svg"
import center from "../images/alignIcons/center.svg"
import right from "../images/alignIcons/right.svg"

interface ITextContentProps {
  sectionId: any
  columnId:any
  contentId: any
  content: any
  mode: string
}

const TextContent = ({sectionId, columnId, contentId, content, mode}: ITextContentProps) => {

  const [isBold, setIsBold] = React.useState(content.data.isBold)
  const [element, setElement] = React.useState(content.data.element)
  const [text, setText] = React.useState(content.data.text)
  const [color, setColor] = React.useState(content.data.color)
  const [align, setAlign] = React.useState(content.data.align)
  const {fieldActions} = React.useContext(FieldContext)
  const textRef = React.useRef<null | HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if(mode === "edit"){
      fieldActions.setContentData({
        sectionId,
        columnId,
        contentId,
        data: {
          element,
          color,
          isBold,
          text,
          align
        }
      })
    }
  }, [isBold, element, text, color, align])

  const adjustTextareaHeight = (target: EventTarget) => {
    //@ts-ignore
    target.style.height = 0
    //@ts-ignore
    target.style.height = `${target.scrollHeight}px`
  }

  React.useEffect(() => {
    if(textRef.current){
      adjustTextareaHeight(textRef.current)

    }
  }, [textRef])

  const renderText = () => {
    switch(content.data.element){
      case "p":
        return (
          <Paragraph 
            style={{
              marginBottom: 20,
              color: content.data.color,
              fontWeight: content.data.isBold ? 900 : 400,
              textAlign: content.data.align
            }}
          >
            {content.data.text}
          </Paragraph>
        )
      case "h1": 
        return (
          <DisplayText
            size="huge" 
            style={{
              marginBottom: 20,
              color: content.data.color,
              fontWeight: content.data.isBold ? 900 : 400,
              textAlign: content.data.align
            }} 
          >
            {content.data.text}
          </DisplayText>
        )
      case "h2": 
        return (
          <DisplayText
            size="large"
            style={{
              marginBottom: 20,
              color: content.data.color,
              fontWeight: content.data.isBold ? 900 : 400,
              textAlign: content.data.align
            }} 
          >
            {content.data.text}
          </DisplayText>
        )
      case "h3": 
        return (
          <DisplayText
            size="default"
            style={{
              marginBottom: 20,
              color: content.data.color,
              fontWeight: content.data.isBold ? 900 : 400,
              textAlign: content.data.align
            }} 
          >{content.data.text}</DisplayText>
        )
      }
    }

    return(
      <>
        {mode === "edit" &&     
          <Flex flexDirection="column" style={{backgroundColor: GLOBALS.colors.lightGray, borderRadius: 12, padding: 10, marginBottom: 20}}>
            <Flex justifyContent="space-between" style={{marginBottom: 10, gap: 20}}>
              <Flex style={{gap: 20}}>
                <ToggleButton.Group>
                  <ToggleButton onToggle={() => setElement("p")} isActive={element === "p"}>
                    <Icon
                      icon={"Text"}
                      color="muted"
                      size="small"
                    />
                  </ToggleButton>
                  <ToggleButton onToggle={() => setElement("h1")} isActive={element === "h1"}>
                    <Icon
                      icon={"HeadingOne"}
                      color="muted"
                      size="small"
                    />
                  </ToggleButton>
                  <ToggleButton onToggle={() => setElement("h2")} isActive={element === "h2"}>
                    <Icon
                      icon={"HeadingTwo"}
                      color="muted"
                      size="small"
                    />
                  </ToggleButton>
                  <ToggleButton onToggle={() => setElement("h3")} isActive={element === "h3"}>
                    <Icon
                      icon={"Heading"}
                      color="muted"
                      size="small"
                    />
                  </ToggleButton>
                </ToggleButton.Group>
                <ToggleButton isActive={isBold} onToggle={() => setIsBold(!isBold)}>
                  <Icon
                      icon={"FormatBold"}
                      color="muted"
                      size="small"
                    />
                </ToggleButton>
                <input type="color" onChange={e => setColor(e.target.value)} value={color} style={{height: 31, borderRadius: 6, backgroundColor: "#fff", border: `solid 1px ${GLOBALS.colors.grayDarker}`}}/>
                <ToggleButton.Group>
                  <ToggleButton onToggle={() => setAlign("left")} isActive={align === "left"}>
                    <img src={left} height="12"/>
                  </ToggleButton>
                  <ToggleButton onToggle={() => setAlign("center")} isActive={align === "center"}>
                    <img src={center} height="12"/>
                  </ToggleButton>
                  <ToggleButton onToggle={() => setAlign("right")} isActive={align === "right"}>
                    <img src={right} height="12"/>
                  </ToggleButton>
                </ToggleButton.Group>
              </Flex>
              <Button
                buttonType="negative"
                size="small"
                icon="Delete"
                aria-label="Delete"
                onClick={() => fieldActions.deleteContent(sectionId, columnId, content.id)}
              />
            </Flex>
            <Textarea name="someInput" id="someInput" value={text} onChange={e => setText(e.target.value)} textareaRef={textRef} onKeyDown={e => adjustTextareaHeight(e.target)}/>
          </Flex>
        }
        {mode === "view" && renderText()}
      </>
    )
}

export default TextContent