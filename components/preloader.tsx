'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide preloader when page is fully loaded
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    // Also hide on page load event
    const handleLoad = () => {
      setIsVisible(false)
    }

    window.addEventListener('load', handleLoad)
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        setIsVisible(false)
      }
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeOut 0.5s ease-out 1.8s forwards',
      }}
    >
      <style>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            visibility: visible;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .preloader-logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid #e5e5e5;
          border-top-color: #c11f1e;
          animation: spin 1.5s linear infinite;
          position: relative;
        }

        .preloader-text {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Roxborough CF', serif;
          font-size: 18px;
          color: #000;
          letter-spacing: 2px;
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="preloader-logo" />
        <div className="preloader-text">LOADING</div>
      </div>
    </div>
  )
}
