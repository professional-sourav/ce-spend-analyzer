import { useEffect, useState } from 'react'
import './BottomPopupSection.css'

const BottomPopupSection = () => {

  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    chrome.storage.sync.get(['totalAmount'], (result) => {
      setTotalAmount(result.totalAmount)
    });
  }, [totalAmount]);

  const handleReset = () => {
  
  }
    
  
  return (
    <div className="bottom-popup-section">
      <div className='total-spend'>
        <span>Total Spend:</span>        
        <span><strong>{totalAmount}</strong></span>
      </div>
      <div className='total-spend-action'>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default BottomPopupSection
