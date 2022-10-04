import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './imageStorage')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

const uploader = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Только .png, .jpg и .jpeg формат!'))
    }
  },
})

export default uploader
