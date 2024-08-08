import UserTableM from '../models/UserTable.js'
import MainUserM from '../models/MainUser.js'

class UserTable {
  static create = async (req, res) => {
    try {
      const { userId } = req
      await UserTableM.create(userId)
      const user = await MainUserM.getById(userId)
      await UserTableM.seed(userId, user)
      return res.json({ success: true, message: 'Tabla de usuario creada' })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }
}

export default UserTable
