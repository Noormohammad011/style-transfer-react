import { Button, Card, Grid } from '@mui/material'
import styles from './photo.module.css'

type Props = {
  styleImageUrl?: string | undefined
  imageToStyleUrl?: string
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
  const resizeAndStylizeImage = (
    imageToStyle: HTMLImageElement,
    styleImage: HTMLImageElement,
    imageCanvas: HTMLCanvasElement,
    targetCanvas: HTMLCanvasElement
  ) => {
    let imageCanvasCtx = imageCanvas.getContext('2d')

    let imageAspectRatio = imageToStyle.height / imageToStyle.width
    imageCanvas.height = imageCanvas.width * imageAspectRatio
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

  console.log('styleImageUrl:' + resizeAndStylizeImage)

  const handleDownloadImage = () => {
    let imageCanvas = document.querySelector(
      '#canvasContainer2'
    ) as HTMLCanvasElement

    let imageCanvasCtx = imageCanvas.getContext('2d')

    let downloadImgData = imageCanvasCtx?.getImageData(
      0,
      0,
      imageCanvas.width,
      imageCanvas.height
    )

    if (downloadImgData) {
      const dataURL = imageCanvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = dataURL
      a.download = 'image.png' 
      a.click()
    }
  }

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
          <Button
            variant='contained'
            sx={{ width: '100%', mt: 2 }}
            onClick={handleDownloadImage}
          >
            Download
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default PhotoDisplay
