import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

// import {each} from 'immer/dist/internal'

class Password extends Component {
  state = {
    input1: '',
    input2: '',
    input3: '',
    psdCount: 0,
    showPsd: false,
    searchInput: '',
    passwordList: [],
  }

  //   componentDidMount() {
  //     localStorage.setItem('psdList', '[]')
  //   }

  setPsdObjectInLocalStorage = psdObject => {
    const psdObjectListtemp = JSON.parse(
      localStorage.getItem('psdList') || '[]',
    )
    psdObjectListtemp.push(psdObject)
    localStorage.setItem('psdList', JSON.stringify(psdObjectListtemp))
  }

  formSubmittedFun = event => {
    event.preventDefault()
    const psdObject = {
      website: `${event.target[0].value}`,
      username: `${event.target[1].value}`,
      password: `${event.target[2].value}`,
      id: uuidv4(),
    }
    this.setPsdObjectInLocalStorage(psdObject)

    this.setState(prevState => ({
      input1: '',
      input2: '',
      input3: '',
      psdCount: prevState.psdCount + 1,
      passwordList: [...prevState.passwordList, psdObject],
    }))

    console.log(JSON.parse(localStorage.getItem('psdList')))
  }

  changeInputValue = event => {
    console.log(event.target.id)
    if (event.target.id === '1') {
      this.setState({input1: event.target.value})
    } else if (event.target.id === '2') {
      this.setState({input2: event.target.value})
    } else {
      this.setState({input3: event.target.value})
    }
  }

  searchInputFun = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItemFun = id => {
    const passwordList = JSON.parse(localStorage.getItem('psdList'))

    const newList = passwordList.filter(eachItem => eachItem.id !== id)

    const psdLocalStrageList = newList.map(eachItem => JSON.stringify(eachItem))
    console.log(psdLocalStrageList)
    localStorage.setItem('psdList', `[${psdLocalStrageList}]`)

    this.setState(prevState => ({
      passwordList: [...newList],
      psdCount: prevState.psdCount - 1,
    }))
  }

  checkBoxClicked = event => {
    console.log(event.target.checked)
    this.setState({showPsd: event.target.checked})
  }

  render() {
    const {
      passwordList,
      input1,
      input2,
      input3,
      psdCount,
      showPsd,
      searchInput,
    } = this.state

    const localStoragePsdList = JSON.parse(localStorage.getItem('psdList'))

    const newSearchFilteredPsdList = localStoragePsdList.filter(eachItem =>
      eachItem.website.includes(searchInput),
    )
    const noPsd = newSearchFilteredPsdList.length

    console.log(noPsd)
    return (
      <div className="main-container d-flex flex-column align-items-center">
        <div className="d-flex w-8">
          <img
            className="password-manage-img"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
        </div>
        <div className="add-input-image-container d-flex flex-row w-8 mt-1">
          <div className="add-new-psd-container d-flex flex-column p-1">
            <h1 className="heading-add-n-psd">Add New Password</h1>
            <form
              onSubmit={this.formSubmittedFun}
              className="d-flex flex-column"
            >
              <input
                placeholder="Enter Website"
                id="1"
                value={input1}
                onChange={this.changeInputValue}
                type="text"
                className="mt-1"
              />
              <input
                placeholder="Enter Username"
                type="text"
                value={input2}
                id="2"
                onChange={this.changeInputValue}
                className="mt-1"
              />
              <input
                placeholder="Enter Password"
                value={input3}
                type="text"
                onChange={this.changeInputValue}
                id="3"
                className="mt-1"
              />
              <button className="add-button mt-1">Add</button>
            </form>
          </div>
          <div>
            <img
              className="pm-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
          </div>
        </div>

        <div className="add-input-image-container d-flex flex-column w-8 mt-1">
          <div className="w-100 align-items-center d-flex flex-row justify-content-space-between">
            <h1 className="heading-add-n-psd ">
              Your Passwords
              <span className="no-of-psd">{noPsd}</span>
            </h1>
            <input onChange={this.searchInputFun} />
          </div>

          <hr className="w-100" />
          <div className="w-100 d-flex flex-row align-items-center justify-content-end">
            <input
              onChange={this.checkBoxClicked}
              className="checkbox"
              type="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbok">Show Passwords</label>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <ul className="d-flex flex-row flex-wrap-wrap">
              {newSearchFilteredPsdList.map(eachItem => (
                <PasswordItem
                  showPsd={showPsd}
                  deleteItemFun={this.deleteItemFun}
                  key={eachItem.id}
                  passwordListItem={eachItem}
                />
              ))}
            </ul>
            {noPsd === 0 && (
              <div className="d-flex flex-column align-items-center">
                <img
                  className="no-psd-image"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                />
                <p>No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Password
