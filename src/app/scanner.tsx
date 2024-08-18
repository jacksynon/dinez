// import React, { useState } from 'react';
// import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// export function QRScannerScreen({ navigation }) {
//   const [scanned, setScanned] = useState(false);
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         style={styles.camera}
//         facing={'back'}
//         onBarcodeScanned={(data) => {
//           if (!scanned) {
//             setScanned(true);
//             alert(`Scanned data: ${data}`);
//           }
//         }}
//       ></CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//   },
//   camera: {
//     flex: 1,
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
// });
