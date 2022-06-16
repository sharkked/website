import { Router } from 'express'
import passport from 'passport'
import oauth from '../oauth'

const routes = Router()

oauth().forEach((strategy: string) => {
  routes.get(`/auth/${strategy}`, passport.authenticate(`${strategy}`))
  routes.get(`/auth/${strategy}/callback`,
    (req: any, res) => {
      res.send(req.query)
  })
})

routes.get('/login', (req, res) => {
  res.send("login failed idk")
})

export default routes