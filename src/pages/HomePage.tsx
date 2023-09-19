/* eslint-disable @typescript-eslint/no-unused-vars */
import FastStyleTransferModel from '../components/fastStyleTransferModel/FastStyleTransferModel'
import { Card } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ImageSelector from '../components/imageSelector/ImageSelector'
import { useState } from 'react'


import PhotoDisplay from '../components/photoDisplay/PhotoDisplay'
import styles from './home.module.css'

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
    height: '100%',
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
    //console.log("Updating image: " + styleImageElement);
    setState({
      ...state,
      styleImage: styleImageUrl,
    })
  }

  const updateImageToStyleCallback = (imageToStyle: string) => {
    //console.log("Updating image: " + styleImageElement);
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
      url: '/images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg',
      name: 'kandinsky_composition_7',
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
      url: '/images/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
      name: 'munch_scream',
    },
    {
      url: '/images/Les_Demoiselles_d%27Avignon.jpg',
      name: 'picasso_demoiselles_avignon',
    },
    {
      url: '/images/Pablo_Picasso%2C_1911-12%2C_Violon_%28Violin%29%2C_oil_on_canvas%2C_Kr%C3%B6ller-M%C3%BCller_Museum%2C_Otterlo%2C_Netherlands.jpg',
      name: 'picasso_violin',
    },
    {
      url: '/images/Pablo_Picasso%2C_1911%2C_Still_Life_with_a_Bottle_of_Rum%2C_oil_on_canvas%2C_61.3_x_50.5_cm%2C_Metropolitan_Museum_of_Art%2C_New_York.jpg',
      name: 'picasso_bottle_of_rum',
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
    {
      url: '/images/Amadeo_de_Souza-Cardoso%2C_1915_-_Landscape_with_black_figure.jpg',
      name: 'amadeo_cardoso',
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
          return (
            <>
              <div>
                <div className={styles.container} key='dasboard'>
                  <div className={styles.inputFields}>
                    <Card className={classes.card}>
                      <ImageSelector
                        listKey='styleImages'
                        list={predefinedStylesList}
                        uploadImageLabel='Upload Style'
                        setStateCallback={updateStyleImageCallback}
                      />
                    </Card>
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
            </>
          )
        }}
      </FastStyleTransferModel>
    </>
  )
}

export default HomePage
