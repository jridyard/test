async function trackDataCreation() {
    
    function waitForElm(selector) {
        return new Promise(resolve => {
            if ($(selector)[0]) {
                return resolve($(selector)[0])
            }
            let observer = new MutationObserver(mutations => {
                if ($(selector)[0]) {
                    resolve($(selector)[0])
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }    


    waitForElm(selector='span:contains("More Info")').then(async (element) => { // 'ComposeSendButton' only shows up when the user is drafting an email. It's the best identifier element for the compsoe view.
        alert("needle!")
        const text = element.outerHTML
        alert(text)
        navigator.clipboard.writeText(text);
    });  

}

function getParent(div, n) {
    for (var i=0; i < n; i++) {
        try {
            if (div.parentElement) {
                div = div.parentElement
            }
        } catch (err) {
            // err
        }
    }
    return div
}
