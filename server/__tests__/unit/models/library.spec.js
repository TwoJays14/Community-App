const Book = require("../../../models/library")
const db = require("../../../database/connect")

describe('getAll', () => {
    it('resolves with books when successful', async () => 
    {jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [{ title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false}, { title: 'b2', author: 'a2', category: 'c2', publisher: 'p2', isbn: 'i2', num_pages: 2, publish_date: 2, available_books: 2, reserved: false},  {title: 'b3', author: 'a3', category: 'c3', publisher: 'p3', isbn: 'i3', num_pages: 3, publish_date: 3, available_books: 3, reserved: false}]
        }) 

        const books = await Book.getAll()
        expect(books).toHaveLength(3)
        expect(books[0]).toHaveProperty('book_id')
    })

    it('should throw an Error on db query error', async () => {
        
        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({ rows: [] })
  
        try {
          await Book.getAll()
        } catch (err) {
          expect(err).toBeDefined()
          expect(err.message).toBe("No books available.")
        }
    })
})


describe('destroy', () => {
    it('should return the deleted book', async () => {
      const book = new Book({})
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ book_id: 72, title: 'plum', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false}] })

      const result = await book.destroy()

      expect(result).toBeInstanceOf(Book)
      expect(result.book_id).toBe(72)
      expect(result).not.toEqual(book)
    })

  })

  describe('update', () => {
    it('should throw an error if anything is missing', async () => {
      try {
        const book = new Book({ title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1})
        await book.update({ title: 'puppet' });
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe("connect ECONNREFUSED ::1:5432")
      }
    })
  })


describe('findOneById', () => {
    it('resolves with book on successful db query', async () => {
      let testBook = { book_id: 1, title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false} 
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testBook] })

      const result = await Book.getOneByID(1)
      expect(result).toBeInstanceOf(Book)
      expect(result.title).toBe('b1')
      expect(result.book_id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await Book.getOneByID('red')
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("That book is not available.")
      }
    })
})

describe('findOneByTitle', () => {
    it('resolves with book on successful db query', async () => {
      let testBook = { book_id: 1, title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false} 
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testBook] })

      const result = await Book.getOneByTitle('b1')
      expect(result).toBeInstanceOf(Book)
      expect(result.publisher).toBe('p1')
      expect(result.book_id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await Book.getOneByTitle('red')
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("That book is not available.")
      }
    })
  })

describe('findOneByISBN', () => {
    it('resolves with book on successful db query', async () => {
      let testBook = { book_id: 1, title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false} 
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testBook] })

      const result = await Book.getOneByISBN('i1')
      expect(result).toBeInstanceOf(Book)
      expect(result.category).toBe('c1')
      expect(result.book_id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await Book.getOneByTitle('red')
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe("That book is not available.")
      }
    })
})

describe('create', () => {
    it('resolves with goat on successful db query', async () => {
        let testBook = {title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false}
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...testBook, book_id: 1 }] });

      const result = await Book.create(testBook);
      expect(result).toBeTruthy()
      expect(result).toHaveProperty('book_id')
      expect(result).toHaveProperty('title')
    })

    it('should throw an Error on db query error', async () => {

      try {
        await Book.create({ name: "plum" })
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('')
      }
    })
  })

  describe('getAllByCategory', () => {
    it('resolves with books when successful', async () => 
    {jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [{ title: 'b1', author: 'a1', category: 'c1', publisher: 'p1', isbn: 'i1', num_pages: 1, publish_date: 1, available_books: 1, reserved: false}, { title: 'b2', author: 'a2', category: 'c1', publisher: 'p2', isbn: 'i2', num_pages: 2, publish_date: 2, available_books: 2, reserved: false},  {title: 'b3', author: 'a3', category: 'c2', publisher: 'p3', isbn: 'i3', num_pages: 3, publish_date: 3, available_books: 3, reserved: false}]
        }) 

        const books = await Book.getAllByCategory('c1')
        expect(books).toHaveLength(3)
        expect(books[0]).toHaveProperty('book_id')
    })

    it('should throw an Error on db query error', async () => {
        
        jest.spyOn(db, 'query')
          .mockResolvedValueOnce({ rows: [] })
  
        try {
          await Book.getAllByCategory('c1')
        } catch (err) {
          expect(err).toBeDefined()
          expect(err.message).toBe("No books available.")
        }
    })
})

