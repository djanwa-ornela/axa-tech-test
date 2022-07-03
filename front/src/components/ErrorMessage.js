import React from 'react'

export default function ErrorMessage({message}) {
  return (
    <h1 data-testid="message">{message}</h1>
  )
}
