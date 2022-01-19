<p align="center">
    <img src="https://media.giphy.com/media/4cdIVYlOzIz6Rswdh6/giphy.gif" width="200">
</p>

# Heart of Frogg

[![Go Report Card](https://goreportcard.com/badge/github.com/jessemillar/heart-of-frogg)](https://goreportcard.com/report/github.com/jessemillar/heart-of-frogg) [![Man Hours](https://img.shields.io/endpoint?url=https%3A%2F%2Fmh.jessemillar.com%2Fhours%3Frepo%3Dhttps%3A%2F%2Fgithub.com%2Fjessemillar%2Fheart-of-frogg.git)](https://jessemillar.com/r/man-hours)

I wanted a way to display my heart rate live on [my Twitch stream](http://jessemillar.com/r/twitch) using [OBS](https://obsproject.com/). There was not a current method for doing that so Heart of Frogg was born!

## Usage

1. [Download the heart-of-frogg repository](https://github.com/bfroggio/heart-of-frogg/archive/refs/heads/main.zip) to your machine
    - The download contains the server and the HTML that will be displayed in OBS
    - The server is compiled for Windows currently but is written in the Go programming language and can easily be compiled for other operating systems if needed
1. Unzip the download
1. Run the local server by double-clicking `heart-of-frogg.exe`
1. Install the "Heart of Frogg" app on your Fitbit
    - For the Versa 3 and the Sense, [use this app](https://gallery.fitbit.com/details/18706b64-15d2-4e58-a2c1-3ff4e3093bd3)
    - For older devices, [use this app](https://gallery.fitbit.com/details/bd7f772f-b717-4dad-920d-540c0e32722c)
1. [Find your computer's internal IP address](https://lifehacker.com/how-to-find-your-local-and-external-ip-address-5833108)
1. Input your computer's internal IP address and the `heart-of-frogg.exe` server's port into the "Heart of Frogg" Fitbit app settings on your phone
1. Start the "Heart of Frogg" watch app on your Fitbit device
1. Create a web source in OBS that points to `http://localhost:8080/ui`
1. Play a game that gets your heart rate pumping!

## Customization

### Server Port

The `heart-of-frogg.exe` server defaults to using port 8080. If you already use port 8080 for something else, you'll need to change the server port. To do this, edit `config.toml` to contain the port number you want to use. You'll need to restart the server and then update your Fitbit settings and OBS web source to use the new port number.

### UI

The HTML file in `/ui` is what's shown in OBS. If you want to customize what it looks like, go ahead! Tweak to your liking and then refresh your OBS source to see your changes. See the "How It Works" section below for details.

## How It Works

- The `heart-of-frogg.exe` server listens for HTTP POST calls at `http://localhost:8080/heart/:rate`
- The Fitbit app checks your heart rate and then makes an HTTP POST call with the heart rate value to the server (e.g. `http://192.168.1.101:8080/heart/86`
- OBS loads `index.html` as a source which uses JavaScript to periodically do an HTTP GET request to `http://localhost:8080/heart` to retrieve your current heart rate as reported to the server by your watch
    - Currently, `index.html` shows an animation of a heart beating at the appropriate rate but it would be easy to instead show a number since the number value of your heart rate is already known by `index.html`
