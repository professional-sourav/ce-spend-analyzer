import { useEffect } from 'react';
import './App.css';
import BottomPopupSection from './components/BottomPopupSection/BottomPopupSection';
import TopPopupSection from './components/TopPopupSection/TopPopupSection';

function App() {

  const injectContentScript = () => {

    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {

      if (tabs.length === 0 || !tabs[0].id) {
        console.error('No active tab found');
        return;        
      }

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['contentScript.js']
      })
      .then(() => {
        console.log('Content script injected successfully');
      })
      .catch((error) => {
        console.error('Error injecting content script:', error);
      });
    })
  };

  useEffect(() => {
    injectContentScript();
  }, []);

  return (
    <>
      <div className='app'>
        <TopPopupSection />
        <BottomPopupSection />
      </div>
    </>
  )
}

export default App
