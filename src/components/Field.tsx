import React from "react";
import {
  Grid,
  Button,
  Flex,
  Paragraph,
} from "@contentful/forma-36-react-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import STYLES from "../common/styles";
import CustomGridItem from "./fieldAssets/components/CustomGridItem";
import {curriedReducerFunction} from "./fieldAssets/reducer/fieldReducer";
import useField from "./fieldAssets/hooks/useField.hook";
import FieldContext from "./fieldAssets/context/context"

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const initialState = {
  sections: [],
  siteConfig: {}
};

const Field = ({ sdk }: FieldProps) => {

  const [state, dispatch] = React.useReducer(curriedReducerFunction, initialState);
  const { ...fieldActions } = useField(dispatch);
  const sectionsLen = state.sections.length

  React.useEffect(() => {
    if (sdk.field.getValue() !== undefined) {
      fieldActions.setStateFromAPI(sdk.field.getValue());
    }
    sdk.space.getEntry("Tp3zkjjR9r709Zpvshwf7").then((res: any) => {
      fieldActions.setSiteConfig({primaryColor: res.fields.primaryColor['en-US'], primaryColorDark: res.fields.primaryColorDark['en-US'], secondaryColor: res.fields.secondaryColor['en-US'] })
    })
    sdk.window.startAutoResizer();
  }, []);

  React.useEffect(() => {
    sdk.field.setValue(state);
    console.log(state)
  }, [state]);

  const context = {
    state,
    fieldActions,
    sdk
  }

  return (
    <FieldContext.Provider value={context}>
    <div style={{ minHeight: 1200 }}>
      {(state && state.sections && state.sections.length) &&
        state.sections.map((section: any, i: number) => {
          return(
          <div key={i}>
            <Flex
              style={{ ...STYLES.gridActions }}
              justifyContent="space-between"
            >
              <div>
                {section.displayType ? (
                  <Paragraph>{`Section ${i + 1}`}</Paragraph>
                ) : (
                  <>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("oneCol", i)
                      }
                    >
                      1 Col
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("fiftyFifty", i)
                      }
                    >
                      50/50
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("oneThirdTwoThirds", i)
                      }
                    >
                      1/3 - 2/3
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("twoThirdsOneThird", i)
                      }
                    >
                      2/3 - 1/3
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("threeCols", i)
                      }
                    >
                      3 Cols
                    </Button>
                  </>
                )}
              </div>
              <div style={{...STYLES.sectionBtns}}>
                {i > 0 && 
                  <Button
                    buttonType="muted"
                    size="small"
                    icon="ArrowUp"
                    aria-label="Delete"
                    onClick={() => fieldActions.changeSectionOrder(i, 'up')}
                  />
                }
                {i < (sectionsLen - 1) &&
                  <Button
                    buttonType="muted"
                    size="small"
                    icon="ArrowDown"
                    aria-label="Delete"
                    onClick={() => fieldActions.changeSectionOrder(i, 'down')}
                  />
                }
                <Button
                  buttonType="negative"
                  size="small"
                  icon="Delete"
                  aria-label="Delete"
                  onClick={() => fieldActions.deleteSection(i)}
                />
              </div>
            </Flex>
            <Grid
              style={{ ...STYLES.gridWrapper}}
              columns={"repeat(6, 1fr)"}
              rowGap="spacingS"
              columnGap="spacingS"
            >
              {section.columns &&
                section.columns.map((column: any, j: number) => {
                  return (
                    <CustomGridItem columnSpan={column.style} sectionIdx={i} columnIdx={j} key={j}/>
                  );
                })}
            </Grid>
          </div>
        )}
      )}
      <Button
        onClick={fieldActions.addSection}
        buttonType="muted"
        isFullWidth={true}
        icon="Plus"
        aria-label="Add"
      />
    </div>
    </FieldContext.Provider>
  );
};

export default Field;
