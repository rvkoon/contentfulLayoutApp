export default function useField(dispatch: any){

  const setStateFromAPI = (data: any) => {
    dispatch({ type: "setStateFromAPI", data });
  }

  const addSection = () => {
    dispatch({type: 'addSection'})
  }

  const deleteSection = (sectionIdx: number) => {
    dispatch({type: 'deleteSection', sectionIdx})
  }

  const changeSectionOrder = (sectionIdx: number, direction: string) => {
    dispatch({type: 'changeSectionOrder', sectionIdx, direction})
  }

  const changeContentOrder = (sectionIdx: number, columnIdx: number, contentIdx: number, direction: string) => {
    dispatch({type: 'changeContentOrder', sectionIdx, columnIdx, contentIdx, direction})
  }

  const setSectionDisplayType = (displayType: string, sectionIdx: number) => {
    dispatch({type: 'setSectionDisplayType', displayType, sectionIdx})
  }

  const addColumnContent = (
    {sectionIdx, columnIdx, contentType,  data = {}}:
    {sectionIdx: number, columnIdx: number, contentType: string, data: object}
  ) => {
    dispatch({type: 'addColumnContent', sectionIdx, columnIdx, contentType, data })
  }

  const setContentData = (
    {sectionIdx, columnIdx, contentIdx, data}:
    {sectionIdx: number, columnIdx: number, contentIdx: number, data: object}
  ) => {
    dispatch({type: 'setContentData', sectionIdx, columnIdx, contentIdx, data })
  }

  const deleteContent = (sectionIdx: number, columnIdx: number, contentIdx: number) => {
    dispatch({type: 'deleteContent', sectionIdx, columnIdx, contentIdx })
  }

  const setSiteConfig = (siteConfig: any) => {
    dispatch({type: 'setSiteConfig', siteConfig})
  }

  return {
    setStateFromAPI,
    addSection,
    deleteSection,
    setSectionDisplayType,
    addColumnContent,
    setContentData,
    deleteContent,
    setSiteConfig,
    changeSectionOrder,
    changeContentOrder
  }
}