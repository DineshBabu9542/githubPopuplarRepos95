import './index.css'

const LanguageFilterItem = props => {
  const {eachItemDetails, languageSearchItems, isActive} = props
  const {id, language} = eachItemDetails

  const onClickLanguageBtn = () => {
    languageSearchItems(id)
  }

  const classNames = isActive ? 'is-class-name language-disc1' : 'language-btn'

  return (
    <li className="list-item">
      <div>
        <button
          className={classNames}
          type="button"
          onClick={onClickLanguageBtn}
        >
          {language}
        </button>
      </div>
    </li>
  )
}
export default LanguageFilterItem
