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
    case 'changeSectionOrder':{
      if(
        typeof action.sectionIdx === null || 
        typeof action.sectionIdx === undefined ||
        typeof action.direction === null || 
        typeof action.direction === undefined
      ){
        break
      }
      
      
      if(action.direction === 'up'){
        if(action.sectionIdx > 0){
          const currentItem = draft.sections.splice(action.sectionIdx, 1)[0]
          draft.sections.splice(action.sectionIdx - 1, 0, currentItem)
        }
      }else if(action.direction === 'down'){
        if(action.sectionIdx < (draft.sections.length - 1)){
          const currentItem = draft.sections.splice(action.sectionIdx, 1)[0]
          draft.sections.splice(action.sectionIdx + 1, 0, currentItem)
        }
      }
      break
    }

    /****************************************/
    case 'changeContentOrder':{
      if(
        typeof action.sectionIdx === null || 
        typeof action.sectionIdx === undefined ||
        typeof action.columnIdx === null || 
        typeof action.columnIdx === undefined ||
        typeof action.contentIdx === null || 
        typeof action.contentIdx === undefined ||
        typeof action.direction === null || 
        typeof action.direction === undefined
      ){
        break
      }

      const contents = [...draft.sections[action.sectionIdx].columns[action.columnIdx].contents]
      
      if(action.direction === 'up'){
        if(action.contentIdx > 0){
          const currentItem = contents.splice(action.contentIdx, 1)[0]
          contents.splice(action.contentIdx - 1, 0, currentItem)
        }
      }else if(action.direction === 'down'){
        if(action.contentIdx < (contents.length - 1)){
          const currentItem = contents.splice(action.contentIdx, 1)[0]
          contents.splice(action.contentIdx + 1, 0, currentItem)
        }
      }
      console.log("newContents :" , contents)
      draft.sections[action.sectionIdx].columns[action.columnIdx].contents = contents
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