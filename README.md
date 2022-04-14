# television-web
> hls-based livestreaming client for web

this is an hls client is written with a minimal user interface using [hls.js][1].
the interface has a mute button, volume slider and a full-screen button

it accepts a `?url=` paramater that will attempt to connect to a stream at the
provided url

when the client connects to the stream, it collects the current timestamp from
the server and uses it to seek into the current video chunk being streamed. this
helps minimize how far behind new viewers are from other people already watching

## dependencies
* follow [docs/server.md][0] to build the video streaming server, this client was
  made specifically to work with it and expects to be hosted by it on the
  same domain if you are not using the `?url=` parameter

* node.js:
```shell
    # Debian/Ubuntu
    apt -y install nodejs npm
```

## installing
add the following to your nginx vhost (see [docs/server.md][0]!)

```nginx
    root /web/television.invalid/;

    location / {
        index index.html;
        autoindex on;
        gzip on;
    }
```

a good place to put this is above the `location /hls` block

restart nginx (typically `sudo /etc/init.d/nginx restart`)

copy the files inside `webroot/` to what you specified as `root` above

once copied, the video streaming client is live and can be seen by
visiting your domain in the browser

# development
to build the web client:
```shell
npm i
npm run build
````

to change the default streaming endpoint from `/hls/stream.m3u8` to something
else, edit `package.json` and change the `endpoint` field, then rebuild the
client and copy it to your server

# credit
svg icons taken from [petras nargela][2], which have been released as:

```free for personal and commercial use```

`unfullscreen.svg` is a modification of `fullscreen.svg` done for this project
and is available under the same terms above

[0]: https://github.com/hxppxcxlt/television-web/blob/main/docs/server.md
[1]: https://github.com/video-dev/hls.js/
[2]: https://dribbble.com/nargela/projects/206618-Freebies

