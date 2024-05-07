import React, { useState } from "react"
import MovieManager from "../../components/adminComponents/CreateMovie"
import CreateMovie from "../../components/adminComponents/CreateMovie"
import EditndDelete from "../../components/adminComponents/EditndDelete"
import UsersList from "../../components/adminComponents/UsersList"

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
    <div>
      {isAdmin ? (
        <div>
          <button onClick={handleShowCreate}>Create Movie</button>
          {showCreate && <CreateMovie />}

          <button onClick={handleShowUsers}>Show Users</button>
          {showUsersList && <UsersList token={token} />}

          <EditndDelete />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AdminPage
