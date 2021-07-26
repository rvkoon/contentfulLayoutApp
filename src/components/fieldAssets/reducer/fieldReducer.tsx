import { v4 as uuidv4 } from 'uuid';
import {produce} from 'immer'


function _createNewSection(UID: string){
  return {
    id: UID,
    columns: {},
    displayType: null
  }
}

function _createColumn(UID: string, colSize: number){
  return {
    id: UID,
    colSize,
    style: {
      gridColumn: `span ${colSize}`
    },
    contents: {}
  }
}

function _addColumn(newColumns: any, span: number){
  const UID = uuidv4()
  return {...newColumns, [UID]: _createColumn(UID, span)}
}

function _fillColumnsSchema(displayType: any){

  let newColumns = {}

  switch(displayType){
    case 'oneCol':
      newColumns = _addColumn(newColumns, 6)
      return newColumns
    case 'fiftyFifty':
      for(let i = 0; i<2; i++){
        newColumns = _addColumn(newColumns, 3)
      }
      return newColumns
    case 'oneThirdTwoThirds':
      newColumns = _addColumn(newColumns, 2)
      newColumns = _addColumn(newColumns, 4)
      return newColumns
    case 'twoThirdsOneThird':
      newColumns = _addColumn(newColumns, 4)
      newColumns = _addColumn(newColumns, 2)
      return newColumns
    case 'threeCols':
      for(let i = 0; i<3; i++){
        newColumns = _addColumn(newColumns, 2)
      }
      return newColumns
  }
}

function _createTextData(){
  return {
    element: "p",
    color: "#000",
    isBold: false,
    text: ""
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
      const UID = uuidv4()
      draft.sections[UID] = _createNewSection(UID)
      break
    }

    /****************************************/
    case 'deleteSection':{
      delete draft.sections[action.sectionId]
      break
    }

    /****************************************/
    case 'setSectionDisplayType':{
      draft.sections[action.sectionId].displayType = action.displayType
      draft.sections[action.sectionId].columns = _fillColumnsSchema(action.displayType)
      break
    }

    /****************************************/
    case 'addColumnContent': {
      const UID = uuidv4()
      draft.sections[action.sectionId].columns[action.columnId].contents = 
      {...draft.sections[action.sectionId].columns[action.columnId].contents, [UID]: {id: UID, contentType: action.contentType, data: _createTextData()}}
      break
    }

    /****************************************/
    case 'setContentData': {
      console.log(action)
      draft.sections[action.sectionId].columns[action.columnId].contents[action.contentId].data = action.data
      break
    }

    /****************************************/
    case 'deleteContent': {
      delete draft.sections[action.sectionId].columns[action.columnId].contents[action.contentId]
      break
    }
  }
}

export const curriedReducerFunction = produce(sectionsReducer);