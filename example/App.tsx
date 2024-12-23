/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import { AdvancedImage, AdvancedVideo, } from 'cloudinary-react-native';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { cartoonify } from '@cloudinary/url-gen/actions/effect';
import { max } from '@cloudinary/url-gen/actions/roundCorners';
import React, { useRef } from 'react';
import { streamingProfile } from '@cloudinary/url-gen/actions/transcode';
import { Video } from 'expo-av';
import {} from 'cloudinary-react-native';
import {upload} from 'cloudinary-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';

const cld = new Cloudinary({
  cloud: {
    // This cloudname is used for demonstration purposes only and should be replaced with your account info in the format below
    cloudName: 'demo'
    // cloudName: 'YOUR-CLOUD_NAME_HERE',
    // apiKey: 'YOUR-API-KEY-HERE',
    // apiSecret: 'YOUR-API-SECRET-HERE'
  },
  url: {
    secure: true,
  },
});

/* CHUNKED UPLOADS - UNTESTED */

// const uploadFileInChunks = async (filePath: any, uploadPreset: any) => {
//   try {
//     const { size } = await RNFetchBlob.fs.stat(filePath);
//     const chunkSize = 5 * 1024 * 1024; // 5 MB chunks
//     let offset = 0;

//     while (offset < size) {
//       const end = Math.min(size, offset + chunkSize);
//       const chunk = await RNFetchBlob.fs.readStream(filePath, 'base64', offset, end);
//       const options = {
//         upload_preset: uploadPreset,
//         file: chunk.data,
//         part: {
//           index: Math.floor(offset / chunkSize) + 1,
//           total: Math.ceil(size / chunkSize),
//         },
//       };

//       await upload(cld, options);
//       offset = end;
//     }

//     return { success: true };
//   } catch (error) {
//     console.error('Error uploading file in chunks:', error);
//     return { success: false, error };
//   }
// };

// const handleFileUpload = async () => {
//   try {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access media library is required!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       const { uri } = result;
//       const uploadResult = await uploadFileInChunks(uri, 'your-upload-preset');
//       if (uploadResult.success) {
//         console.log('File uploaded successfully!');
//       } else {
//         console.error('Error uploading file:', uploadResult.error);
//       }
//     }
//   } catch (error) {
//     console.error('Error handling file upload:', error);
//   }
// };

/* CHUNKED UPLOADS - UNTESTED */

/* VIDEO TRANSCRIPTION AT TIME OF UPLOAD */

// const uploadVideoWithTranscription = async (videoFilePath:any) => {
//   try {
//     const uploadResponse = await upload(cld, {
//       file: videoFilePath,
//       upload_preset: 'your-upload-preset',
//       resource_type: 'video',
//       eager: [
//         {
//           transformation: {
//             width: 640,
//             height: 360,
//             crop: 'limit',
//           },
//           resource_type: 'video',
//           format: 'mp4',
//           public_id: 'my_transcoded_video',
//         },
//         {
//           resource_type: 'video',
//           format: 'vtt',
//           public_id: 'my_video_transcript',
//         },
//       ],
//     });

//     console.log('Video uploaded successfully:', uploadResponse);
//     return uploadResponse;
//   } catch (error) {
//     console.error('Error uploading video:', error);
//     throw error;
//   }
// };

// const handleVideoUpload = async () => {
//   try {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Permission to access media library is required!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       const { uri } = result;
//       const uploadResponse = await uploadVideoWithTranscription(uri);
//       console.log('Video uploaded and transcribed:', uploadResponse);
//     }
//   } catch (error) {
//     console.error('Error handling video upload:', error);
//   }
// };

/* VIDEO TRANSCRIPTION AT TIME OF UPLOAD */


export default function App() {
  const videoPlayer = useRef<Video>(null);
  function createMyImage() {
    var myImage = cld
    .image('sample')
    .resize(scale().width(300))
    .effect(cartoonify())
    .roundCorners(max());
    return myImage;
  }
  
  function createMyVideoObject() {
    const myVideo = cld
    .video('sea_turtle.m3u8')
    .transcode(streamingProfile('auto'));
    return myVideo;
  }
  /* VIDEO CHAPTERS */
  // Replace with your VTT file URL
  // const vttUrl = 'https://res.cloudinary.com/YOUR_CLOUD_NAME/raw/upload/vtt/YOUR_VTT_FILE.vtt';
  // const jumpToChapter = (startTime:any) => {
  //   if (videoPlayer.current) {
  //     videoPlayer.current.seek(startTime);
  //   }
  // };

  // <View>
  // <AdvancedVideo
  //       ref={videoPlayer}
  //       cldVideo={createMyVideoObject()}
  //       videoStyle={styles.video}
  //       controls={true}
  //       textTracks={[
  //         {
  //           kind: 'subtitles',
  //           src: vttUrl,
  //           srcLang: 'en',
  //           label: 'English',
  //           default: true,
  //         },
  //       ]}
  //     />
      {/* Add your styles under the chapterButtons heading below */}
      {/* <View style={styles.chapterButtons}>
        <Button title="Chapter 1" onPress={() => jumpToChapter(0)} />
        <Button title="Chapter 2" onPress={() => jumpToChapter(30)} />
        <Button title="Chapter 3" onPress={() => jumpToChapter(60)} />
      </View>
      </View> */}
  /* VIDEO CHAPTER */
  
  return (
    <View style={styles.container}>
      <View>
        <AdvancedImage
          cldImg={createMyImage()}
          style={{ backgroundColor: 'black', width: 300, height: 200 }}
        />
      </View>
      <View style={styles.videoContainer}>
        <AdvancedVideo
          ref={videoPlayer}
          videoStyle={styles.video}
          cldVideo={createMyVideoObject()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  video: {
    width: 400,
    height: 220,
  },
});
