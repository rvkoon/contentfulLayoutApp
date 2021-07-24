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

  return {
    addSection,
    deleteSection,
    setSectionDisplayType
  }
}