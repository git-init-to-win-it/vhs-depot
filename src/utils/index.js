// utils.js
export const getMovies = async () => {
  try {
    const response = await fetch(API_URL)
    return await response.json()
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
