import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { useApi } from './useApi'
import PokemonAbility from './PokemonAbility'
import ErrorMessage from './ErrorMessage'
import Prev from '../assets/icons8-go-back-64.png'
import Home from '../assets/icons8-home-48.png'
import Next from '../assets/icons8-forward-button-64.png'

const formatName = (nameWithDash) => nameWithDash.replace('-', ' ')

const PokemonPage = ({ previous, next }) => {
  const { name } = useParams()
  const {
    data: pokemon,
    error,
    isLoading,
  } = useApi(`https://pokeapi.co/api/v2/pokemon/${name}`)

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <ErrorMessage error={error} />
  }

  const { type } = pokemon.types.find((type) => type.slot === 1)
  const stats = pokemon.stats
    .map((stat) => ({
      name: formatName(stat.stat.name),
      value: stat.base_stat,
    }))
    .reverse()
  const normalAbility = pokemon.abilities.find((ability) => !ability.is_hidden)
  const hiddenAbility = pokemon.abilities.find(
    (ability) => ability.is_hidden === true,
  )

  const navStyle = {
    textDecoration: 'none',
    color: 'brown',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  }

  const iconStyle = {
    height: '30px',
    width: '30px',
  }

  console.log('hiddenAbility=', hiddenAbility)
  return (
    <div className="pokemon-section">
      <div className="links">
        {previous && (
          <Link to={`/pokemon/${previous.name}`} style={navStyle}>
            <img src={Prev} style={iconStyle} />
            Previous
          </Link>
        )}
        <Link to="/" style={navStyle}>
          <img src={Home} style={iconStyle} />
          Home
        </Link>
        {next && (
          <Link to={`/pokemon/${next.name}`} style={navStyle}>
            <img src={Next} style={iconStyle} />
            Next
          </Link>
        )}
      </div>
      <div className={`pokemon-page pokemon-type-${type.name}`}>
        <div
          className="pokemon-image"
          style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
        />
        <div className="pokemon-info">
          <div className="pokemon-name">{pokemon.name}</div>
          <div className="pokemon-stats" data-testid="stats">
            <table>
              <tbody>
                {stats.map(({ name, value }) => (
                  <tr key={name}>
                    <td className="pokemon-stats-name">{name}</td>
                    <td className="pokemon-stats-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pokemon-abilities">
            {normalAbility && (
              <PokemonAbility
                abilityName={formatName(normalAbility.ability.name)}
              />
            )}
            {hiddenAbility && (
              <PokemonAbility
                abilityName={formatName(hiddenAbility.ability.name)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonPage
