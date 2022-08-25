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
            title: 'venue name',
            url:
              '',
            // thumbnail
            // - small image in top right corner.
            thumbnail: {
              name: 'name_of_user'
            },
            // embed description
            // - text on 3rd row
            description: 'date of event',
            // custom embed fields: bold title/name, normal content/value below title
            // - located below description, above image.
            fields: [
              {
                name: 'Location:',
                value: 'event location',
              },
              {
                name: 'Ticket Info:',
                value: 'ticket info',
              }
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