import Appbar from '../components/Appbar/Appbar'
import styles from './layout.module.css'
export const siteTitle = 'Fast Style Transfer for Arbitrary Styles Demo'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <>
      <Appbar />
      <div className={styles.container}>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <a href='/'>
              <a>← Back to home</a>
            </a>
          </div>
        )}
      </div>
    </>
  )
}
