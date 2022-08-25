window.retrys = 10
console.log('sdfljksdgkljsdgkjsdlgkdslgk3993849')
createElementAndAppendToBody(elementType='a', elementId='ticketInfoMetaData', elementDisplay='none', dataAttr='ticketInfoMetaData')
// HELPER FUNCTION \\//
function createElementAndAppendToBody(elementType, elementId, elementDisplay, dataAttr) {
    try {
        let cart = window.digitalData.cart // find whatever window var you want here.
        let page = window.digitalData.page

        window.relevantVals = convertVals(cart, page)
        console.log('sldkjslkdlskd')
        setTimeout(() => {
            // trackDataCreation()
            let minimapImageUrl = document.querySelector('[aria-label="Venue Minimap Image"]') ? window.getComputedStyle(document.querySelector('[aria-label="Venue Minimap Image"]'))['background-image'] : 'https://static.artofwhere.net/img/shop/collection-preview-unavailable.png'
            window.relevantVals['minimapImageUrl'] = document.querySelector('[aria-label="Venue Minimap Image"]') ? minimapImageUrl.slice(5, minimapImageUrl.length - 2) : minimapImageUrl
            let customElement = document.createElement(elementType)
            customElement.id = elementId
            customElement.setAttribute(dataAttr, JSON.stringify( window.relevantVals))
            customElement.style.display = elementDisplay
            document.body.appendChild(customElement)
        }, 2500);

    } catch (err) {
        console.error(err)
        setTimeout(() => {
            console.log('hello error')
            if (window.retrys > 10) {
                createElementAndAppendToBody(elementType, elementId, elementDisplay, dataAttr)
                window.retrys -= 1
            }
        }, 250)
    }
}

function convertVals(cart, page) {

    let cartTotal = cart.total.cartTotal
    let basePrice = cart.item[0].price.basePrice
    let currency = cart.total.currency
    let ticketLocation = cart.item[0].productInfo.ticketLocation
    let ticketRow = ticketLocation.row
    let ticketSeatNumbers = ticketLocation.seatNumber ? ticketLocation.seatNumber : []// array [1, 2] => Seats 1 - 2
    let ticketSection = ticketLocation.section
    let ticketQuantity = cart.attributes.ticketQuantity
    let ticketType = cart.ticketType

    let pageAttrs = page.attributes
    let eventStart = pageAttrs.eventDate
    let eventName = pageAttrs.eventName
    let eventCity = pageAttrs.city
    let eventState = pageAttrs.state
    let eventVenue = pageAttrs.venueName

    var currency_symbols = {
        'USD': '$', // US Dollar
        'EUR': '€', // Euro
        'CRC': '₡', // Costa Rican Colón
        'GBP': '£', // British Pound Sterling
        'ILS': '₪', // Israeli New Sheqel
        'INR': '₹', // Indian Rupee
        'JPY': '¥', // Japanese Yen
        'KRW': '₩', // South Korean Won
        'NGN': '₦', // Nigerian Naira
        'PHP': '₱', // Philippine Peso
        'PLN': 'zł', // Polish Zloty
        'PYG': '₲', // Paraguayan Guarani
        'THB': '฿', // Thai Baht
        'UAH': '₴', // Ukrainian Hryvnia
        'VND': '₫', // Vietnamese Dong
        'CAD': 'CA $' // Weird Canadian Currency Symbol
    };
    

    return {
        'eventName': eventName,
        'eventDate': eventStart,
        'eventLocation': `${eventCity}, ${eventState} - ${eventVenue}`,
        'ticketDetails': `${ticketQuantity} ${ticketQuantity == 1 ? 'Ticket' : 'Tickets'} - Sec ${ticketSection}${ticketRow ? `, Row ${ticketRow}` : ''}${ticketSeatNumbers.length >= 1 ? ticketSeatNumbers.length == 1 ? `, Seat ${ticketSeatNumbers[0]}` : `, Seats ${ticketSeatNumbers[ticketSeatNumbers.length - 1]} - ${ticketSeatNumbers[0]}` : ''}`,
        'totalCost': `${currency_symbols[currency]}${cartTotal} (${currency_symbols[currency]}${basePrice})`,
        'checkoutURL': document.URL
    }

}

// function trackDataCreation() {
    
//     function waitForElm(selector) {
//         return new Promise(resolve => {
//             if (document.querySelector(selector)) {
//                 return resolve(document.querySelector(selector)); // No need for length calculation on this one. get by ID returns true or false if the element exists or not.
//             }
//             let observer = new MutationObserver(mutations => {
//                 if (document.querySelector(selector)) {
//                     resolve(document.querySelector(selector));
//                     observer.disconnect();
//                 }
//             });
//             observer.observe(document.body, {
//                 childList: true,
//                 subtree: true
//             });
//         });
//     }    


//     waitForElm(selector='[aria-label="Venue Minimap Image"]').then((minimapElement) => { // 'ComposeSendButton' only shows up when the user is drafting an email. It's the best identifier element for the compsoe view.
//         let minimapImageUrl = window.getComputedStyle(document.querySelector('[aria-label="Venue Minimap Image"]'))['background-image']
//         window.relevantVals['minimapImageUrl'] = minimapImageUrl.slice(5, minimapImageUrl.length - 2)
//         let customElement = document.createElement(elementType)
//         customElement.id = elementId
//         customElement.setAttribute(dataAttr, JSON.stringify( window.relevantVals))
//         customElement.style.display = elementDisplay
//         document.body.appendChild(customElement)
//     });

// }