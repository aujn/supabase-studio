import { NextApiRequest, NextApiResponse } from 'next'
import apiWrapper from 'lib/api/apiWrapper'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGet(req, res)
    case 'HEAD':
      return handleHead(req, res)
    default:
      res.setHeader('Allow', ['GET', 'HEAD'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = `${process.env.SUPABASE_URL}/`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // apikey: process.env.SUPABASE_SERVICE_KEY!,
    },
  })
  console.log({ url })
  if (response.ok) {
    const data = await response.json()

    return res.status(200).json(data)
  }
  const data = await response.json()
  console.log({status: response.status, data, message: response})

  return res.status(500).json({ error: { message: 'Internal Server Error' } })
}

const handleHead = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).end()
}
