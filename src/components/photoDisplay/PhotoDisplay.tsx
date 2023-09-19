/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useEffect } from 'react'

import { Card, Grid } from '@mui/material'
import { loadImage } from '../../modules/utils'
import styles from './photo.module.css'

type Props = {
  styleImageUrl: string
  imageToStyleUrl: string
  doStyleTransferCallback: (
    imageToStyle: ImageData,
    styleImage: HTMLImageElement,
    canvasDest: HTMLCanvasElement
  ) => void
}

//let styleImage: HTMLImageElement;

const PhotoDisplay = ({
  styleImageUrl,
  imageToStyleUrl,
  doStyleTransferCallback,
}: Props) => {
  //const [styleImage, setStyleImage] = useState('/images/The_Great_Wave_off_Kanagawa.jpg' as string)

  const resizeAndStylizeImage = (
    imageToStyle: HTMLImageElement,
    styleImage: HTMLImageElement,
    imageCanvas: HTMLCanvasElement,
    targetCanvas: HTMLCanvasElement
  ) => {
    let imageCanvasCtx = imageCanvas.getContext('2d')

    let imageAspectRatio = imageToStyle.height / imageToStyle.width
    imageCanvas.height = imageCanvas.width * imageAspectRatio
    console.log('New targetCanvas.height:' + imageCanvas.height)
    //const imgSize = Math.min(inputImage.width, inputImage.height);
    // The following two lines yield a central based cropping.
    // They can both be amended to be 0, if you wish it to be
    // a left based cropped image.
    //const left = (inputImage.width - imgSize) / 2;
    //const top = (inputImage.height - imgSize) / 2;
    //var left = 0; // If you wish left based cropping instead.
    //var top = 0; // If you wish left based cropping instead.
    if (imageCanvasCtx != null) {
      imageCanvasCtx.drawImage(
        imageToStyle,
        0,
        0,
        imageToStyle.width,
        imageToStyle.height,
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      )
      let imageToStyleImgData = imageCanvasCtx.getImageData(
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
      )
      doStyleTransferCallback(imageToStyleImgData, styleImage, targetCanvas)
    }
  }

  useEffect(() => {
    let canvas1 = document.querySelector(
      '#canvasContainer1'
    ) as HTMLCanvasElement
    let canvas2 = document.querySelector(
      '#canvasContainer2'
    ) as HTMLCanvasElement

    let styleImageP = loadImage(styleImageUrl)
    let imageToStyleP = loadImage(imageToStyleUrl)

    Promise.all([styleImageP, imageToStyleP])
      .then((images) => {
        let styleImage = images[0]
        let imageToStyle = images[1]
        resizeAndStylizeImage(imageToStyle, styleImage, canvas1, canvas2)
      })
      .catch((err) => console.error(err))
  })

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        <canvas id='canvasContainer1' className={styles.canvasHidden} />
        <Grid key='canvasContainer2' item xs={12} sm={12} md={12}>
          <Card className={styles.card}>
            <canvas id='canvasContainer2' className={styles.canvasPhoto} />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PhotoDisplay
