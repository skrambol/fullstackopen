import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blog form inputs must be passed correctly', async () => {
  const mockCreateBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={mockCreateBlog} showNotification={() => {}}/>)
  const user = userEvent.setup()
  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createButton = container.querySelector('button')

  await user.type(titleInput, 'My title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'http://localhost:3000')
  await user.click(createButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({ title: 'My title', author: 'author', url: 'http://localhost:3000' })
})
