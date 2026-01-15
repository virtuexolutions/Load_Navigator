import Lottie from 'lottie-react-native';
import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import ScanRoute from '../Components/ScanRoute';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import RNFetchBlob from 'rn-fetch-blob';
// import RNFetchBlob from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';

const CreateRoute = () => {
  const cameraRef = useRef(null);

  const isTrackingActive = useSelector(
    state => state.commonReducer.isTrackingActive,
  );
  console.log(
    'first============================== <>>>>>>>>>>>>> ',
    Object.keys(isTrackingActive).length > 0 ? 'zeri' : 'meerab',
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRouteFound, setIsRouteFound] = useState(false);
  const [routeUrl, setRouteUrl] = useState('');
  const [finalOrigin, setfinalOrigin] = useState({});
  const [finaldestination, setfinalDestination] = useState({});
  const [finalWayPoint, setfinalWayPoint] = useState([]);
  const [isPermitScan, setisPermitScan] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [url, setUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permitData, setPermitData] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const capturedPhoto = await cameraRef.current.takePhoto({
          flash: 'off',
          qualityPrioritization: 'quality',
        });

        console.log('📸 Photo path:', capturedPhoto.path);

        // Convert to base64 using react-native-fs
        const base64Data = await RNFS.readFile(capturedPhoto.path, 'base64');
        const base64URI = `data:image/jpeg;base64,${base64Data}`;

        console.log('✅ Base64 string ready:', base64URI.slice(0, 100) + '...');

        setModalVisible(true);
        setIsLoading(true);

        await processImage(base64URI);
      } catch (error) {
        console.error('❌ Error taking photo:', error);
      }
    }
  };

  // const takePicture = async () => {
  //   if (cameraRef.current) {
  //     const options = {quality: 0.5, base64: true, includeBase64: true};
  //     const data = await cameraRef.current.takePictureAsync(options);
  //     setModalVisible(true);
  //     setIsLoading(true);
  //     if (data?.base64) {
  //       const path = data?.base64;
  //       await processImage(path);
  //     }
  //   }
  // };

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
    console.log('callGoogleVision is function me ha');
    const body = {
      requests: [
        {
          image: {content: base64Image.replace(/^data:.*;base64,/, '')},
          features: [{type: 'DOCUMENT_TEXT_DETECTION'}],
        },
      ],
    };
    try {
      const res = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body),
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log('erorrrrrrrrrrrrrrrrrr from google vision', err);
    }
  };

  const processImage = async path => {
    try {
      setIsLoading(true);
      const visionJson = await callGoogleVision(path);
      console.log(
        visionJson,
        '======================================= visionJson',
      );
      // Here we call your function — feed it Vision JSON (it will extract text)
      const {parsed, url, res, error} = await handleOcrResponseAndRedirect({
        visionJsonOrText: visionJson,
        confirmWithUser: false,
      });
      if (!error) {
        console.log('====================== >>>>>>>>im in !error blocks');
        setParsed(parsed);
        setUrl(true);
        setIsLoading(false);
        // setErrorMessage('Unable to read permit. Please upload a clearer photo');
        return;
      } else {
        console.log('im in error blocks from else');
        setIsLoading(false);
        setErrorMessage('Unable to read permit. Please upload a clear photo');
      }
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Error', e.message || 'Failed to process image');
    }
  };

  const extractLocations = ocrText => {
    if (!ocrText) return [];

    const HIGHWAY_RE =
      /\b(I-\d+\s?[ENSW]?|US-\d+|TN-\d+|SR-\d+|Hwy\s*\d+|Highway\s*\d+)\b/gi;
    const STREET_RE =
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(Rd|Road|St|Street|Ave|Avenue|Hwy|Highway|Blvd|Boulevard|Ln|Lane|Dr|Drive|Cir|Circle|Pkwy|Parkway))\b/gi;

    const matches = [];
    let m;

    // Highways
    while ((m = HIGHWAY_RE.exec(ocrText)) !== null) {
      matches.push(m[0]);
    }

    // Streets
    while ((m = STREET_RE.exec(ocrText)) !== null) {
      matches.push(m[0]);
    }

    // Clean + unique
    return [...new Set(matches.map(s => s.trim()))];
  };

  const openMaps = () => {
    if (!url) return Alert.alert('No route', 'No route URL available');

    navigationService.navigate('MapScreen', {
      data: {
        origin: finalOrigin,
        destination: finaldestination,
        waypoint: finalWayPoint,
      },
    });
    // Linking.openURL(url);
    setModalVisible(false);
    setRouteUrl('');
  };

  const MAX_WAYPOINTS = 23;

  const ROUTE_TOKEN_RE =
    /\b(I[-\s]?\d+\b|US[-\s]?\d+\b|SR[-\s]?\d+\b|State Route \d+\b|Hwy\s*\d+|Highway\s*\d+)\b/gi;
  const VIA_LABELS =
    /\b(route|routing|via|waypoints|through|head toward|turn|take exit)\b[:\s\-]*/i;
  // const PLACE_NAME_RE =
  //   /([A-Z][a-zA-Z0-9&\.\-']+(?:\s+[A-Z][a-zA-Z0-9&\.\-']+){0,4}(?:,\s*[A-Z]{2})?)/g;

  const buildOrderedTextFromVision = visionJson => {
    console.log('function mai ha');
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

  const STOPWORDS = [
    'ROUTE',
    'CURFEW',
    'PERMIT',
    'THERE',
    'FEES',
    'TOTAL',
    'TRAVEL',
    'LENGTH',
    'LOAD',
    'VEHICLE',
    'CONFIGURATION',
    'DIMENSIONS',
    'RESTRICTIONS',
    'GROSS',
    'AXLES',
    'STEER',
    'TIRE',
    'OVERHANG',
    'WEIGH',
    'STATION',
    'AREA',
    'SECTION',
  ];

  const isPotentialLocation = text => {
    if (!text) return false;

    // Reject dates/numbers like 04/01/2025 or 492LUA/SK
    if (/^\d{1,4}[\/\-]\d{1,2}[\/\-]\d{2,4}$/.test(text)) return false;
    if (/^\d+$/.test(text)) return false;
    if (text.length <= 2) return false;

    // Reject all-uppercase stopwords
    if (STOPWORDS.includes(text.trim().toUpperCase())) return false;

    // Keep words that look like city/state/highway
    return true;
  };
  //   const looksLikeLocation = txt => {
  //   if (!txt) return false;
  //   const cleaned = txt.trim();
  //   if (/\d/.test(cleaned)) return false; // reject dates, numbers
  //   if (/@/.test(cleaned)) return false;  // reject emails
  //   if (cleaned.length < 3) return false;
  //   // allow ALL CAPS or Title Case words
  //   return /^[A-Z][A-Z\s]+$/i.test(cleaned);
  // };

  const ORIGIN_LABELS =
    /^\s*(?:origin|from|starting\s*point|start|pickup|load\s*from|begin(?:ning)?|routing\s*from)\b[:\s\-]*/i;
  const DEST_LABELS =
    /\b(destination|trip[\s\-_]*destination|direction|to|drop\s*off|end(?:ing)?|end\s*at|finish(?:ing)?\s*point|unload|delivery|routing\s*to|deliver\s*to|travel(?:ling|ing)?\s*to|travel(?:ling|ing)?\s*point|border\s*end(?:ing)?|exit(?:\s*point)?)\b[:\s\-]*/i;

  const ROUTE_START_LABELS =
    /^\s*(?:route|routes\s*traveled|start\s*on|routes|routing|over\s*routes|highway\s*routing|detailed\s*routing)\b[:\s\-]*/i;

  const VALID_HIGHWAY_RE =
    /\b(I[-\s]?\d+|US[-\s]?\d+|SR[-\s]?\d+|State Route \d+|Hwy\s*\d+|Highway\s*\d+)\b/gi;

  // improved place name regex: Title Case or ALL CAPS words, up to 5 words
  const PLACE_NAME_RE =
    /((?:[A-Z][a-zA-Z0-9&\.\-']+|[A-Z]{2,})(?:\s+(?:[A-Z][a-zA-Z0-9&\.\-']+|[A-Z]{2,})){0,4}(?:,\s*[A-Z]{2})?)/g;

  // Set of US state names (to allow single-word states)
  const US_STATES = new Set(
    [
      'ALABAMA',
      'ALASKA',
      'ARIZONA',
      'ARKANSAS',
      'CALIFORNIA',
      'COLORADO',
      'CONNECTICUT',
      'DELAWARE',
      'FLORIDA',
      'GEORGIA',
      'HAWAII',
      'IDAHO',
      'ILLINOIS',
      'INDIANA',
      'IOWA',
      'KANSAS',
      'KENTUCKY',
      'LOUISIANA',
      'MAINE',
      'MARYLAND',
      'MASSACHUSETTS',
      'MICHIGAN',
      'MINNESOTA',
      'MISSISSIPPI',
      'MISSOURI',
      'MONTANA',
      'NEBRASKA',
      'NEVADA',
      'NEW MEXICO',
      'NEW YORK',
      'NORTH CAROLINA',
      'NORTH DAKOTA',
      'OHIO',
      'OKLAHOMA',
      'OREGON',
      'PENNSYLVANIA',
      'RHODE ISLAND',
      'SOUTH CAROLINA',
      'SOUTH DAKOTA',
      'TENNESSEE',
      'TEXAS',
      'UTAH',
      'VERMONT',
      'VIRGINIA',
      'WASHINGTON',
      'WEST VIRGINIA',
      'WISCONSIN',
      'WYOMING',
    ].map(s => s.toUpperCase()),
  );

  const normalizeCandidate = s =>
    s
      .replace(/^[\(\-\s"']+|[\)\-\s"'\.:,]+$/g, '') // trim punctuation
      .replace(/\s{2,}/g, ' ')
      .trim();

  const looksLikeLocation = txt => {
    if (!txt) return false;
    const t = normalizeCandidate(txt);
    if (!t || t.length < 3) return false;
    // reject emails, lines with obvious dates/numbers-only tokens
    if (/@/.test(t)) return false;
    if (/^\d/.test(t) && !VALID_HIGHWAY_RE.test(t)) return false;
    // highways OK
    if (VALID_HIGHWAY_RE.test(t)) return true;
    const words = t.split(/\s+/);
    // if multi-word and all words are uppercase or titlecase, accept
    if (words.length >= 2) {
      // e.g., NORTH LITTLE ROCK or Little Rock
      if (
        words.every(
          w => /^[A-Z0-9'&\.-]+$/.test(w) || /^[A-Z][a-z0-9'&\.-]+$/.test(w),
        )
      )
        return true;
    }
    // single word: accept only if it's state name or well-formed Title Case
    if (words.length === 1) {
      const up = t.toUpperCase();
      if (US_STATES.has(up)) return true;
      if (/^[A-Z][a-z]+$/.test(t)) return true; // Title case single-word city names
      return false; // reject lone "NORTH"
    }
    return false;
  };

  const extractPlaceCandidatesFromLine = line => {
    const candidates = [];
    // 1) highways
    for (const m of line.matchAll(VALID_HIGHWAY_RE)) {
      candidates.push(normalizeCandidate(m[0]));
    }
    // 2) PLACE_NAME_RE (Title case or All caps groups)
    for (const m of line.matchAll(PLACE_NAME_RE)) {
      candidates.push(normalizeCandidate(m[0]));
    }
    // 3) group adjacent uppercase/TitleCase words (fallback)
    const words = line.split(/\s+/);
    let cur = [];
    for (const w of words) {
      if (/^[A-Z0-9'&\.-]+$/.test(w) || /^[A-Z][a-z0-9'&\.-]+$/.test(w)) {
        cur.push(w);
      } else {
        if (cur.length) {
          candidates.push(normalizeCandidate(cur.join(' ')));
          cur = [];
        }
      }
    }
    if (cur.length) candidates.push(normalizeCandidate(cur.join(' ')));
    // unique, non-empty
    return [...new Set(candidates.filter(Boolean))];
  };

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

      // ORIGIN: only if line starts with an origin keyword
      if (!origin) {
        const m =
          l.match(/^\s*origin[:\s\-]+(.+)$/i) ||
          l.match(/^\s*from[:\s\-]+(.+)$/i) ||
          l.match(/^\s*start\s*at[:\s\-]+(.+)$/i) ||
          l.match(/(?:^|\b)routing\s*from[:\s\-]*(.*)$/i) ||
          l.match(/^\s*routing\s*from[:\s\-]+(.+)$/i) ||
          l.match(/^\s*Border\s*Start[:\s\-]+(.+)$/i) ||
          l.match(/^\s*(?:origin|trip\s*origin)[:\s\-]+(.+)$/i) ||
          l.match(/^\s*(?:origin|trip\s*origin|pickup\s*at)[:\s\-]+(.+)$/i) ||
          l.match(/^\s*travel(?:ling|ing)?\s+from\s+(.+)$/i) ||
          l.match(l.match(/^\s*trip[\s\-\_]*origin[:\s\-]+(.+)$/i)) ||
          l.match(/\bOrigin[:\s\-]+([A-Za-z0-9\;\,\-\s]+)/i) ||
          l.match(/^\s*(Starting\s*Point|Start\s*Point)[:\s\-]+(.+)$/i) ||
          l.match(/^\s*(Entry\s*Point|Entry)[:\s\-]+(.+)$/i) ||
          l.match(l.match(/^\s*bridge[\s\-_]*crossing[:\s\-]+(.+)$/i)) ||
          l.match(/^\s*Travel(?:ling|ing)?\s*From[:\s\-]+(.+)$/i) ||
          // l.match(/^\s*start(?:ing)?\s*(?:point|location)?[:\s\-]+(.+)$/i) ||
          l.match(/^\s*begin(?:ning)?\s*(?:point|location)?[:\s\-]+(.+)$/i);

        if (m && m[1]) {
          const candidate = m[1].trim();

          // origin ke liye sirf minimal filter
          if (candidate && candidate.length > 2 && !/@/.test(candidate)) {
            origin = candidate;
            rawMatches.originLines.push(l);
            continue;
          }
        }
      }

      // DESTINATION: only if line starts with destination keyword
      const INVALID_DEST_WORDS =
        /^(move|haul|email|permit|permission|load|commodity|contact|other)$/i;

      function looksLikeLocation(txt) {
        if (!txt) return false;
        const cleaned = txt.trim();
        if (!cleaned) return false;

        // reject short junk
        if (cleaned.length < 3) return false;

        // reject emails
        if (/@/.test(cleaned)) return false;

        // reject pure numbers/dates
        if (/^\d/.test(cleaned)) return false;

        // reject known invalid keywords
        const firstWord = (cleaned.split(/\s+/)[0] || '').toLowerCase();
        if (firstWord && INVALID_DEST_WORDS.test(firstWord)) return false;

        return true;
      }

      for (const line of lines) {
        const l = line;

        if (!destination) {
          const m = l.match(DEST_LABELS);
          if (m) {
            const candidate = l.replace(DEST_LABELS, '').trim();
            if (looksLikeLocation(candidate)) {
              destination = candidate;
              rawMatches.destinationLines.push(l);
              continue;
            }
          }
        }
      }

      // ROUTE / ROUTES TRAVELED lines — parse for highways and place sequences
      if (
        ROUTE_START_LABELS.test(l) ||
        /START ON|INTERSECTION|AT EXIT|EXIT|ROUTE|ROUTES TRAVELED/i.test(l)
      ) {
        rawMatches.routeLines.push(l);
        const cands = extractPlaceCandidatesFromLine(l);
        for (const c of cands) {
          // accept highway tokens or place-like tokens
          if (VALID_HIGHWAY_RE.test(c) || looksLikeLocation(c)) {
            if (!waypoints.includes(c)) waypoints.push(c);
          }
        }
        continue;
      }

      // If a line has "routing from" or "routing to" midline (rare) try to capture anchored variant
      // (we already handle `routing from` as an ORIGIN_LABELS/DEST_LABELS because they are anchored)
    }

    // Conservative fallback: if origin/destination still missing, try strict heuristics but only from lines that contain 'Origin' or 'Destination' keywords anywhere (not blind)
    if (!origin || !destination) {
      const bigText = lines.join(' | ');
      // try anchored "routing from ... to ..." pattern
      const m = bigText.match(
        /\brouting\s+from[:\s\-]*([A-Z0-9\w\ \,\-']{3,80})\s+to[:\s\-]*([A-Z0-9\w\ \,\-']{3,80})/i,
      );
      if (m) {
        const a = normalizeCandidate(m[1]),
          b = normalizeCandidate(m[2]);
        if (!origin && looksLikeLocation(a)) origin = a;
        if (!destination && looksLikeLocation(b)) destination = b;
      }
    }

    // final cleanup: remove duplicate/garbage
    waypoints = waypoints.filter(w => w && w.length > 0);
    // drop waypoint equal to origin/destination
    if (origin)
      waypoints = waypoints.filter(
        w => w.toLowerCase() !== origin.toLowerCase(),
      );
    if (destination)
      waypoints = waypoints.filter(
        w => w.toLowerCase() !== destination.toLowerCase(),
      );
    waypoints = waypoints.slice(0, MAX_WAYPOINTS);

    return {origin, destination, waypoints, rawMatches};
  };

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

  const geocodeLocation = async place => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          place,
        )}&key=AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg`,
      );
      const json = await res.json();

      if (json.status === 'OK' && json.results.length > 0) {
        console.log(
          'first =========================== > >>> from geocode function',
          JSON.stringify(json.results, null, 2),
        );
        const loc = json.results[0].geometry.location;
        return {
          place,
          valid: true,
          formatted: json.results[0].formatted_address,
          lat: loc.lat,
          lng: loc.lng,
        };
      }
      return {place, valid: false};
    } catch (e) {
      console.error('Geocode failed:', e);
      return {place, valid: false};
    }
  };

  const handleOcrResponseAndRedirect = async ({
    visionJsonOrText,
    geocodeFn = geocodeLocation,
    confirmWithUser = false,
  }) => {
    // clear previous error immediately
    setErrorMessage(null);

    // Step 1: OCR → Plain text
    const text =
      typeof visionJsonOrText === 'string'
        ? visionJsonOrText
        : buildOrderedTextFromVision(visionJsonOrText) ||
          visionJsonOrText?.responses?.[0]?.textAnnotations?.[0]?.description ||
          '';

    // Step 2: Extract potential locations
    const {origin, destination, waypoints} =
      parseLocationsAndRouteFromText(text);

    console.log(
      '🚀 Parsed (raw):',
      origin,
      'destiantion ===== >>>',
      destination,
      'waypointssssssssssssss',
      waypoints,
    );

    // Step 3: Build candidate list and geocode them
    const candidates = [
      {type: 'origin', value: origin},
      {type: 'destination', value: destination},
      ...waypoints.map(w => ({type: 'waypoint', value: w})),
    ].filter(c => !!c.value);

    const validated = [];

    for (const c of candidates) {
      try {
        const result = await geocodeFn(c.value);
        if (result && result.valid) {
          validated.push({
            ...c,
            formatted: result.formatted,
            lat: result.lat,
            lng: result.lng,
          });
        } else {
          console.warn('Dropped invalid location:', c.value);
        }
      } catch (err) {
        console.error('Geocode error for', c.value, err);
      }
    }

    console.log('🚀 validated candidates:', validated);

    // Step 4: Rebuild origin/destination/waypoints from validated list
    let validOrigin = validated.find(v => v.type === 'origin');
    let validDestination = validated.find(v => v.type === 'destination');
    const validWaypoints = validated.filter(v => v.type === 'waypoint');

    // Fallback: if explicit origin/destination not available, use first/last validated waypoint
    if (!validOrigin && validWaypoints.length > 0) {
      validOrigin = validWaypoints[0];
      console.warn(
        'Fallback: using first waypoint as origin:',
        validOrigin.value,
      );
    }
    if (!validDestination && validWaypoints.length > 0) {
      validDestination = validWaypoints[validWaypoints.length - 1];
      console.warn(
        'Fallback: using last waypoint as destination:',
        validDestination.value,
      );
    }

    // Final check AFTER fallback
    if (!validOrigin || !validDestination) {
      const parsedPartial = {
        origin: validOrigin?.formatted || null,
        destination: validDestination?.formatted || null,
        waypoints: validWaypoints.map(w => w.formatted),
      };
      setErrorMessage('Valid origin/destination not found in OCR text.');
      return {
        parsed: parsedPartial,
        url: null,
        rawText: text,
        error: true,
      };
    }

    // Step 5: Build URL from lat/lng (use validated coordinates)
    // const url = buildGoogleMapsDirectionsUrl({
    //   origin: `${validOrigin.lat},${validOrigin.lng}`,
    //   destination: `${validDestination.lat},${validDestination.lng}`,
    //   waypoints: validWaypoints.map(w => `${w.lat},${w.lng}`),
    // });

    setfinalOrigin({lat: validOrigin?.lat, lng: validOrigin?.lng});
    setfinalDestination({
      lat: validDestination?.lat,
      lng: validDestination?.lng,
    });
    setfinalWayPoint(validWaypoints.map(w => `${w.lat},${w.lng}`));
    // navigationService.navigate('MapScreen');
    // Clear any prior error on success
    setErrorMessage(null);
    // openMaps(url);
    // setUrl(url)
    console.log('🚀 Final URL:', url);

    return {
      parsed: {
        origin: validOrigin.formatted,
        destination: validDestination.formatted,
        waypoints: validWaypoints.map(w => w.formatted),
      },
      url,
      rawText: text,
      error: false,
    };
  };

  // const handleOcrResponseAndRedirect = async ({
  //   visionJsonOrText,
  //   geocodeFn = null,
  //   confirmWithUser = false,
  // }) => {
  //   const text =
  //     typeof visionJsonOrText === 'string'
  //       ? visionJsonOrText
  //       : buildOrderedTextFromVision(visionJsonOrText) ||
  //         visionJsonOrText?.responses?.[0]?.textAnnotations?.[0]?.description ||
  //         '';

  //   const parsed = parseLocationsAndRouteFromText(text);

  //   // If you want to confirm with user, handle that in UI before proceeding (not done here).
  //   // Optionally geocode to coordinates via geocodeFn
  //   let originForUrl = parsed.origin;
  //   let destForUrl = parsed.destination;

  //   if (geocodeFn) {
  //     try {
  //       const [o, d] = await Promise.all([
  //         geocodeFn(parsed.origin),
  //         geocodeFn(parsed.destination),
  //       ]);
  //       if (o && o.lat != null && o.lng != null)
  //         originForUrl = `${o.lat},${o.lng}`;
  //       if (d && d.lat != null && d.lng != null)
  //         destForUrl = `${d.lat},${d.lng}`;
  //     } catch (e) {
  //       console.warn('geocodeFn failed', e);
  //     }
  //   }

  //   const url = buildGoogleMapsDirectionsUrl({
  //     origin: originForUrl,
  //     destination: destForUrl,
  //     waypoints: parsed.waypoints,
  //   });
  //   setRouteUrl(url);
  //   return {parsed, url, rawText: text};
  // };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.black} barStyle={'light-content'} />
      <Header
        title="create a route"
        headerColor={Color.black}
        textstyle={{color: Color.white}}
        showBack
        // menu
      />
      {/* <CustomText style={styles.title}>Create A Route</CustomText> */}
      <View style={styles.scanBoxContainer}>
        <CustomText style={styles.label}>Scan Permit</CustomText>
        <View
          style={{
            // backgroundColor: 'red',
            width: windowWidth * 0.9,
            height: windowHeight * 0.33,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/scanImage.png')}
          />
        </View>
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
          console.log('agsdhfgahsd gfjagsd fj =====================');
          // takePicture();
        }}
      />
      {/* <CustomButton
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
      /> */}

      <ScanRoute
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOnPress={() => {
          takePicture();
        }}
        cameraRef={cameraRef}
      />
      {/* {Object.keys(isTrackingActive).length > 0 && ( */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigationService.navigate('MapScreen', {data: isTrackingActive});
          }}
          activeOpacity={0.8}>
          <View style={styles.iconContainer}>
            <Icon
              as={FontAwesome5}
              name="car"
              size={moderateScale(24)}
              color="#fff"
            />
          </View>

          <View style={styles.textContainer}>
            <CustomText style={styles.title}>Permit Tracking Active</CustomText>
            <CustomText style={styles.subtitle}>
              Tap to open tracking
            </CustomText>

            {/* Progress Bar*/}
             <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </TouchableOpacity>
      {/* // )}   */}

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
                // height: url
                //   ? windowHeight * 0.4
                //   : errorMessage != ''
                //   ? windowHeight * 0.3
                //   : windowHeight * 0.3,
                paddingVertical: moderateScale(20, 0.6),
                paddingHorizontal: moderateScale(12, 0.6),
                // backgroundColor: 'red',
                backgroundColor: isLoading ? 'rgba(0, 0, 0, 0.7)' : Color.white,
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
                    // backgroundColor :'red'
                  }}
                  source={require('../Assets/Images/LoadingAmimation.json')}
                  loop
                  autoPlay
                />
                {/* <CustomText
                  // isBold
                  style={{
                    fontSize: moderateScale(16, 0.6),
                    color: Color.lightGrey,
                    paddingHorizontal: moderateScale(5, 0.6),
                    alignSelf: 'center',
                    marginTop: moderateScale(-75, 0.6),

                    // fontWeight :'bold'
                  }}>
                  Note :
                </CustomText> */}
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: Color.lightGrey,
                    width: '80%',
                    // marginTop: moderateScale(25, 0.6),
                    paddingHorizontal: moderateScale(5, 0.6),
                    marginTop: moderateScale(-75, 0.6),
                    alignSelf: 'center',
                    textAlign: 'center',
                    width: '80%',
                    // backgroundColor :'red'
                  }}>
                  Your permit is being scanned. Please wait while we process
                  your request...
                </CustomText>
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
    borderRadius: moderateScale(10, 0.6),
    padding: moderateScale(10, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.85,
    height: windowHeight * 0.4,
    borderWidth: moderateScale(1, 0.6),
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: moderateScale(10, 0.6),
    fontSize: moderateScale(18, 0.6),
  },

  description: {
    color: '#b0b0b0',
    position: 'absolute',
    bottom: moderateScale(40, 0.6),
    textAlign: 'center',
    fontSize: moderateScale(12, 0.6),
    width: '80%',
  },
  modalContainer: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalContent: {
    margin: 20,
    borderRadius: 10,
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
    borderRadius: moderateScale(10, 0.6),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    padding: moderateScale(10, 0.6),
    width: windowWidth * 0.8,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: windowHeight * 0.21,
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: '#E53935',
    padding: moderateScale(10),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(14),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: moderateScale(13, 0.6),
    fontWeight: '600',
  },
  subtitle: {
    color: '#aaa',
    fontSize: moderateScale(11),
  },
  progressBar: {
    height: moderateScale(6),
    backgroundColor: '#333',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%', // dynamically change if needed
    height: '100%',
    backgroundColor: '#E53935',
    borderRadius: moderateScale(10),
  },
});
