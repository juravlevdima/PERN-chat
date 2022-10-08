import { unlink } from 'fs'
import path from 'path'

export const deleteImage = (image: string): void => {
  const imageName = image.replace(/.*(?=\/)/g, '').replace(/\//, '')

  unlink(`${path.resolve()}/imageStorage/${imageName}`, (e) => {
    if (e) {
      console.log(`Image ${imageName} not found!`) // ---------------LOG---------------------
    } else {
      console.log(`Product image ${imageName} successfully deleted.`) // ---------LOG----------
    }
  })
}
