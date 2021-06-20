import formidable from 'formidable'

const form = new formidable.IncomingForm()

const formParse = (req) => new Promise((r, j) => form.parse(req, (e, f) => (!e ? r(f) : j(e))))

export default async (req, res) => {
  try {
    const fields = await formParse(req)
    console.log(fields)
    res.status(200).json({ message: 'Form Submitted' })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}
