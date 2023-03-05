import { getSession } from 'next-auth/react'
import { performAction } from '/models/baseModel'

export default async function handler(req, res) {
  const userSession = await getSession({ req })
  const { model, action } = req.query
  const data = req.body

  if (req.query.id) {
    data.id = req.query.id
  }

  var result = {
    error: true,
    message: 'Something bad happened!'
  }

  var messageArr = {
    create: 'added',
    update: 'updated',
    delete: 'deleted'
  }

  var resData = await performAction(model, action, userSession.jwt, data)
  result.message = `${model.slice(0, -1)} has been successfully ${
    messageArr[action]
  }!`

  if (resData != undefined) {
    result.error = false
    result.data = resData.data
  }

  if (result.error) {
    return res.status(400).json(result)
  } else {
    return res.status(200).json(result)
  }
}
