/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import { AdvancedImage, AdvancedVideo } from 'cloudinary-react-native';
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

/* Cloudinary's front end SDKs don't support chunked uploads but are supported in the backend SDKs 
// and you cand find more info here: https://cloudinary.com/documentation/upload_images#chunked_asset_upload
// Also, for web applications you can use the Upload Widget which has chunked uploads right out of the box
// and you can find more info here: https://cloudinary.com/documentation/upload_widget*/

// Below is an example of manual chunked uploads but has been commented out as it hasn't been tested

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
