// utils.js
const API_URL = "https://vhs-depot.onrender.com/api/movie"

export const getMovies = async () => {
  try {
    const response = await fetch(API_URL)
    console.log(response)
    return await response.json()
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
