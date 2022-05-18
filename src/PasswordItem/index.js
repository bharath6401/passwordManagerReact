import './index.css'

const PasswordItem = properties => {
  const colors = ['bg-b', 'bg-y', 'bg-r', 'bg-p', 'bg-o', 'bg-n']
  const randomIndex = Math.floor(Math.random() * 6)
  console.log(randomIndex)
  const {passwordListItem, deleteItemFun, showPsd} = properties

  const {website, username, password, id} = passwordListItem

  const deleteItem = () => {
    deleteItemFun(id)
  }
  //

  return (
    <li className="d-flex flex-row m-1">
      <div
        className={`${colors[randomIndex]} align-self-center weburl-index-1 ml-1 p-2  d-flex flex-column justify-content-center`}
      >
        <h1 className="">{website[0]}</h1>
      </div>

      <div className="ml-1 d-flex flex-column">
        <p className="mt-1 m-0 ml-0">{website}</p>
        <p className="mt-0">{username}</p>
        <p>
          {showPsd ? (
            password
          ) : (
            <img
              className="stars-img-hide-psd"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          )}
        </p>
      </div>
      <button onClick={deleteItem} className="delete-btn">
        <img
          className="delete-img"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}
export default PasswordItem
