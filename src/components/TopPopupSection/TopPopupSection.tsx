import { useEffect, useState } from 'react'
import './TopPopupSection.css'

const TopPopupSection = () => {

    const [maxSpendLimit, setMaxSpendLimit] = useState(0)

    useEffect(() => {
        chrome.storage.sync.get(['max_spend_limit'], (result) => {

            setMaxSpendLimit(result.max_spend_limit)
        })
    }, [maxSpendLimit])

  return (
    <div className="top-popup-section">
        <div>
            <label htmlFor="max_spend_limit">Max Spend Limit:</label>
            <input type="number" id="max_spend_limit" name="max_spend_limit" value={maxSpendLimit} />
        </div>
    </div>
  )
}

export default TopPopupSection
