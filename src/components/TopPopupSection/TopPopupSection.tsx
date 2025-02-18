import { useEffect, useRef, useState } from 'react'
import './TopPopupSection.css'

const TopPopupSection = () => {

    const [maxSpendLimit, setMaxSpendLimit] = useState(0)

    const refMaxSpendLimit = useRef<HTMLInputElement>(null)

    useEffect(() => {
        chrome.storage.sync.get(['max_spend_limit'], (result) => {

            setMaxSpendLimit(result.max_spend_limit)
        })
    }, [maxSpendLimit])

    const handleSaveMaxSpendLimit = () => {
        // const maxSpendLimit = document.getElementById('max_spend_limit') as HTMLInputElement
        chrome.storage.sync.set({ max_spend_limit: refMaxSpendLimit.current?.value }, () => {
            console.log('Max Spend Limit is set to ' + refMaxSpendLimit.current?.value)
        })
    }

  return (
    <div className="top-popup-section">
        <div>
            <label htmlFor="max_spend_limit">Max Spend Limit:</label>
            <input type="number" id="max_spend_limit" name="max_spend_limit" ref={refMaxSpendLimit} />
            <button onClick={handleSaveMaxSpendLimit}>Save</button>
        </div>
    </div>
  )
}

export default TopPopupSection
