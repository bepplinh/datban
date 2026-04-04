import { ZodError } from "zod"

export const validateBodyRequest = (schema) => async (req, res, next) => {
  try {

    const data = await schema.parseAsync(req.body)

    req.body = data

    next()

  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      const errors = error.issues.map(item => ({
        field: item.path[0],
        message: item.message
      }))

      return res.status(400).json({ errors })
    }

    next(error)
  }
}