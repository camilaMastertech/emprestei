import * as mobilenet from '@tensorflow-models/mobilenet'
import '@tensorflow/tfjs'

type ClassificationResult = {
  label: string
  confidence: number
}

let modelPromise: Promise<mobilenet.MobileNet> | null = null

const getModel = () => {
  if (!modelPromise) {
    modelPromise = mobilenet.load()
  }
  return modelPromise
}

const loadImageFromDataUrl = (dataUrl: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Falha ao carregar imagem para classificação'))
    image.src = dataUrl
  })

export const classifyObjectFromDataUrl = async (dataUrl: string): Promise<ClassificationResult | null> => {
  const image = await loadImageFromDataUrl(dataUrl)
  const model = await getModel()
  const predictions = await model.classify(image)

  if (!predictions.length) return null

  const topPrediction = predictions[0]
  return {
    label: topPrediction.className.split(',')[0].trim(),
    confidence: topPrediction.probability,
  }
}

