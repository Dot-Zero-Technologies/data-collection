import { Router } from 'express'
import { submitRoute } from '../routes/api/submit.js'

const router = Router()

// Submit route.
router.post('/submit', submitRoute)

export default router
