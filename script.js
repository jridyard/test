const testing = 'http://localhost:5000'
const production = 'https://www.ticketdecisionassistant.com'
globalThis.environment = production

window.addEventListener('DOMContentLoaded', async (e) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2300
    })

    const ErrorToast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        showCloseButton: true
    })

    const LargeErrorToast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast',
            title: 'swal-title-33'
        },
        showConfirmButton: false,
        timer: 5000
    })


    document.querySelector('#confirm-name').addEventListener('click', async () => {
        let desired_user_name = document.querySelector('#user_name').value
        if (desired_user_name.length >= 1) {
            chrome.storage.local.set({
                'user_name': desired_user_name
            })
            await Toast.fire({ icon: 'success', title: 'Your name has been set!' })
            return
        }

        await Toast.fire({ icon: 'error', title: 'Your name can\'t be blank!' })
    })

    document.querySelector('#confirm-discord').addEventListener('click', async () => {
        let discord_channel_url = document.querySelector('#discord_channel_url').value
        let isValidDiscordWebhook = await isDiscordLinkValid(discord_channel_url)
        if (isValidDiscordWebhook == 'Success') {
            chrome.storage.local.set({
                'discord_channel_url': discord_channel_url
            })
            await Toast.fire({ icon: 'success', title: 'Your discord is set up and ready to go!' })
            return
        }

        chrome.storage.local.set({
            'discord_channel_url': ''
        })

        if (isValidDiscordWebhook.includes('https://discord.com/channels/1010934604561112345/1010934604561154321')) {
            await LargeErrorToast.fire({ icon: 'error', title: isValidDiscordWebhook})
            return
        } else {
            await ErrorToast.fire({ icon: 'error', title: isValidDiscordWebhook})
        }
    })


    let discord_channel_url_raw = await chrome.storage.local.get('discord_channel_url')
    let discord_channel_url = discord_channel_url_raw['discord_channel_url']
    discord_channel_url ? document.querySelector('#discord_channel_url').value = discord_channel_url : document.querySelector('#discord_channel_url').value = ''

    let user_name_raw = await chrome.storage.local.get('user_name')
    let user_name = user_name_raw['user_name']
    user_name ? document.querySelector('#user_name').value = user_name : document.querySelector('#user_name').value = ''

})

async function isDiscordLinkValid(channel_url) {
    const channel_id = channel_url.split('/')[channel_url.split('/').length - 1]
    if (channel_id.length != 19 || isNaN(channel_id)) {
        return 'Invalid Channel Link. Your Discord URL should look like this: https://discord.com/channels/1010934604561112345/1010934604561154321'
    }
    else if (channel_url == 'https://discord.com/channels/1010934604561112345/1010934604561154321') {
        return 'You can\'t use the example channel URL. The channel URL you provide is important. It\'s where your messages will be sent.'
    }

    try {
        const get_channel = await fetch(`${globalThis.environment}/api/get_channel`, {
            "method": "POST",
            "body": JSON.stringify({
                'channel_id': channel_id.toString()
            }),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        }).then((response) => response.json())
        .then((data) => {
            return data.response
        })
        .catch(err => {
            console.error(err)
            return 'Unkown error occured. Please contact an admin.'
        })
        return get_channel
    }
    catch (err) {
        console.error(err)
        return 'Unkown error occured. Please contact an admin.'
    }
}