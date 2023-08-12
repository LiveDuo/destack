
### Convert Video

**Screen Resolution: 1920 x 1080**

```
out_w => 1920 * 9/10 = 1728 
out_h => 1080 (original)
x => 1920 * (1-(16/10)/(16/9)) / 2 = 96
y => 0 (unchanged)
```

```sh
ffmpeg -i ${filename} -filter:v "crop=1728:1080:96:0" out.mp4
```

**Screen Resolution: 3840 x 2160**

```
out_w 3456
out_h => 2160 (original)
x => 3840 * (1-(16/10)/(16/9)) / 2 = 192
y => 0 (unchanged)
```
```sh
ffmpeg -i ${filename} -filter:v "crop=3456:2160:192:0" out.mp4
```

**Note:** Retina resolution is 2560 x 1600

### Screenshot from video

```sh
~/Developer/bin/ffmpeg -ss 00:00:02 -i input.mov -frames:v 1 output.jpg
```

### Resources

https://video.stackexchange.com/questions/4563/how-can-i-crop-a-video-with-ffmpeg

