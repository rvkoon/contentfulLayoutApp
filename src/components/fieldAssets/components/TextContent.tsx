import React from "react"
import { Button, DisplayText, Flex, Paragraph, Textarea, ToggleButton } from "@contentful/forma-36-react-components"
import GLOBALS from "../../../common/globals"
import FieldContext from "../context/context"

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
  const {fieldActions} = React.useContext(FieldContext)

  React.useEffect(() => {
    if(mode === "edit"){
      console.log('LA')
      fieldActions.setContentData({
        sectionId,
        columnId,
        contentId,
        data: {
          element,
          color: "#000",
          isBold,
          text
        }
      })
    }
  }, [isBold, element, text])

  const renderText = () => {
    switch(content.data.element){
      case "p":
        return <Paragraph>{content.data.text}</Paragraph>
      case "h1": 
        return <DisplayText size="huge">{content.data.text}</DisplayText>
      case "h2": 
        return <DisplayText size="large">{content.data.text}</DisplayText>
      case "h3": 
        return <DisplayText size="default">{content.data.text}</DisplayText>
      }
    }

    return(
      <>
        {mode === "edit" &&     
          <Flex flexDirection="column" style={{backgroundColor: GLOBALS.colors.lightGray, borderRadius: 12, padding: 10, marginBottom: 20}}>
            <Flex justifyContent="space-between" style={{marginBottom: 10, gap: 20}}>
              <Flex style={{gap: 20}}>
                <ToggleButton.Group>
                  <ToggleButton onToggle={() => setElement("p")} isActive={element === "p"}>p</ToggleButton>
                  <ToggleButton onToggle={() => setElement("h1")} isActive={element === "h1"}>h1</ToggleButton>
                  <ToggleButton onToggle={() => setElement("h2")} isActive={element === "h2"}>h2</ToggleButton>
                  <ToggleButton onToggle={() => setElement("h3")} isActive={element === "h3"}>h3</ToggleButton>
                </ToggleButton.Group>
                <ToggleButton isActive={isBold} onToggle={() => setIsBold(!isBold)}>Bold</ToggleButton>
              </Flex>
              <Button
                buttonType="negative"
                size="small"
                icon="Delete"
                aria-label="Delete"
                onClick={() => fieldActions.deleteContent(sectionId, columnId, content.id)}
              />
            </Flex>
            <Textarea name="someInput" id="someInput" value={text} onChange={e => setText(e.target.value)}/>
          </Flex>
        }
        {mode === "view" && renderText()}
      </>
    )
}

export default TextContent