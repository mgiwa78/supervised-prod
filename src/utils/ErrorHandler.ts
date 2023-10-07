export default (error) => {
  if (error.reponse.data.message) {
    throw new Error(error.reponse.data.message)
  }
}
