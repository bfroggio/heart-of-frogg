> Note: I no longer stream to Twitch or own a Fitbit. You're welcome to try using it or to modify the code yourself, but I am unable to offer support if you get stuck.

<p align="center">
    <img src="https://media.giphy.com/media/4cdIVYlOzIz6Rswdh6/giphy.gif" width="200">
</p>

# Heart of Frogg

[![Go Report Card](https://goreportcard.com/badge/github.com/jessemillar/heart-of-frogg)](https://goreportcard.com/report/github.com/jessemillar/heart-of-frogg)

I wanted a way to display my heart rate live on [my Twitch stream](http://jessemillar.com/r/twitch) using [OBS](https://obsproject.com/). There was not a current method for doing that so Heart of Frogg was born!

## Usage

1. [Download the heart-of-frogg repository](https://github.com/bfroggio/heart-of-frogg/archive/refs/heads/main.zip) to your machine
    - The download contains the server and the HTML that will be displayed in OBS
    - The server is compiled for Windows currently but is written in the Go programming language and can easily be compiled for other operating systems if needed
1. Unzip the download
1. Run the local server by double-clicking `heart-of-frogg.exe`
1. Install the "Heart of Frogg" app on your Fitbit
    - For the Versa 3 and the Sense, [use the phone paired to your Fitbit to tap this link and install the watch app when prompted](https://gallery.fitbit.com/details/18706b64-15d2-4e58-a2c1-3ff4e3093bd3)
    - For older devices, [use the phone paired to your Fitbit to tap this link and install the watch app when prompted](https://gallery.fitbit.com/details/bd7f772f-b717-4dad-920d-540c0e32722c)
1. Input your computer's internal IP address (as shown by `heart-of-frogg.exe` on server start) and the `heart-of-frogg.exe` server's port ("8080" by default) into the "Heart of Frogg" Fitbit app settings on your phone
    - **NOTE:** The port you enter in the Fitbit settings and the port in `config.toml` **MUST** match.
1. Start the "Heart of Frogg" watch app on your Fitbit device
1. Create a web source in OBS that points to `http://localhost:8080/ui/index.html`
1. Play a game that gets your heart rate pumping!

## Troubleshooting

If your watch isn't sending data to the server, check the following:

- Verify that the port you enter in the Fitbit settings and the port in `config.toml` are the same; they **MUST** match
- Verify that the IP address you enter in the Fitbit settings is the correct IP of the computer that's running `heart-of-frogg.exe`
    - The IP addresses that `heart-of-frogg.exe` automatically displays is just a best guess of what your IP is; try [manually finding your IP address](https://support.microsoft.com/en-us/windows/find-your-ip-address-in-windows-f21a9bbc-c582-55cd-35e0-73431160a1b9) (Heart of Frogg has only been tested with IPv4 IP addresses) 
- Restart the `heart-of-frogg.exe` server
- Try running `heart-of-frogg.exe` as Administrator (right click on `heart-of-frogg.exe` and select "Run as administrator")

## Customization

### Server Port

The `heart-of-frogg.exe` server defaults to using port 8080. If you already use port 8080 for something else, you'll need to change the server port. To do this, edit `config.toml` to contain the port number you want to use. You'll need to restart the server and then update your Fitbit settings and OBS web source to use the new port number.

### UI

`/ui/index.html` is what's shown in OBS. If you want to customize what it looks like, go ahead! Tweak to your liking and then refresh your OBS source to see your changes. See the "How It Works" section below for details.

## How It Works

- The `heart-of-frogg.exe` server listens for HTTP POST calls at `http://localhost:8080/heart/:rate`
- The Fitbit app checks your heart rate and then makes an HTTP POST call with the heart rate value to the server (e.g. `http://192.168.1.101:8080/heart/86`)
- OBS loads `/ui/index.html` as a source which uses JavaScript to periodically do an HTTP GET request to `http://localhost:8080/heart` to retrieve your current heart rate as reported to the server by your watch
