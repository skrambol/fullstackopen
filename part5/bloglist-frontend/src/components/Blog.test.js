import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'My Title',
  author: 'O. Thor',
  url: 'http://example.org/othor/my-title',
  likes: 5,
  user: {
    name: 'Name Name'
  }
}

test('renders content, but blog details are hidden', () => {
  const { container } = render(<Blog blog={blog} handleLike={() => {}} handleRemoveBlog={() => {}}/>)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  const details = container.querySelector('.blog-details')

  expect(element).toBeDefined()
  expect(details).toHaveStyle('display: none')
})

test('renders content, blog details are shown when clicked', async () => {
  const { container } = render(<Blog blog={blog} handleLike={() => {}} handleRemoveBlog={() => {}}/>)

  const details = container.querySelector('.blog-details')
  const showButton = screen.getByText('show')
  const user = userEvent.setup()

  await user.click(showButton)

  expect(details).toHaveStyle('display: block')
})

test('clicks "like" two times', async () => {
  const mockHandleLike = jest.fn()
  const { container } = render(<Blog blog={blog} handleLike={mockHandleLike} handleRemoveBlog={() => {}}/>)

  const likeButton = screen.getByText('like')
  const user = userEvent.setup()

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})
