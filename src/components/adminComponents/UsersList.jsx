import React, { useState, useEffect } from "react"
import "../../styles/userslist.css"

const UsersList = ({ token }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading && !users) {
    return <div>Loading...</div>
  }

  return (
    <div className="users-container">
      <div className="users-wrapper">
        <h1>Users List</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default UsersList
