import type { Request, Response } from 'express'
import { writeFileSync } from 'fs'
import { runHooks } from '../../services/hooks.js'

export const submitRoute = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const path = `./data/${new Date().toISOString().replace(/:/g, '-')}.json`
    writeFileSync(path, JSON.stringify(data, null, 2))
    await runHooks(data)
    res.redirect('/success')
  } catch (error) {
    console.error(error)
    res.redirect('/?error=1')
  }
}
