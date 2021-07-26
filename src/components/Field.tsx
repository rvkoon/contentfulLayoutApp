import React from "react";
import {
  Grid,
  GridItem,
  Button,
  Flex,
  Paragraph,
} from "@contentful/forma-36-react-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import STYLES from "../common/styles";
import CustomGridItem from "./fieldAssets/components/CustomGridItem";
import sectionsReducer, {curriedReducerFunction} from "./fieldAssets/reducer/fieldReducer";
import useField from "./fieldAssets/hooks/useField.hook";
import FieldContext from "./fieldAssets/context/context"

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const initialState = {
  sections: [],
};

const Field = ({ sdk }: FieldProps) => {
  const [state, dispatch] = React.useReducer(curriedReducerFunction, initialState);
  const { ...fieldActions } = useField(dispatch);

  React.useEffect(() => {
    if (sdk.field.getValue() !== undefined) {
      console.log(`HELLO : ${JSON.stringify(sdk.field.getValue())}`)
      dispatch({ type: "setStateFromAPI", payload: sdk.field.getValue() });
    }
    sdk.window.startAutoResizer();
  }, []);

  React.useEffect(() => {
    sdk.field.setValue(state);
  }, [state]);

  const contextOptions = {
    state,
    fieldActions,
    sdk
  }

  return (
    <FieldContext.Provider value={contextOptions}>
    <div style={{ minHeight: 1200 }}>
      {(state && state.sections && state.sections.length) &&
        state.sections.map((section: any, i: number) => {
          return(
          <>
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
                        fieldActions.setSectionDisplayType("oneCol", section.id)
                      }
                    >
                      1 Col
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("fiftyFifty", section.id)
                      }
                    >
                      50/50
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("oneThirdTwoThirds", section.id)
                      }
                    >
                      1/3 - 2/3
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("twoThirdsOneThird", section.id)
                      }
                    >
                      2/3 - 1/3
                    </Button>
                    <Button
                      buttonType="muted"
                      size="small"
                      style={{ width: 100, marginRight: 10 }}
                      onClick={() =>
                        fieldActions.setSectionDisplayType("threeCols", section.id)
                      }
                    >
                      3 Cols
                    </Button>
                  </>
                )}
              </div>
              <Button
                buttonType="negative"
                size="small"
                icon="Delete"
                aria-label="Delete"
                onClick={() => fieldActions.deleteSection(section.id)}
              />
            </Flex>
            <Grid
              style={{ ...STYLES.gridWrapper}}
              columns={"1fr 1fr 1fr 1fr 1fr 1fr"}
              rowGap="spacingS"
              columnGap="spacingS"
            >
              {section.columns &&
                section.columns.map((column: any, j: number) => {
                  return (
                    <CustomGridItem columnSpan={column.style} sectionIdx={i} columnIdx={j}/>
                  );
                })}
            </Grid>
          </>
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
