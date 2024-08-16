import MainUserM from '../models/MainUser.js'
import UserTableM from '../models/UserTable.js'

class UserTable {
  static create = async (req, res) => {
    try {
      const { userId } = req
      await UserTableM.create(userId)
      const user = await MainUserM.getById(userId)
      await UserTableM.seed(userId, user)
      const message = 'Tabla de usuario creada'
      return res.json({ success: true, message })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }
}

export default UserTable
