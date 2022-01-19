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
