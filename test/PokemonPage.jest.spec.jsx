import React, { act } from 'react'
import { render, screen } from '@testing-library/react'
import axiosMock from 'axios'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import PokemonPage from '../src/PokemonPage'

jest.mock('axios')

const pokemonList = {
  id: 133,
  abilities: [
    {
      ability: {
        name: 'anticipation',
        url: 'https://pokeapi.co/api/v2/ability/107/',
      },
      is_hidden: true,
      slot: 3,
    },
    {
      ability: {
        name: 'adaptability',
        url: 'https://pokeapi.co/api/v2/ability/91/',
      },
      is_hidden: false,
      slot: 2,
    },
  ],
  name: 'eevee',
  stats: [
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'normal',
        url: 'https://pokeapi.co/api/v2/type/1/',
      },
    },
  ],
  sprites: { front_default: 'URL' },
}

const previous = {
  url: 'https://pokeapi.co/api/v2/pokemon/132/',
  name: 'ditto',
  id: 132,
}

const next = {
  url: 'https://pokeapi.co/api/v2/pokemon/134/',
  name: 'vaporeon',
  id: 134,
}

const renderPage = async (props = {}) => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/eevee']}>
        <PokemonPage {...props} />
      </MemoryRouter>,
    )
  })
}

describe('<PokemonPage />', () => {
  beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({ data: pokemonList })
  })

  it('should render abilities', async () => {
    await renderPage()

    expect(screen.getByText('adaptability')).toBeVisible()
    expect(screen.getByText('anticipation')).toBeVisible()
  })

  it('should render stats', async () => {
    await renderPage()

    expect(screen.getByTestId('stats')).toHaveTextContent('hp55attack55')
  })

  it('should render previous and next urls if they exist', async () => {
    await renderPage({ previous, next })

    expect(screen.getByRole('link', { name: 'Previous' })).toHaveAttribute(
      'href',
      '/pokemon/ditto',
    )
    expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute(
      'href',
      '/pokemon/vaporeon',
    )
  })

  it('should not render previous and next urls if none exist', async () => {
    await renderPage()

    expect(screen.queryByRole('link', { name: 'Previous' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Next' })).toBeNull()
  })
})
