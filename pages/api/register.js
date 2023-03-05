import axios from 'axios'

export default async function handler(req, res) {
  try {
    const result = await axios.post(
      `${process.env.STRAPI_URL}/api/auth/local/register`,
      req.body
    )
    res.status(200).json(result.data)
  } catch (error) {
    res.status(error.response.data.error).json(error.response.data.error)
  }
}
