import { useState, useEffect } from 'react'

const useWidth = (width = 768) => {

    const [lessThan, setLessThan] = useState(false)

    useEffect(() => {

        window.addEventListener('resize', resize)
        resize()

        return () => window.removeEventListener('resize', resize)
    })

    const resize = () => {
        if (window.innerWidth < width) {
            setLessThan(true)
        } else {
            setLessThan(false)
        }
    }

    return lessThan
}

export { useWidth }
