import Lottie from 'lottie-react-native';
import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
import {Alert, Linking, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import ScanRoute from '../Components/ScanRoute';
import {windowHeight, windowWidth} from '../Utillity/utils';

const CreateRoute = () => {
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRouteFound, setIsRouteFound] = useState(false);
  const [routeUrl, setRouteUrl] = useState('');
  const [isPermitScan, setisPermitScan] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [url, setUrl] = useState(null);
  console.log("🚀 ~ CreateRoute ~  =======================url:", url)
  const [isLoading, setIsLoading] = useState(false);
  const [permitData, setPermitData] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true, includeBase64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setModalVisible(true);
      setIsLoading(true);
      if (data?.base64) {
        const path = data?.base64;
        await processImage(path);
      }
    }
  };

  // const detectTextWithRetry = async (uri, maxRetries = 5) => {
  //   let retries = 0;
  //   while (retries < maxRetries) {
  //     try {
  //       const result = await MLKitOcr.detectFromUri(uri);
  //       return result;
  //     } catch (error) {
  //       if (
  //         error?.message?.includes(
  //           'Waiting for the text optional module to be downloaded',
  //         )
  //       ) {
  //         console.warn(
  //           `Model not ready yet. Retrying in 2s... (${
  //             retries + 1
  //           }/${maxRetries})`,
  //         );
  //         await wait(2000); // wait 2 seconds
  //         retries++;
  //       } else {
  //         throw error;
  //       }
  //     }
  //   }
  //   throw new Error(
  //     'Text recognition model did not load in time. Try again later.',
  //   );
  // };

  // const pickAndRecognizeText = async () => {
  //   console.log('first ================== > from image picker function');
  //   const result = await launchImageLibrary({mediaType: 'photo'});

  //   if (result.assets && result.assets.length > 0) {
  //     const uri = result.assets[0].uri;
  //     console.log('Picked image URI:', uri);

  //     try {
  //       console.log('first ================ >>>>>>> from utl');
  //       if (uri) {
  //         const resultText = await MLKitOcr.detectFromFile(uri);

  //         setisLoading(true);
  //         setModalVisible(true);
  //       }

  //       // const allBlockText = blocks.map(block => block.text).join('\n');
  //       // console.log('Block-wise text:', allBlockText);
  //       // console.log('Full text:', text);
  //     } catch (err) {
  //       console.log('Text recognition error:', err);
  //     }
  //   }
  // };

  const callGoogleVision = async base64Image => {
    const body = {
      requests: [
        {
          image: {content: base64Image.replace(/^data:.*;base64,/, '')},
          features: [{type: 'DOCUMENT_TEXT_DETECTION'}],
        },
      ],
    };
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      },
    );
    const json = await res.json();
    return json; // pass Vision JSON to parser
  };

  const processImage = async path => {
    try {
      setIsLoading(true);
      const visionJson = await callGoogleVision(path);
      // Here we call your function — feed it Vision JSON (it will extract text)
      const {parsed: parsedOut, url: routeUrl} =
        await handleOcrResponseAndRedirect({
          visionJsonOrText: visionJson,
          confirmWithUser: false,
        });
      setParsed(parsedOut);
      setUrl(routeUrl);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Error', e.message || 'Failed to process image');
    }
  };

  const openMaps = () => {
    if (!url) return Alert.alert('No route', 'No route URL available');
    Linking.openURL(url);
  };

  const MAX_WAYPOINTS = 23;

  const ROUTE_TOKEN_RE =
    /\b(I[-\s]?\d+\b|US[-\s]?\d+\b|SR[-\s]?\d+\b|State Route \d+\b|Hwy\s*\d+|Highway\s*\d+)\b/gi;
  const VIA_LABELS =
    /\b(route|routing|via|authorize route |waypoints|through|head toward|turn|take exit)\b[:\s\-]*/i;
  const PLACE_NAME_RE =
    /([A-Z][a-zA-Z0-9&\.\-']+(?:\s+[A-Z][a-zA-Z0-9&\.\-']+){0,4}(?:,\s*[A-Z]{2})?)/g;

  /* ---------- If you have Vision JSON with bounding boxes, rebuild text lines in reading order ---------- */
  const buildOrderedTextFromVision = visionJson => {
    try {
      const ann = visionJson?.responses?.[0]?.fullTextAnnotation;
      if (!ann)
        return (
          visionJson?.responses?.[0]?.textAnnotations?.[0]?.description || ''
        );
      const words = [];

      (ann.pages || []).forEach(page =>
        (page.blocks || []).forEach(block =>
          (block.paragraphs || []).forEach(para =>
            (para.words || []).forEach(word => {
              const text = (word.symbols || []).map(s => s.text).join('');
              if (!text) return;
              const verts = (word.boundingBox || {}).vertices || [];
              const ys = verts.map(v => v.y || 0);
              const xs = verts.map(v => v.x || 0);
              const centerY = ys.reduce((a, b) => a + b, 0) / (ys.length || 1);
              const centerX = xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
              words.push({text, centerX, centerY});
            }),
          ),
        ),
      );

      words.sort((a, b) => a.centerY - b.centerY || a.centerX - b.centerX);

      const rows = [];
      const TOL = 10;
      words.forEach(w => {
        const last = rows[rows.length - 1];
        if (!last || Math.abs(last.y - w.centerY) > TOL) {
          rows.push({y: w.centerY, words: [w]});
        } else {
          last.words.push(w);
        }
      });

      const lines = rows.map(r =>
        r.words
          .sort((a, b) => a.centerX - b.centerX)
          .map(w => w.text)
          .join(' '),
      );
      return lines.join('\n');
    } catch (e) {
      console.warn('buildOrderedTextFromVision failed', e);
      return '';
    }
  };

  /* ---------- Core parser: tolerant, label-first then heuristic fallback ---------- */
  const parseLocationsAndRouteFromText = ocrText => {
    if (!ocrText)
      return {origin: null, destination: null, waypoints: [], rawMatches: {}};

    const text = ocrText
      .replace(/\r/g, '\n')
      .replace(/\t/g, ' ')
      .replace(/[ ]{2,}/g, ' ')
      .trim();
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    let origin = null;
    let destination = null;
    let waypoints = [];
    const rawMatches = {originLines: [], destinationLines: [], routeLines: []};

    for (const line of lines) {
      const l = line;

      // origin label detection
      if (!origin) {
        const m =
          l.match(/(?:^|\b)origin[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)from[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)start(?:ing)?\s*point[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)start(?:ing)?\s*location[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)begin(?:ning)?\s*location[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)begin(?:ning)?\s*point[:\s\-]*(.*)$/i);
        if (m && m[1]) {
          origin = m[1].trim();
          rawMatches.originLines.push(l);
          continue;
        }
      }

      // destination label detection
      if (!destination) {
        const m =
          l.match(/(?:^|\b)(?:final\s+)?destination[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)to[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)finish(?:ing)?\s*point[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)drop\s*off[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)end(?:ing)?\s*location[:\s\-]*(.*)$/i) ||
          l.match(/(?:^|\b)end(?:ing)?\s*point[:\s\-]*(.*)$/i);
        if (m && m[1]) {
          destination = m[1].trim();
          rawMatches.destinationLines.push(l);
          continue;
        }
      }

      // route/via detection
      if (
        VIA_LABELS.test(l) ||
        ROUTE_TOKEN_RE.test(l) ||
        /turn left|turn right|head toward|take exit|continue straight|via/i.test(
          l,
        )
      ) {
        rawMatches.routeLines.push(l);

        // gather route tokens and place names in doc-order for this line
        const combined = [];
        const allMatches = [];
        for (const m of l.matchAll(ROUTE_TOKEN_RE))
          allMatches.push({idx: m.index, text: m[0].trim()});
        for (const m of l.matchAll(PLACE_NAME_RE))
          allMatches.push({idx: m.index, text: m[0].trim()});
        allMatches.sort((a, b) => (a.idx || 0) - (b.idx || 0));
        allMatches.forEach(a => {
          if (!combined.includes(a.text)) combined.push(a.text);
        });

        // fallback: capture "toward" phrasing
        const toward = (l.match(
          /(?:head toward|toward|to)\s+([A-Z][A-Za-z0-9 \-\,&']{2,80})/i,
        ) || [])[1];
        if (!combined.length && toward) combined.push(toward.trim());

        combined.forEach(c => {
          if (c && !waypoints.includes(c)) waypoints.push(c);
        });
      }
    }

    // Try document-wide heuristics if origin/destination still missing
    const bigText = lines.join(' | ');
    if (!origin) {
      const m =
        bigText.match(/from[:\s\-]*([A-Z][A-Za-z0-9 \-\,&']{2,80})/i) ||
        bigText.match(/origin[:\s\-]*([A-Z][A-Za-z0-9 \-\,&']{2,80})/i) ||
        bigText.match(/routing from[:\s\-]*([A-Z][A-Za-z0-9 \-\,&']{2,80})/i)
        ;
      if (m) origin = m[1].trim();
    }
    if (!destination) {
      const m =
        bigText.match(/destination[:\s\-]*([A-Z][A-Za-z0-9 \-\,&']{2,80})/i) ||
        bigText.match(
          /final destination[:\s\-]*([A-Z][A-Za-z0-9 \-\,&']{2,80})/i,
        ) || bigText.match(/to[:\s\-]*([A-Z][A-Za-z0-9 \-\,&']{2,80})/i)  ;
      if (m) destination = m[1].trim();
    }

    // Fallback to first/last meaningful tokens
    if (!origin || !destination) {
      const tokens = [];
      for (const match of bigText.matchAll(
        /(I[-\s]?\d+|US[-\s]?\d+|SR[-\s]?\d+|State Route \d+|[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})/g,
      )) {
        tokens.push({idx: match.index, text: match[0].trim()});
      }
      tokens.sort((a, b) => (a.idx || 0) - (b.idx || 0));
      const uniqueTokens = [...new Set(tokens.map(t => t.text))];
      if (!origin && uniqueTokens.length) origin = uniqueTokens[0];
      if (!destination && uniqueTokens.length > 1)
        destination = uniqueTokens[uniqueTokens.length - 1];
    }

    const clean = t => (t ? t.replace(/[:;]$/, '').trim() : t);
    origin = clean(origin) || null;
    destination = clean(destination) || null;
    waypoints = waypoints.map(w => clean(w)).filter(Boolean);

    if (
      origin &&
      waypoints.length &&
      waypoints[0] &&
      waypoints[0].toLowerCase().includes(origin.toLowerCase())
    )
      waypoints.shift();
    if (
      destination &&
      waypoints.length &&
      waypoints[waypoints.length - 1] &&
      waypoints[waypoints.length - 1]
        .toLowerCase()
        .includes(destination.toLowerCase())
    )
      waypoints.pop();

    waypoints = waypoints.slice(0, MAX_WAYPOINTS);

    return {origin, destination, waypoints, rawMatches};
  };

  /* ---------- Build Google Maps Directions URL ---------- */
  const buildGoogleMapsDirectionsUrl = ({
    origin,
    destination,
    waypoints = [],
    travelmode = 'driving',
  }) => {
    if (!origin || !destination) return null;
    const originParam = encodeURIComponent(origin);
    const destParam = encodeURIComponent(destination);
    const wpParam =
      waypoints && waypoints.length
        ? `&waypoints=${encodeURIComponent(waypoints.join('|'))}`
        : '';
    return `https://www.google.com/maps/dir/?api=1&origin=${originParam}&destination=${destParam}${wpParam}&travelmode=${encodeURIComponent(
      travelmode,
    )}`;
  };

  /* ---------- Example integration flow (arrow-style) ----------
  - visionJsonOrText: either Vision JSON or plain text
  - geocodeFn: optional async function(placeString) => {lat, lng} or null
  - confirmWithUser: if true, you should prompt user to confirm parsed values in your UI
------------------------------------------------------------------ */
  const handleOcrResponseAndRedirect = async ({
    visionJsonOrText,
    geocodeFn = null,
    confirmWithUser = false,
  }) => {
    const text =
      typeof visionJsonOrText === 'string'
        ? visionJsonOrText
        : buildOrderedTextFromVision(visionJsonOrText) ||
          visionJsonOrText?.responses?.[0]?.textAnnotations?.[0]?.description ||
          '';

    const parsed = parseLocationsAndRouteFromText(text);

    // If you want to confirm with user, handle that in UI before proceeding (not done here).
    // Optionally geocode to coordinates via geocodeFn
    let originForUrl = parsed.origin;
    let destForUrl = parsed.destination;

    if (geocodeFn) {
      try {
        const [o, d] = await Promise.all([
          geocodeFn(parsed.origin),
          geocodeFn(parsed.destination),
        ]);
        if (o && o.lat != null && o.lng != null)
          originForUrl = `${o.lat},${o.lng}`;
        if (d && d.lat != null && d.lng != null)
          destForUrl = `${d.lat},${d.lng}`;
      } catch (e) {
        console.warn('geocodeFn failed', e);
      }
    }

    const url = buildGoogleMapsDirectionsUrl({
      origin: originForUrl,
      destination: destForUrl,
      waypoints: parsed.waypoints,
    });
    setRouteUrl(url);
    return {parsed, url, rawText: text};
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create A Route</Text>
      <View style={styles.scanBoxContainer}>
        <Text style={styles.label}>Scan Permit</Text>
      </View>
      <CustomButton
        text={'capture your permit'}
        textColor={Color.white}
        height={windowHeight * 0.06}
        borderColor={Color.secondary}
        borderWidth={1}
        borderRadius={moderateScale(30, 0.6)}
        width={windowWidth * 0.72}
        bgColor={Color.secondary}
        marginTop={moderateScale(15, 0.6)}
        onPress={() => {
          setIsModalVisible(true);
          // takePicture();
        }}
      />
      <CustomButton
        style={{}}
        text={'Upload permit image'}
        textColor={Color.white}
        height={windowHeight * 0.06}
        borderColor={Color.secondary}
        borderWidth={1}
        borderRadius={moderateScale(30, 0.6)}
        width={windowWidth * 0.72}
        bgColor={'transparent'}
        marginTop={moderateScale(20, 0.6)}
        onPress={() => {
          pickAndRecognizeText();
        }}
      />

      <ScanRoute
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOnPress={() => {
          takePicture();
        }}
        cameraRef={cameraRef}
      />

      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque
        turpis iaculis
      </Text>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                height: url
                  ? windowHeight * 0.4
                  : errorMessage != ''
                  ? windowHeight * 0.3
                  : windowHeight * 0.3,
                padding: moderateScale(15, 0.6),
                // backgroundColor: 'red',
                backgroundColor: Color.white,
              },
            ]}>
            {isLoading ? (
              <View
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.25,
                }}>
                <Lottie
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/LoadingAmimation.json')}
                  loop
                  autoPlay
                />
              </View>
            ) : errorMessage ? (
              <View style={styles.error_container}>
                <Icon
                  name="alert-circle"
                  as={Feather}
                  size={moderateScale(35, 0.6)}
                  color={Color.red}
                />
                <CustomText
                  numberOfLines={4}
                  style={{
                    paddingTop: moderateScale(15, 0.6),
                    color: Color.black,
                    textAlign: 'center',
                    fontSize: moderateScale(15, 0.6),
                  }}>
                  {errorMessage}
                </CustomText>
                <CustomButton
                  text={'CAPTIRE AGAIN'}
                  textColor={Color.white}
                  height={windowHeight * 0.06}
                  borderColor={Color.secondary}
                  borderWidth={1}
                  borderRadius={moderateScale(30, 0.6)}
                  width={windowWidth * 0.72}
                  bgColor={Color.secondary}
                  marginTop={moderateScale(15, 0.6)}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
            ) : (
              url && (
                <>
                  <FastImage
                    style={{width: 200, height: 200, borderRadius: 12}}
                    source={require('../Assets/Images/dot.gif')}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <CustomText
                    style={{
                      color: Color.black,
                      textAlign: 'center',
                      fontSize: moderateScale(15, 0.6),
                    }}>
                    Route found successfully. You can proceed with your trip.
                  </CustomText>
                  <CustomButton
                    text={'View on Map'}
                    textColor={Color.white}
                    height={windowHeight * 0.06}
                    borderColor={Color.secondary}
                    borderWidth={1}
                    borderRadius={moderateScale(30, 0.6)}
                    width={windowWidth * 0.72}
                    bgColor={Color.secondary}
                    marginTop={moderateScale(15, 0.6)}
                    onPress={() => {
                      openMaps();
                      // Linking.openURL(routeUrl);
                      // setModalVisible(false);
                      // setRouteUrl('');
                    }}
                  />
                </>
              )
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: moderateScale(50, 0.6),
  },
  title: {
    fontSize: moderateScale(22, 0.6),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: moderateScale(20, 0.6),
  },
  scanBoxContainer: {
    // backgroundColor: '#6e6e6e',ca
    borderRadius: moderateScale(10, 0.6),
    padding: moderateScale(10, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.85,
    height: windowHeight * 0.4,
    borderWidth: moderateScale(1, 0.6),
    // borderColor: Color.secondary,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: moderateScale(10, 0.6),
    fontSize: moderateScale(18, 0.6),
  },
  scanBox: {
    borderColor: '#fff',
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10, 0.6),
  },
  corner: {
    position: 'absolute',
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    borderColor: '#fff',
    borderLeftWidth: moderateScale(2, 0.6),
    borderTopWidth: moderateScale(2, 0.6),
  },
  cameraStyle: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.65,
    alignSelf: 'center',
    marginTop: windowHeight * 0.14,
    borderRadius: 30,
  },

  topLeft: {
    top: 0,
    left: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 20,
    transform: [{rotate: '90deg'}],
  },
  bottomLeft: {
    bottom: 0,
    left: 20,
    transform: [{rotate: '-90deg'}],
  },
  bottomRight: {
    bottom: 0,
    right: 20,
    transform: [{rotate: '180deg'}],
  },

  description: {
    color: '#b0b0b0',
    textAlign: 'center',
    marginTop: windowHeight * 0.25,
    fontSize: moderateScale(12, 0.6),
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor : Color.white
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    margin: 20,
    borderRadius: 10,
    // backgroundColor :'red',
    width: windowWidth * 0.8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  error_container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: moderateScale(10, 0.6),
  },
});
