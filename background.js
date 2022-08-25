// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.local.set({
//         "isExtensionEnabled": true
//     })
//     chrome.storage.local.set({
//         "legend_inset": '15px auto auto 15px'
//     })
//     chrome.storage.local.set({
//         "legend_inset__price": '15px auto auto 200px'
//     })
// });

// chrome.action.onClicked.addListener((tab) => {

//     chrome.storage.local.get(["isExtensionEnabled"], (data) => {

//         let isExtensionEnabled = data.isExtensionEnabled

//         var newStatus = isExtensionEnabled ? false : true // If on, turn off. If off, turn on.

//         chrome.storage.local.set({
//             "isExtensionEnabled": true
//         })cd ide

//         // var imageData = newStatus ? chrome.runtime.getURL('/images/templogo.png') : chrome.runtime.getURL('/images/templogo_grey.png')
//         // chrome.action.setIcon({path: imageData}, () => { /* Don't need the callback */ });

//         chrome.tabs.query({}, tabs => {
//             tabs.forEach(tab => {
//                 // tab.url only shows up if its ticket master or livenation, since we defined the ext only to work for those two.
//                 tab.url ? chrome.tabs.sendMessage(tab.id, newStatus) : null
//             });
//         });

//     });

// });

// intercept and capture authorization headers
chrome.webRequest.onBeforeSendHeaders.addListener(async function(details) {
    if (details.url.includes('messages?')) {

        console.log(details.tabId)

        let myHeaders = {}
        let headers = details.requestHeaders
        console.log(headers)
        for (var i=0; i < headers.length; i++) {
            let header = headers[i]['name'].toLowerCase()
            let value = headers[i]['value']
            

            if (header == 'authorization' || header == 'x-super-properties') {
                myHeaders[header] = value
            }
        }

        await chrome.storage.local.set({
            'authorization': myHeaders['authorization'],
            'x-super-properties': myHeaders['x-super-properties']
        })

        chrome.tabs.sendMessage(details.tabId, {
            'initiator': 'authorization',
            'authorization': myHeaders['authorization'],
            'x-super-properties': myHeaders['x-super-properties']
        })
        
    }
}, {urls: ['<all_urls>']}, ['requestHeaders'])