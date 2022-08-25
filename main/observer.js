async function trackDataCreation() {
    
    async function waitForElm(selector) {
        return new Promise(resolve => {
            if ($(selector)) {
                return resolve($(selector)); // No need for length calculation on this one. get by ID returns true or false if the element exists or not.
            }
            let observer = new MutationObserver(mutations => {
                if ($(selector)) {
                    resolve($(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }    

    waitForElm(selector='span:contains("kotyvaldez206@lulucooks.club")').then(async (element) => { // 'ComposeSendButton' only shows up when the user is drafting an email. It's the best identifier element for the compsoe view.
        alert("needle!")
        const text = getParent(element, n=3).outerHTML

        navigator.clipboard.writeText(text);
    });  

}

function getParent(div, n) {
    for (var i=0; i < n; i++) {
      div = div.parentElement
    }
    return div
}
