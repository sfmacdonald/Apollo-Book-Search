import { useState } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../models/mutations';
import { saveBookIds } from '../utils/localStorage';
import Auth from '../utils/Auth';

const searchBooks = async (searchQuery) => {
  // Simulate a delay of 1 second using setTimeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulated search results (replace with actual search logic)
      const searchResults = [
        { title: 'Book 1', authors: ['Author 1'], description: 'Description 1', bookId: 1, image: 'image1.jpg' },
        { title: 'Book 2', authors: ['Author 2'], description: 'Description 2', bookId: 2, image: 'image2.jpg' },
        // Add more books as needed
      ];
      // Resolve the Promise with the search results
      resolve(searchResults);
    }, 1000); // Simulate a delay of 1 second
  });
};


const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return;

    try {
      const searchResults = await searchBooks(searchInput);
      setSearchedBooks(searchResults);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    try {
      const { data } = await saveBook({
        variables: { bookId },
      });
      saveBookIds([...savedBookIds, bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
