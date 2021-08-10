import { v4 as uuidv4 } from 'uuid';
import {produce} from 'immer'


function _createNewSection(){
  return {
    columns: [],
    displayType: null
  }
}

function _createColumn(colSize: number){
  return {
    colSize,
    style: {
      gridColumn: `span ${colSize}`
    },
    contents: []
  }
}

function _fillColumnsSchema(displayType: any){

  let newColumns = []

  switch(displayType){
    case 'oneCol':
      newColumns.push(_createColumn(6))
      return newColumns
    case 'fiftyFifty':
      for(let i = 0; i<2; i++){
        newColumns.push(_createColumn(3))
      }
      return newColumns
    case 'oneThirdTwoThirds':
      newColumns.push(_createColumn(2))
      newColumns.push(_createColumn(4))
      return newColumns
    case 'twoThirdsOneThird':
      newColumns.push(_createColumn(4))
      newColumns.push(_createColumn(2))
      return newColumns
    case 'threeCols':
      for(let i = 0; i<3; i++){
        newColumns.push(_createColumn(2))
      }
      return newColumns
  }
}

function _createTextData(){
  return {
    element: "p",
    color: "#000",
    isBold: false,
    text: "",
    align: "left"
  }
}


export default function sectionsReducer(draft: any, action: any){
  switch(action.type){
    /****************************************/
    case 'setStateFromAPI': {
      draft.sections = action.data.sections
      break
    }

    /****************************************/
    case 'addSection':{
      draft.sections.push(_createNewSection())
      break
    }

    /****************************************/
    case 'deleteSection':{
      draft.sections.splice(action.sectionIdx, 1)
      break
    }

    /****************************************/
    case 'setSectionDisplayType':{
      draft.sections[action.sectionIdx].displayType = action.displayType
      draft.sections[action.sectionIdx].columns = _fillColumnsSchema(action.displayType)
      break
    }

    /****************************************/
    case 'addColumnContent': {
      draft.sections[action.sectionIdx].columns[action.columnIdx].contents.push({
        contentType: action.contentType,
        data: action.contentType === "text" ? _createTextData() : action.data ? action.data : null
      })
      break
    }

    /****************************************/
    case 'setContentData': {
      draft.sections[action.sectionIdx].columns[action.columnIdx].contents[action.contentIdx].data = action.data
      break
    }

    /****************************************/
    case 'deleteContent': {
      draft.sections[action.sectionIdx].columns[action.columnIdx].contents.splice(action.contentIdx, 1)
      break
    }

    case 'setSiteConfig': {
      draft.siteConfig = action.siteConfig
      break
    }
  }
}

export const curriedReducerFunction = produce(sectionsReducer);