const booksController = require("../../../controllers/library")
const Book = require("../../../models/library")

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))

const mockRes = { status: mockStatus }

describe('books controller', () => {
    // When mocking things more than once, these two lines of code is very useful to have 
   
    beforeEach(() => jest.clearAllMocks()) // before each test clear the mock tests. e.g. toHaveBeenCalledTimes

    afterAll(() => jest.resetAllMocks()) // return functions back to the initial states, after the completion of tests

    describe('index', () => {
        it ('should return books with a status code 200', async () => {
            const testBooks = ['b1', 'b2']
            jest.spyOn(Book, 'getAll')
              .mockResolvedValue(testBooks)

              await booksController.index(null, mockRes)

              expect(Book.getAll).toHaveBeenCalledTimes(1)
              expect(mockStatus).toHaveBeenCalledWith(200)
              expect(mockSend).toHaveBeenCalledWith(testBooks)
        })

        it('sends an error upon fail', async () => {
            jest.spyOn(Book, 'getAll')
              .mockRejectedValue(new Error('Something happened to your db'))
              
              await booksController.index(null, mockRes)

              expect(Book.getAll).toHaveBeenCalledTimes(1) // tests are independent of each other. This is the second time therefore need hooks.

              expect(mockStatus).toHaveBeenCalledWith(500)
              expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db'})
        })

    })
})
