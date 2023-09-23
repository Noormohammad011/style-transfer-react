import FastStyleTransferModel from '../components/fastStyleTransferModel/FastStyleTransferModel'
import { Button, Card } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ImageSelector from '../components/imageSelector/ImageSelector'
import { useState } from 'react'
import PhotoDisplay from '../components/photoDisplay/PhotoDisplay'
import styles from './home.module.css'
import { loadImage } from '../modules/utils'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
  },

  card: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export enum CameraState {
  start,
  started,
  stop,
  stopped,
}

const HomePage = () => {
  const [state, setState] = useState<{
    camera: CameraState
    mode: string
    styleImage: string
    imageToStyle: string
  }>({
    camera: CameraState.stopped,
    mode: 'photo',
    styleImage: '/images/The_Great_Wave_off_Kanagawa.jpg',
    imageToStyle: '/images/turtle.jpg',
  })

  const updateStyleImageCallback = (styleImageUrl: string) => {
    setState({
      ...state,
      styleImage: styleImageUrl,
    })
  }

  const updateImageToStyleCallback = (imageToStyle: string) => {
    setState({
      ...state,
      imageToStyle: imageToStyle,
    })
  }

  const predefinedStylesList = [
    {
      url: '/images/The_Great_Wave_off_Kanagawa.jpg',
      name: 'kanagawa_great_wave',
    },
    {
      url: '/images/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg',
      name: 'hubble_pillars_of_creation',
    },
    {
      url: '/images/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      name: 'van_gogh_starry_night',
    },
    {
      url: '/images/JMW_Turner_-_Nantes_from_the_Ile_Feydeau.jpg',
      name: 'turner_nantes',
    },
    {
      url: '/images/Les_Demoiselles_d%27Avignon.jpg',
      name: 'picasso_demoiselles_avignon',
    },
    { url: '/images/Large_bonfire.jpg', name: 'fire' },
    {
      url: '/images/Derkovits_Gyula_Woman_head_1922.jpg',
      name: 'derkovits_woman_head',
    },
    {
      url: '/images/Untitled_%28Still_life%29_%281913%29_-_Amadeo_Souza-Cardoso_%281887-1918%29_%2817385824283%29.jpg',
      name: 'amadeo_style_life',
    },
    {
      url: '/images/Derkovits_Gyula_Talig%C3%A1s_1920.jpg',
      name: 'derkovtis_talig',
    },
  ]

  const predefinedImagesToStyle = [
    { url: '/images/turtle.jpg', name: 'turtle.jpg' },
  ]
  const classes = useStyles()

  return (
    <>
      <FastStyleTransferModel>
        {(doStyleTransfer) => {
          {
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
                doStyleTransfer(imageToStyleImgData, styleImage, targetCanvas)
              }
            }

            var stylizeImage = async () => {
              let canvas1 = document.querySelector(
                '#canvasContainer1'
              ) as HTMLCanvasElement
              let canvas2 = document.querySelector(
                '#canvasContainer2'
              ) as HTMLCanvasElement

              let styleImageP = loadImage(state.styleImage)
              let imageToStyleP = loadImage(state.imageToStyle)

              Promise.all([styleImageP, imageToStyleP])
                .then((images) => {
                  let styleImage = images[0]
                  let imageToStyle = images[1]
                  resizeAndStylizeImage(
                    imageToStyle,
                    styleImage,
                    canvas1,
                    canvas2
                  )
                })
                .catch((err) => console.error(err))
            }
          }
          return (
            <div>
              <div className={styles.container} key='dasboard'>
                <div className={styles.inputFields}>
                  <div className={styles.imgWraper}>
                    <h3>Content Image</h3>
                    <Card>
                      {state.mode == 'photo' && (
                        <ImageSelector
                          listKey='imagesToStyle'
                          list={predefinedImagesToStyle}
                          uploadImageLabel='Upload Image'
                          setStateCallback={updateImageToStyleCallback}
                        />
                      )}
                    </Card>
                  </div>
                  <div className={styles.imgWraper}>
                    <h3>Style Image</h3>
                    <Card className={classes.card}>
                      <ImageSelector
                        listKey='styleImages'
                        list={predefinedStylesList}
                        uploadImageLabel='Upload Style'
                        setStateCallback={updateStyleImageCallback}
                      />
                    </Card>
                  </div>
                </div>
                <div className={styles.button}>
                  <Button
                    sx={{ width: '100%', mt: '20px' }}
                    variant='contained'
                    onClick={() => stylizeImage()}
                  >
                    GENERATE
                  </Button>
                </div>
                <div className={styles.result}>
                  {state.mode == 'photo' && (
                    <PhotoDisplay
                      styleImageUrl={state.styleImage}
                      imageToStyleUrl={state.imageToStyle}
                      doStyleTransferCallback={doStyleTransfer}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </FastStyleTransferModel>
    </>
  )
}

export default HomePage
