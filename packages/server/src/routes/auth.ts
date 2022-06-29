import { Router } from 'express'
import passport from 'passport'
import { providers } from '../oauth'

const routes = Router()

export function authRoutes(host: string, port: string) {
  providers.forEach(({id, strategy, additionalOptions}) => {
    const options = {
      ...additionalOptions,
      callbackURL: ``
    }

    passport.use(new strategy(options, ()=>{}));

    routes.get(`/auth/${id}`, passport.authenticate(`${id}`));
    routes.get(`/auth/${id}/callback`,
      (req: any, res) => {
        res.send(req.query)
    })
  })
}

routes.get('/login', (req, res) => {
  res.send("login failed idk")
})

export default routes