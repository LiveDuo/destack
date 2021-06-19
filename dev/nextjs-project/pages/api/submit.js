export default (_, res) => {
  // res.status(200).json({ message: 'Form Submitted' })
  res.status(400).json({ message: 'Something went wrong' })
}
