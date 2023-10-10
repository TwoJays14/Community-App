const User = require("../../../models/user")
const db = require("../../../database/connect")

describe('findOneById', () => {
    it('resolves with user on successful db query', async () => {
      let testUser = {user_id: 1, username: "banana", password: "yellow"} 
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testUser] })

      const result = await User.getOneById(1)
      expect(result).toBeInstanceOf(User)
      expect(result.password).toBe('yellow')
      expect(result.username).toBe('banana')
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await User.getOneById(7)
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate user.")
      }
    })
})

describe('findOneByUsername', () => {
    it('resolves with user on successful db query', async () => {
      let testUser = {user_id: 1, username: "apple", password: "red"} 
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testUser] })

      const result = await User.getOneById(1)
      expect(result).toBeInstanceOf(User)
      expect(result.password).toBe('red')
      expect(result.username).toBe('apple')
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await User.getOneByUsername(7)
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("Unable to locate user.")
      }
    })
})
