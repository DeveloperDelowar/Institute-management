import { RequestHandler } from 'express'
import { addNewUserToDB } from './user.services'

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const userInf = req.body
    const result = await addNewUserToDB(userInf)

    res.status(200).json({
      succcess: true,
      message: 'User create successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
