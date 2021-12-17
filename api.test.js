const api = require('./index')
const request = require('supertest')

describe('Inicio server', () =>{
    it('Health check', async() => {
        const resp = await request(api).get('/health-check')
        expect(resp.statusCode).toEqual(200)
    })
})

