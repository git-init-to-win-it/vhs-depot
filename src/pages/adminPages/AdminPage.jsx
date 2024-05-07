import React, { useState } from "react"
import MovieManager from "../../components/adminComponents/CreateMovie"
import CreateMovie from "../../components/adminComponents/CreateMovie"
import EditndDelete from "../../components/adminComponents/EditndDelete"

const AdminPage = ({ token, isAdmin }) => {
  const [showCreate, setShowCreate] = useState(false)

  const handleShowCreate = () => {
    setShowCreate(prevState => !prevState)
  }

  return (
    <div>
      {isAdmin ? (
        <div>
          <button onClick={handleShowCreate}>Create Movie</button>
          {showCreate && <CreateMovie />}
          <EditndDelete />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AdminPage
