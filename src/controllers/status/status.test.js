import statusController from './status'

const mockRequest = (params = {}, body = {}) => {
  const req = {}
  req.params = params
  req.body = body
  return req
}

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('[STATUS] controller to test service status', () => {
  test('should return status object', done => {
    const req = mockRequest()
    const res = mockResponse()

    statusController.get(req, res)
    const response = { params: {}, body: {}, status: 'OK!' }
    expect(res.json).toHaveBeenCalledWith(response)

    done()
  })

  test('should return status object with body and params', done => {
    const req = mockRequest({ test: 'params' }, { test: 'body' })
    const res = mockResponse()

    statusController.get(req, res)
    const response = {
      params: {
        test: 'params'
      },
      body: {
        test: 'body'
      },
      status: 'OK!'
    }

    expect(res.json).toHaveBeenCalledWith(response)
    done()
  })
})
