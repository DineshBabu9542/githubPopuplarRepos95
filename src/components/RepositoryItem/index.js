import './index.css'

const RepositoryItem = props => {
  const {eachItemProductsDetails} = props

  const {
    imageUrl,
    id,
    name,
    starsCount,
    forksCount,
    issuesCount,
  } = eachItemProductsDetails

  return (
    <li className="list-items">
      <div className="name-and-img-items">
        <img className="img-items" alt={name} src={imageUrl} />
        <h1 className="name-heading">{name}</h1>
        <div>
          <div className="star-con">
            <img
              className="count-img"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            />
            <p className="span-con">{starsCount} stars</p>
          </div>
          <div className="forks-con">
            <img
              className="count-img"
              alt="forks"
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            />
            <p className="span-con">{forksCount} forks</p>
          </div>
          <div className="star-con">
            <img
              className="count-img"
              alt="open issues"
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            />
            <p className="span-con">{issuesCount} open issues</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
