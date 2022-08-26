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


    waitForElm(selector='button:contains("Disable proxy and re-open tab")').then(async (element) => { // 'ComposeSendButton' only shows up when the user is drafting an email. It's the best identifier element for the compsoe view.
        alert("needle!")
        // const text = $('button:contains("Disable proxy and re-open tab")').parents().eq(2).prop("outerHTML")
        const newtext = document.querySelector('#ppt-widget-root').textContent.split(' ')[0]
        // alert(newtext)
    
    });

    waitForElm(selector='body').then(async (element) => {
        setTimeout(() => {
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browserName  = navigator.appName;
            var fullVersion  = ''+parseFloat(navigator.appVersion); 
            var majorVersion = parseInt(navigator.appVersion,10);
            var nameOffset,verOffset,ix;

            // In Opera, the true version is after "Opera" or after "Version"
            if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset+6);
            if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            fullVersion = nAgt.substring(verOffset+8);
            }
            // In MSIE, the true version is after "MSIE" in userAgent
            else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset+5);
            }
            // In Chrome, the true version is after "Chrome" 
            else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset+7);
            }
            // In Safari, the true version is after "Safari" or after "Version" 
            else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset+7);
            if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            fullVersion = nAgt.substring(verOffset+8);
            }
            // In Firefox, the true version is after "Firefox" 
            else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset+8);
            }
            // In most other browsers, "name/version" is at the end of userAgent 
            else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                    (verOffset=nAgt.lastIndexOf('/')) ) 
            {
            browserName = nAgt.substring(nameOffset,verOffset);
            fullVersion = nAgt.substring(verOffset+1);
            if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
            }
            }
            // trim the fullVersion string at semicolon/space if present
            if ((ix=fullVersion.indexOf(";"))!=-1)
            fullVersion=fullVersion.substring(0,ix);
            if ((ix=fullVersion.indexOf(" "))!=-1)
            fullVersion=fullVersion.substring(0,ix);

            majorVersion = parseInt(''+fullVersion,10);
            if (isNaN(majorVersion)) {
            fullVersion  = ''+parseFloat(navigator.appVersion); 
            majorVersion = parseInt(navigator.appVersion,10);
            }

            document.write(''
            +'Browser name  = '+browserName+'<br>'
            +'Full version  = '+fullVersion+'<br>'
            +'Major version = '+majorVersion+'<br>'
            +'navigator.appName = '+navigator.appName+'<br>'
            +'navigator.userAgent = '+navigator.userAgent+'<br>'
            )
        }, 3000);
    })

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
