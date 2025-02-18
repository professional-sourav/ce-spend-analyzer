function App() {

  const handleBgColorChange = async () => {

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || tab.id === undefined) {
      console.error("Active tab not found or tab ID is undefined.");
      return;
    }

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [randomColor],
      func: changeBgColor,
    });
  }

  const changeBgColor = (color: string) => {

    console.log(`Changing background color to #${color}`);
    
    document.body.style.backgroundColor = `#${color}`;
  }

  return (
    <>
      <button onClick={handleBgColorChange}>Change Background Color</button>
    </>
  )
}

export default App
