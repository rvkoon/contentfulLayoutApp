export default function useField(dispatch: any){

  const setStateFromAPI = (data: any) => {
    dispatch({ type: "setStateFromAPI", data });
  }

  const addSection = () => {
    dispatch({type: 'addSection'})
  }

  const deleteSection = (sectionId: number) => {
    dispatch({type: 'deleteSection', sectionId})
  }

  const setSectionDisplayType = (displayType: string, sectionId: any) => {
    dispatch({type: 'setSectionDisplayType', displayType, sectionId})
  }

  const addColumnData = (
    {sectionId, columnId, content}:
    {sectionId: any, columnId: string, content: object}
  ) => {
    dispatch({type: 'addColumnData', sectionId, columnId, content })
  }

  return {
    setStateFromAPI,
    addSection,
    deleteSection,
    setSectionDisplayType,
    addColumnData
  }
}