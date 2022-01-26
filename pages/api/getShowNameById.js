import { mainFetcher } from "../../src/utils/AxiosInstances"

const handler = async (req, res) => {
  const showIds = req.body

  const showsNames = await Promise.all(showIds.map(async id => {
    const fetchedShow = await mainFetcher(`/productions/${id}`)
    
    return {
      [id] : fetchedShow.title
    }
  }))

  const showsNamesObject = Object.assign({}, ...showsNames);

  if(showsNames.length > 0){
    res.status(200).json(showsNamesObject)
  }
  else {
    res.status(400).json()
  }

}

export default handler;
