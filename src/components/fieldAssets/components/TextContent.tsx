import React from "react"
import { Button, DisplayText, Flex, Paragraph, Textarea, ToggleButton, Icon } from "@contentful/forma-36-react-components"
import GLOBALS from "../../../common/globals"
import FieldContext from "../context/context"
import left from "../images/alignIcons/left.svg"
import center from "../images/alignIcons/center.svg"
import right from "../images/alignIcons/right.svg"
import STYLES from "../../../common/styles";

interface ITextContentProps {
  sectionIdx: number
  columnIdx:number
  contentIdx: number
  content: any
  mode: string
}

const TextContent = ({sectionIdx, columnIdx, contentIdx, content, mode}: ITextContentProps) => {

  const [isBold, setIsBold] = React.useState(content.data.isBold)
  const [element, setElement] = React.useState(content.data.element)
  const [text, setText] = React.useState(content.data.text)
  const [color, setColor] = React.useState(content.data.color)
  const [align, setAlign] = React.useState(content.data.align)
  const {state, fieldActions} = React.useContext(FieldContext)
  const textRef = React.useRef<null | HTMLTextAreaElement>(null)
  const contentsLen = state.sections[sectionIdx].columns[columnIdx].contents.length

  React.useEffect(() => {
    if(mode === "edit"){
      fieldActions.setContentData({
        sectionIdx,
        columnIdx,
        contentIdx,
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

  React.useEffect(() => {
    setIsBold(content.data.isBold)
    setElement(content.data.element)
    setText(content.data.text)
    setColor(content.data.color)
    setAlign(content.data.align)
  }, [content])

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

    const renderSizeByElementType = () => {
      switch(element){
        case 'p': return 16
        case 'h1': return 40
        case 'h2': return 30
        case 'h3': return 24
      }
    }

    return(
      <>
        {mode === "edit" &&
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
          <Flex flexDirection="column" style={{backgroundColor: GLOBALS.colors.lightGray, border: `solid 1px ${GLOBALS.colors.gray}`, borderRadius: '12px 0 12px 12px', padding: 10, marginBottom: 60}}>
            <Flex alignItems={'center'} justifyContent="space-between" style={{marginBottom: 10, gap: 20}}>
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
                    icon={"Heading"}
                    color="muted"
                    size="small"
                  />
                </ToggleButton>
                <ToggleButton onToggle={() => setElement("h2")} isActive={element === "h2"}>
                  <Icon
                    icon={"HeadingOne"}
                    color="muted"
                    size="small"
                  />
                </ToggleButton>
                <ToggleButton onToggle={() => setElement("h3")} isActive={element === "h3"}>
                  <Icon
                    icon={"HeadingTwo"}
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
              <Flex style={{gap: 5}}>
                <Button style={{border: 'none' , display: "block", borderRadius: '50%', width: 26, height: 26, backgroundColor: state.siteConfig.primaryColor}} onClick={() => setColor(state.siteConfig.primaryColor)}/>
                <Button style={{border: 'none' , display: "block", borderRadius: '50%', width: 26, height: 26, backgroundColor: state.siteConfig.primaryColorDark}} onClick={() => setColor(state.siteConfig.primaryColorDark)}/>
                <Button style={{border: 'none' , display: "block", borderRadius: '50%', width: 26, height: 26, backgroundColor: state.siteConfig.secondaryColor}} onClick={() => setColor(state.siteConfig.secondaryColor)}/>
              </Flex>
              <input type="color" onChange={e => setColor(e.target.value)} value={color} style={{height: 31, borderRadius: 6, backgroundColor: "#fff", border: `solid 1px ${GLOBALS.colors.grayDarker}`, cursor: 'pointer'}}/>
            </Flex>
            <Textarea
              name="someInput"
              id="someInput"
              value={text}
              onChange={e => setText(e.target.value)}
              textareaRef={textRef} onKeyDown={e => adjustTextareaHeight(e.target)}
              //@ts-ignore
              style={{
                fontWeight: isBold && 900,
                color: color ? color : '#000',
                fontSize: renderSizeByElementType(),
                textAlign: align && align
              }}
            />
          </Flex>
        </>
        }
        {mode === "view" && renderText()}
      </>
    )
}

export default TextContent