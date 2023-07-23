import { Request, Response } from 'express'
import { addNewUserToDB } from './user.services'

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const userInf = req.body
    const result = await addNewUserToDB(userInf)

    res.status(200).json({
      succcess: true,
      status: 200,
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      succcess: false,
      status: 200,
      data: err,
    })
  }
}
