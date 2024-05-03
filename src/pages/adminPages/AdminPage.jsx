import React, { useState } from "react"
import MovieManager from "../../components/CreateMovie"
import CreateMovie from "../../components/CreateMovie"
import EditndDelete from "../../components/EditndDelete"

const AdminPage = () => {
  const [currentComponent, setCurrentComponent] = useState("Create")

  const handleComponentChange = component => {
    setCurrentComponent(component)
  }

  return (
    <div>
      <div>
        <div>
          <button onClick={() => handleComponentChange("Create")}>
            Create
          </button>
          <button onClick={() => handleComponentChange("Edit")}>Edit</button>
          <button onClick={() => handleComponentChange("Delete")}>
            Delete
          </button>
        </div>
      </div>
      {currentComponent === "Create" && <CreateMovie />}
      {currentComponent === "Edit" && <EditndDelete edit={true} />}
      {currentComponent === "Delete" && <EditndDelete delete={true} />}
    </div>
  )
}

export default AdminPage
