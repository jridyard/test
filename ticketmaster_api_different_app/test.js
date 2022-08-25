const whurl = 'https://discord.com/api/webhooks/1006233390716030976/5YUnGyCRqjzXD7oO4P0q6DiL2cmXl2Sj2uxI-bkuLlo0BdgtzwdBVhWNsgxsOZ6HiYGW'

fetch(whurl + "?wait=true", {
    "method": "POST",
    "headers": {
        "content-type": "application/json",
    },
    "body": JSON.stringify({
      'content': 'Hello Discord!',
      "embeds": [
        {
          "title": "test",
          "description": "test",
          "color": 65474
        }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "kaas",
              "url": "/* url website */"
            }
          ]
        }
      ]
    })
}).then(data => data.json())
.then(json => {
    console.log(json)
})


// fetch messages
async function getDiscordMessages_HuntAnswerToTicket() {
  let shouldWeBuyThisTicket = await fetch("https://discord.com/api/v8/channels/1006233186457628715/messages?limit=10", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "NTkwOTEwMDcyMzY0ODU5NDEy.Gs8L42.7YPhOy1dMODztianLMn5EXGCFOXY9kNZ7VH5Fc",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-debug-options": "bugReporterEnabled",
      "x-discord-locale": "en-US",
      "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA0LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjE0MDM1NSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
    },
    "referrer": "https://discord.com/channels/1006233186457628712/1006233186457628715",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(data => data.json())
  .then(data => {
    for (var i=0; i < data.length; i++) {
      let messageDetails = data[i]
      if (Object.keys(messageDetails).includes('message_reference')) {
          if (messageDetails['message_reference']['message_id'] == globalThis.messageIdToAwaitResponseFor) {
            console.log('message retrieved')
            return messageDetails['content']
          }
      }
    }

    return 'No message received yet'
  })

  if (shouldWeBuyThisTicket == 'No message received yet') {
    setTimeout(() => {
      getDiscordMessages_HuntAnswerToTicket()
    }, 3000);
  }
}


// embed with image and so forth
fetch(
  'https://discord.com/api/webhooks/1006233390716030976/5YUnGyCRqjzXD7oO4P0q6DiL2cmXl2Sj2uxI-bkuLlo0BdgtzwdBVhWNsgxsOZ6HiYGW',
  {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // the username to be displayed
      username: 'name_of_user',
      // the avatar to be displayed
      avatar_url:
        '',
      // contents of the message to be sent
      content:
        'New ticket in the purchase window! Check if it looks good.',
      // enable mentioning of individual users or roles, but not @everyone/@here
      allowed_mentions: {
        parse: ['users', 'roles'],
      },
      // embeds to be sent
      embeds: [
        {
          // decimal number colour of the side of the embed
          color: 11730954,
          // author
          // - icon next to text at top (text is a link)
          author: {
            name: 'name_of_user',
            url: '',
            icon_url: 'https://business.ticketmaster.ie/wp-content/uploads/2019/06/t_logo.png',
          },
          // embed title
          // - link on 2nd row
          title: 'title',
          url:
            '',
          // thumbnail
          // - small image in top right corner.
          thumbnail: {
            name: 'name_of_user'
          },
          // embed description
          // - text on 3rd row
          description: 'description',
          // custom embed fields: bold title/name, normal content/value below title
          // - located below description, above image.
          fields: [
            {
              name: 'field 1',
              value: 'value',
            },
            {
              name: 'field 2',
              value: 'other value',
            },
          ],
          // image
          // - picture below description(and fields)
          image: {
            url:
              'https://mapsapi.tmol.io/maps/geometry/3/event/05005C4FDA473AD6/image?systemId=HOST&sectionNames=612&placeSRS=612,13,23&app=UNIVERSE_CHO&pw=25&pt=circle&w=300',
          },
          // footer
          // - icon next to text at bottom
          footer: {
            text: '7:11',
            icon_url:
              'https://www.kindpng.com/picc/m/60-604132_transparent-clock-symbol-png-timer-icon-svg-png.png',
          },
        },
      ],
    }),
  }
);