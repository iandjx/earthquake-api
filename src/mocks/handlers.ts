import { rest } from 'msw'
import data from './data/earthquakeData'
import { EARTHQUAKE_URL } from '../constants'

export const handlers = [
  rest.get(EARTHQUAKE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data))
  }),
]
