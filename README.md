# Apollo-Book-Search
MERN book search engine

## Table of Contents

- [Project Name](#Apollo-Book-Search)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)

# Description

The application's purpose is to provide a search engine for Google Books using the Google Books API. Initially built with a RESTful API and the MERN stack (MongoDB, Express.js, React, Node.js), it allows users to search for books and save their searches to the backend. The challenge involves refactoring the application to use GraphQL queries and mutations with Apollo Server, modifying authentication middleware to fit GraphQL, creating an Apollo Provider for communication with the server, and deploying the application to Render.

# User Story

AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase

# Acceptance Criteria

GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  

# Features

This application has the following features and functions:

1. 

## Usage

The github repository may be found at https://github.com/sfmacdonald/Apollo-Book-Search

See attached screenrecording for demonstration: 

## Testing

Testing may be accomplished manually by: