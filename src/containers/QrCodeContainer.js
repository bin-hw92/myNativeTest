import { useCallback, useState } from "react";
import { Button, Linking, StyleSheet, Text, View } from "react-native";
import todosStorage from "../lib/todosStorage";
import Dialog from 'react-native-dialog';
import QRView from "../components/QRView";
import QRCodeScanner from "../components/QRCodeScanner";


const QrCodeContainer = ({route, navigation}) => {
  const [token, setToken] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scaned, setScaned] = useState(true);
  const [scanedTxt, setScanedTxt] = useState('');

  const onBarCodeRead = async(event) => {
    const event_token = event.nativeEvent.codeStringValue.split('@');
    if(event_token.length === 2){
      if(event_token[0] === 'Bearer'){
        try {
          if (!scaned) return;
          setScaned(false);
          await todosStorage.set('api_key', event_token[1]);

          setScanedTxt('로그인 토큰이 저장되었습니다.');
          return;
        } catch (error) {
          throw new Error('Failed to load todos');
        }
      }
      setIsOpen(true);
      setToken(event.nativeEvent.codeStringValue);
    }else{
      if (!scaned) return;
      setScaned(false);
      setScanedTxt(event.nativeEvent.codeStringValue);
    }
  };

  const OpenLink = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {   
        if (url.indexOf('http') === 0) {
          await Linking.openURL(url);
          handleCancel();
        }
      }
    }, [url]);
  
    return <Text style={url.indexOf('http') === 0? styles.link : ''} onPress={handlePress}>{children}</Text>;
  }

  const handleCancel = () => {
    setScaned(true);
    setScanedTxt('');
  }

  return (
    <View style={styles.wrap2}>
      {!isOpen && scaned &&
        <QRCodeScanner onBarCodeRead={onBarCodeRead} />
      }
      {isOpen && 
        <QRView
          isOpen={isOpen}
          token={token}
          setIsOpen={setIsOpen}
        />
      }
      {!scaned && 
        <View style={styles.wrap2}>
          <Dialog.Container visible={true} onRequestClose={handleCancel} onBackdropPress={handleCancel}>
            <Dialog.Description>
              <OpenLink url={scanedTxt}>{scanedTxt}</OpenLink>
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
          </Dialog.Container>
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  wrap2: {
    flex: 1,
  },
  link: {
    textDecorationLine: 'underline',
  }
});
export default QrCodeContainer;