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

  const addColumnContent = (
    {sectionId, columnId, contentType,  data = {}}:
    {sectionId: any, columnId: string, contentType: string, data: object}
  ) => {
    dispatch({type: 'addColumnContent', sectionId, columnId, contentType, data })
  }

  const setContentData = (
    {sectionId, columnId, contentId, data}:
    {sectionId: string, columnId: string, contentId: string, data: object}
  ) => {
    dispatch({type: 'setContentData', sectionId, columnId, contentId, data })
  }

  const deleteContent = (sectionId: string, columnId: string, contentId: string) => {
    dispatch({type: 'deleteContent', sectionId, columnId, contentId })
  }

  return {
    setStateFromAPI,
    addSection,
    deleteSection,
    setSectionDisplayType,
    addColumnContent,
    setContentData,
    deleteContent
  }
}