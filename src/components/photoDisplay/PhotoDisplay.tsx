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
  //const [styleImage, setStyleImage] = useState('/images/The_Great_Wave_off_Kanagawa.jpg' as string)
  console.log('imageToStyle.width:' + styleImageUrl + ' ' + imageToStyleUrl)
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
      // Convert image data to a data URL
      const dataURL = imageCanvas.toDataURL('image/png')

      // Create a download link
      const a = document.createElement('a')
      a.href = dataURL
      a.download = 'image.png' // Set the desired file name

      // Trigger the download
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
            sx={{ marginTop: '10px' }}
            variant='contained'
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
