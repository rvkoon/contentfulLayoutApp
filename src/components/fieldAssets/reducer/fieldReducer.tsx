import { v4 as uuidv4 } from 'uuid';


function _createNewSection(){
  return {
    id: uuidv4(),
    columns: [],
    displayType: null
  }
}

function _createColumn(colSize: number){
  return {
    colSize,
    style: {
      gridColumn: `span ${colSize}`
    }
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


export default function sectionsReducer(state: any, action: any){
  switch(action.type){
    case 'setStateFromAPI':
      return {...action.payload}
    case 'addSection':
      return {...state, sections: [...state.sections, _createNewSection()]}
    case 'deleteSection':
      return {...state, sections: state.sections.filter((section: any) => section.id !== action.payload)}
    case 'setSectionDisplayType':
      const updatedSections = state.sections.map((section: any) => {
        if(section.id === action.sectionId){
          section.displayType = action.displayType
          section.columns = _fillColumnsSchema(action.displayType)
        }
        return section
      })
      console.log(updatedSections)
      return {...state, sections: updatedSections}
  }
}