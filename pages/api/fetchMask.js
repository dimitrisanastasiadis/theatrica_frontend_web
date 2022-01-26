import { mainFetcher } from "../../src/utils/AxiosInstances"

const handler = async (req, res) => {
  const { path, id } = req.query

  const item = await mainFetcher(`${path}/${id}`)


  if(item){
    res.status(200).json(item)
  }
  else {
    res.status(400).json()
  }

}

export default handler;
