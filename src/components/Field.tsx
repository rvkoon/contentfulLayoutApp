import React from 'react';
import { Grid, GridItem, Button, Flex } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import STYLES from "../common/styles"
import CustomGridItem from './fieldAssets/components/CustomGridItem'
import sectionsReducer from "./fieldAssets/reducer/fieldReducer"
import useField from "./fieldAssets/hooks/useField.hook"

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const initialState= {
  sections: []
}

const Field = ({sdk}: FieldProps) => {

  const [state, dispatch] = React.useReducer(sectionsReducer, initialState)
  const {addSection, deleteSection, setSectionDisplayType} = useField(dispatch)

  React.useEffect(() => {
    if(sdk.field.getValue() !== undefined){
      dispatch({type: 'setStateFromAPI', payload: sdk.field.getValue()})
    }
    console.log(`FIRST PRINT STATE => ${state}`)
    sdk.window.startAutoResizer()
  }, [])

  React.useEffect(() => {
    sdk.field.setValue(state)
  }, [state])


  return (
    <>
    {(state && state.sections && state.sections.length) && state.sections.map((section: any, i: number) => (
      <>
        <Flex style={{...STYLES.gridActions}} justifyContent="space-between">
          <div>
            {
              section.displayType ? 
              `Section ${i+1}` :
              <>
                <Button buttonType="muted" size="small" style={{width: 100, marginRight: 10}} onClick={() => setSectionDisplayType("oneCol", section.id)}>1 Col</Button>
                <Button buttonType="muted" size="small" style={{width: 100, marginRight: 10}} onClick={() => setSectionDisplayType("fiftyFifty", section.id)}>50/50</Button>
                <Button buttonType="muted" size="small" style={{width: 100, marginRight: 10}} onClick={() => setSectionDisplayType("oneThirdTwoThirds", section.id)}>1/3 - 2/3</Button>
                <Button buttonType="muted" size="small" style={{width: 100, marginRight: 10}} onClick={() => setSectionDisplayType("twoThirdsOneThird", section.id)}>2/3 - 1/3</Button>
                <Button buttonType="muted" size="small" style={{width: 100, marginRight: 10}} onClick={() => setSectionDisplayType("threeCols", section.id)}>3 Cols</Button>
              </>
            }
          </div>
          <Button 
            buttonType="negative"
            size="small" 
            icon="Delete"
            aria-label="Delete"
            onClick={() => deleteSection(section.id)}
          />
        </Flex>
        <Grid 
          style={{...STYLES.gridWrapper, minHeight: 150}}
          columns={"1fr 1fr 1fr 1fr 1fr 1fr"} 
          rowGap="spacingS" 
          columnGap="spacingS" 
        >
          {section.columns && section.columns.map((column: any) => {
            return <CustomGridItem sectionSpan={column.style} />
          })
          }
        </Grid>
      </>
    ))}
    <Button onClick={addSection} buttonType="muted" isFullWidth={true} icon="Plus" aria-label="Add" />
    </>
  );
};

export default Field;
