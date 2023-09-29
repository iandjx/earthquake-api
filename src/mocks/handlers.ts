import { rest } from 'msw'
import { EARTHQUAKE_URL } from '../constants'
import { data } from './data/earthquakeData'

export const handlers = [
  rest.get(EARTHQUAKE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data))
  }),
]
