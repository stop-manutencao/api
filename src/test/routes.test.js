import request from 'supertest'
import app from '../app'

describe('Test routes from api service', () => {
  test('[INDEX] /', done => {
    request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('[STATUS] /status', done => {
    request(app).get('/status').then(response => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
