import React, { useState } from "react"
import MovieManager from "../../components/adminComponents/CreateMovie"
import CreateMovie from "../../components/adminComponents/CreateMovie"
import EditndDelete from "../../components/adminComponents/EditndDelete"
import UsersList from "../../components/adminComponents/UsersList"
import "../../styles/adminpage.css"

const AdminPage = ({ token, isAdmin }) => {
  const [showCreate, setShowCreate] = useState(false)
  const [showUsersList, setShowUsersList] = useState(false)

  const handleShowCreate = () => {
    setShowCreate(prevState => !prevState)
  }
  const handleShowUsers = () => {
    setShowUsersList(prevState => !prevState)
  }

  return (
    <div className="container" id="poetsen-one-regular">
      {isAdmin ? (
        <div className="wrapper">
          <div className="button-container">
            <div className="button-wrapper">
              <button onClick={handleShowCreate}>Create Movie</button>
              <button onClick={handleShowUsers}>Show Users</button>
            </div>
          </div>

          {showCreate && <CreateMovie token={token} />}
          {showUsersList && <UsersList token={token} />}

          <EditndDelete token={token} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AdminPage
