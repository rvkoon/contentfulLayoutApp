import { v4 as uuidv4 } from 'uuid';
import {produce} from 'immer'


function _createNewSection(){
  return {
    id: uuidv4(),
    columns: [],
    displayType: null
  }
}

function _createColumn(colSize: number){
  return {
    id: uuidv4(),
    colSize,
    style: {
      gridColumn: `span ${colSize}`
    },
    data: []
  }
}

function _fillColumnsSchema(displayType: any){

  const arr = []

  switch(displayType){
    case 'oneCol':
      arr.push(_createColumn(6))
      return arr
    case 'fiftyFifty':
      for(let i = 0; i<2; i++){
        arr.push(_createColumn(3))
      }
      return arr
    case 'oneThirdTwoThirds':
      arr.push(_createColumn(2))
      arr.push(_createColumn(4))
      return arr
    case 'twoThirdsOneThird':
      arr.push(_createColumn(4))
      arr.push(_createColumn(2))
      return arr
    case 'threeCols':
      for(let i = 0; i<3; i++){
        arr.push(_createColumn(2))
      }
      return arr
  }
}


export default function sectionsReducer(draft: any, action: any){
  switch(action.type){
    /****************************************/
    case 'setStateFromAPI': {
      draft.sections = action.payload.sections
      break
    }

    /****************************************/
    case 'addSection':{
      draft.sections.push(_createNewSection())
      break
    }

    /****************************************/
    case 'deleteSection':{
      draft.sections = draft.sections.filter((section: any) => section.id !== action.payload)
      break
    }

    /****************************************/
    case 'setSectionDisplayType':{
      const selectedSectionIdx = draft.sections.findIndex((section: any) => section.id === action.sectionId)
      draft.sections[selectedSectionIdx].displayType = action.displayType
      draft.sections[selectedSectionIdx].columns = _fillColumnsSchema(action.displayType)
      break
    }

    /****************************************/
    case 'addColumnData': {
      // const selectedSectionIdx = draft.sections.findIndex((section: any) => section.id === action.sectionId)
      // const selectedColumnIdx = draft.sections[selectedSectionIdx].findIndex((column: any) => column.id === action.columnId)
      draft.sections[action.sectionIdx].columns[action.columnIdx].data.push(action.data)
      break
    }
  }
}

export const curriedReducerFunction = produce(sectionsReducer);