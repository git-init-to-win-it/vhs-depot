import React, { useState } from "react"
import MovieManager from "../../components/adminComponents/CreateMovie"
import CreateMovie from "../../components/adminComponents/CreateMovie"
import EditndDelete from "../../components/adminComponents/EditndDelete"

<<<<<<< HEAD
const AdminPage = ({ token }) => {
=======
const AdminPage = ({ token, isAdmin }) => {
>>>>>>> main
  const [showCreate, setShowCreate] = useState(false)

  const handleShowCreate = () => {
    setShowCreate(prevState => !prevState)
  }

  return (
    <div>
      {isAdmin ? (
      <div>
        <button onClick={handleShowCreate}>Create Movie</button>
<<<<<<< HEAD
        {showCreate && <CreateMovie token={token} />}
        <EditndDelete token={token} />
      </div>
=======
        {showCreate && <CreateMovie />}
        <EditndDelete />
      </div> ) : (
        <p>Loading...</p>
       )}
>>>>>>> main
    </div>
  )
}

export default AdminPage
