import axios from 'axios'

export async function processApiRequest(method, url, token, params = null) {
  let config = {
    method,
    url: process.env.STRAPI_URL + url,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  if (params) {
    config.data = {
      data: params
    }
  }

  const res = await axios.request(config)
  try {
    return res.data
  } catch (error) {
    return error.response.data
  }
}

export async function performAction(
  model,
  action,
  token,
  params,
  queryParams = null
) {
  var methods = {
    find: 'get',
    findOne: 'get',
    create: 'post',
    update: 'put',
    delete: 'delete'
  }
  var endpointUrls = {
    find: `/api/${model}`,
    findOne: `/api/${model}/${params ? params.id : ''}`,
    create: `/api/${model}`,
    update: `/api/${model}/${params ? params.id : ''}`,
    delete: `/api/${model}/${params ? params.id : ''}`
  }

  if (queryParams) {
    var endpointUrl =
      endpointUrls[action] + '?' + new URLSearchParams(queryParams).toString()
  } else {
    var endpointUrl = endpointUrls[action]
  }

  return await processApiRequest(
    methods[action],
    endpointUrl,
    token,
    params ? params.data : null
  )
}
