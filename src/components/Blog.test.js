import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/react'

test('renders content', () => {
  const blog = {
    title: 'hhhhhhh',
    author: 'xxx',
    likes: 0,
    url: 'http://xxx.com',
  }

  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent('hhhhhhh')
  // expect(div).not.toHaveTextContent('likes')
})

test('click view button', () => {
  const blog = {
    title: 'hhhhhhh',
    author: 'xxx',
    likes: 0,
    url: 'http://xxx.com',
  }

  const component = render(<Blog blog={blog} />)
  // component.debug()

  const button = component.getByText('view')
  console.log(prettyDOM(button))
  fireEvent.click(button)

  const div = component.container.querySelector('div[style=""]')
  console.log(prettyDOM(div))
  expect(div).toHaveTextContent('likes')
})
