export default function useField(dispatch: any){

  const addSection = async () => {
    dispatch({type: 'addSection'})
  }

  const deleteSection = (sectionIdx: number) => {
    dispatch({type: 'deleteSection', payload: sectionIdx})
  }

  const setSectionDisplayType = (displayType: string, sectionId: any) => {
    dispatch({type: 'setSectionDisplayType', displayType, sectionId})
  }

  const addColumnData = (sectionIdx: any, columnIdx: string, data: object) => {
    dispatch({type: 'addColumnData', sectionIdx, columnIdx, data })
  }

  return {
      addSection,
      deleteSection,
      setSectionDisplayType,
      addColumnData
  }
}