import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  return builder?.image(source).auto('format').fit('max')
}
