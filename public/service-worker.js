const contextMenu = {
    id: 'contextMenu',
    title: 'Spend Analysis',
    contexts: ['selection']
};

chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onClicked.addListener(async function (info, tab) {

    if (info.menuItemId === 'contextMenu' && info.selectionText) {

        if (isNaN(info.selectionText)) {
            console.error('Selected text is not a number');
            return;
        }

        const selectedAmount = info.selectionText;

        const totalAmount = await getTotalAmount();

        console.log('Total amount is ' + totalAmount);        

        if (totalAmount) {

            chrome.storage.sync.get(['totalAmount', 'max_spend_limit'], function (budget) {
                let newTotal = 0;
                if (budget.totalAmount) {
                    newTotal += parseInt(budget.totalAmount);
                }

                newTotal += parseInt(selectedAmount);

                chrome.storage.sync.set({ 'totalAmount': newTotal }, function () {
                    console.log('Total amount set to ' + newTotal, budget.max_spend_limit);
                    
                    if (newTotal >= budget.max_spend_limit) {
                        const notifOptions = {
                            type: 'basic',
                            iconUrl: 'images/icon48.png',
                            title: 'Limit reached!',
                            message: 'Uh oh! Looks like you\'ve reached your limit!'
                        };

                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
            });
        } else {
            console.error('Not able to retrive any amount from storage');
            chrome.storage.sync.set({ 'totalAmount': selectedAmount }, function () {
                console.log('Total amount set to ' + selectedAmount);
            });
        }
    }
});

const getTotalAmount = async () => {

    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['totalAmount'], function (budget) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            resolve(budget.totalAmount);
        });
    });
};
