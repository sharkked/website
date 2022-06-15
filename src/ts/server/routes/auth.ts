import { Router } from 'express'
import passport from 'passport'

const routes = Router()

routes.get('/auth/twitter', passport.authenticate('twitter'))

routes.get('/auth/twitter/callback',
  (req: any, res) => {
    console.log(req.params)
    res.send(req.query)
})

routes.get('/login', (req, res) => {
  res.send("login failed idk")
})

export default routes