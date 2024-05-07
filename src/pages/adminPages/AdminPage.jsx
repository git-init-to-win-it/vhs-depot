import React, { useState } from "react"
import MovieManager from "../../components/adminComponents/CreateMovie"
import CreateMovie from "../../components/adminComponents/CreateMovie"
import EditndDelete from "../../components/adminComponents/EditndDelete"

const AdminPage = ({ token }) => {
  const [showCreate, setShowCreate] = useState(false)

  const handleShowCreate = () => {
    setShowCreate(prevState => !prevState)
  }

  return (
    <div>
      <div>
        <button onClick={handleShowCreate}>Create Movie</button>
        {showCreate && <CreateMovie token={token} />}
        <EditndDelete token={token} />
      </div>
    </div>
  )
}

export default AdminPage
