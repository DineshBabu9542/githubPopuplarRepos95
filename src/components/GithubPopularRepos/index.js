import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    getProducts: [],
    apiStates: apiStatusConstant.initial,
    activeFilterId: languageFiltersData[0].id,
  }

  getLanguageSearchItems = filterId => {
    this.setState({activeFilterId: filterId}, this.getProductsRepos)
  }

  componentDidMount = () => {
    this.getProductsRepos()
  }

  getProductsRepos = async () => {
    const {activeFilterId} = this.state

    this.setState({apiStates: apiStatusConstant.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`

    const response = await fetch(apiUrl)

    console.log(response)

    if (response.ok) {
      const data = await response.json()

      const updateData = data.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        imageUrl: eachRepository.avatar_url,
        name: eachRepository.name,
        starsCount: eachRepository.stars_count,
        forksCount: eachRepository.forks_count,
        issuesCount: eachRepository.issues_count,
      }))

      this.setState({
        getProducts: updateData,
        apiStates: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStates: apiStatusConstant.failure})
    }
  }

  getRepositoryItem = () => {
    const {getProducts} = this.state
    return (
      <ul className="repos-items-un-order-list">
        {getProducts.map(eachItem => (
          <RepositoryItem
            key={eachItem.id}
            eachItemProductsDetails={eachItem}
          />
        ))}
      </ul>
    )
  }

  getInProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="error-msg">Something Went Wrong</h1>
    </div>
  )

  getSwitchProcess = () => {
    const {apiStates} = this.state

    switch (apiStates) {
      case apiStatusConstant.success:
        return this.getRepositoryItem()
      case apiStatusConstant.failure:
        return this.renderFailure()

      case apiStatusConstant.inProgress:
        return this.getInProgress()

      default:
        return null
    }
  }

  render() {
    const {getProducts, activeFilterId} = this.state
    return (
      <div className="app-container">
        <h1 className="pop-heading">Popular</h1>
        <div>
          <ul className="un-order-list">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                eachItemDetails={eachItem}
                languageSearchItems={this.getLanguageSearchItems}
                isActive={activeFilterId === eachItem.id}
              />
            ))}
          </ul>
        </div>
        {this.getSwitchProcess()}
      </div>
    )
  }
}

export default GithubPopularRepos
