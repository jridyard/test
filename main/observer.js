async function trackDataCreation() {
    
    async function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector)); // No need for length calculation on this one. get by ID returns true or false if the element exists or not.
            }
            let observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }    

    waitForElm(selector='.event-header__event-date').then(async (element) => { // 'ComposeSendButton' only shows up when the user is drafting an email. It's the best identifier element for the compsoe view.
        alert("needle!")
        const text = getParent(element, n=10).outerHTML

        navigator.clipboard.writeText(text);
    });  

}

function getParent(div, n) {
    for (var i=0; i < n; i++) {  
      div = div.parentElement
    }
    return div
}
