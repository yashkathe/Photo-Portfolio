import React from "react"
import classes from "./HomePhotoTimer.module.css"

/**
 * Shows a 5-second cycle: 1 dot, 2 dots, 3 dots, camera, camera click.
 * step: 0 = 1 dot, 1 = 2 dots, 2 = 3 dots, 3 = 📷, 4 = 📸
 */
const HomePhotoTimer = ({ step }) => {
    const isDots = step <= 2
    const dotCount = step + 1
    const isCamera = step === 3
    const isClick = step === 4

    return (
        <div className={classes.wrapper} role="status" aria-label="Photo cycle timer">
            {isDots && (
                <span className={classes.dots}>
                    {[1, 2, 3].map((i) => (
                        <span
                            key={i}
                            className={`${classes.dot} ${i <= dotCount ? classes.dotOn : ""}`}
                        />
                    ))}
                </span>
            )}
            {isCamera && <span className={classes.emoji} aria-hidden>📷</span>}
            {isClick && <span className={classes.emojiClick} aria-hidden>📸</span>}
        </div>
    )
}

export default HomePhotoTimer
