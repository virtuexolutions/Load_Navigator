import React, {useEffect, useRef} from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';

// ====== Helpers ======
const R = 6371000;
const toRad = d => (d * Math.PI) / 180;

const latLonToXY = (lat, lon, refLat, refLon) => {
  const dLat = toRad(lat - refLat);
  const dLon = toRad(lon - refLon);
  const meanLat = toRad((lat + refLat) / 2);
  const x = dLon * Math.cos(meanLat) * R;
  const y = dLat * R;
  return {x, y};
};

const pointToSegmentDistanceMeters = (p, a, b) => {
  const P = latLonToXY(p.latitude, p.longitude, a.latitude, a.longitude);
  const A = {x: 0, y: 0};
  const B = latLonToXY(b.latitude, b.longitude, a.latitude, a.longitude);

  const ABx = B.x - A.x;
  const ABy = B.y - A.y;
  const APx = P.x - A.x;
  const APy = P.y - A.y;

  const ab2 = ABx * ABx + ABy * ABy;
  let t = 0;
  if (ab2 > 0) {
    t = (APx * ABx + APy * ABy) / ab2;
    t = Math.max(0, Math.min(1, t));
  }

  const closestX = A.x + ABx * t;
  const closestY = A.y + ABy * t;
  const dx = P.x - closestX;
  const dy = P.y - closestY;
  return Math.sqrt(dx * dx + dy * dy);
};

const isCoord = c =>
  c &&
  (typeof c.latitude === 'number' || typeof c.lat === 'number') &&
  (typeof c.longitude === 'number' || typeof c.lng === 'number');

// ====== Component ======
const RouteWatcher = ({
  routeCoords = [],
  threshold = 50,
  requiredConsecutive = 3,
  setOutOfRoute,
  outOfRoute,
}) => {
  const consecutiveRef = useRef(0);

  useEffect(() => {
    // Coerce routeCoords to an array of {latitude, longitude}
    let coordsArray = routeCoords;
    if (!Array.isArray(coordsArray)) {
      if (routeCoords && routeCoords.origin && routeCoords.destination) {
        coordsArray = [
          {
            latitude: routeCoords.origin.latitude,
            longitude: routeCoords.origin.longitude,
          },
          {
            latitude: routeCoords.destination.latitude,
            longitude: routeCoords.destination.longitude,
          },
          ...(Array.isArray(routeCoords.waypoints)
            ? routeCoords.waypoints
            : []),
        ];
      } else {
        coordsArray = Object.values(routeCoords)
          .filter(isCoord)
          .map(c => ({
            latitude: c.latitude ?? c.lat,
            longitude: c.longitude ?? c.lng,
          }));
      }
    } else {
      coordsArray = coordsArray
        .filter(isCoord)
        .map(c => ({
          latitude: c.latitude ?? c.lat,
          longitude: c.longitude ?? c.lng,
        }));
    }

    if (!coordsArray || coordsArray.length < 2) {
      console.warn('RouteWatcher: route must be 2+ coords. Got:', coordsArray);
      return;
    }

    const onLocation = location => {
      try {
        if (!location || !location.coords) return;

        // skip check if GPS accuracy is poor relative to threshold
        const accuracy = location.coords.accuracy ?? 9999;
        // ignore if accuracy > half the threshold or > 75m (configurable)
        const maxAcceptable = Math.max(threshold / 2, 75);
        if (accuracy > maxAcceptable) {
          console.debug(
            'RouteWatcher: skipping due to poor GPS accuracy',
            accuracy,
            'maxAcceptable',
            maxAcceptable,
          );
          return;
        }

        const p = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        let minDist = Infinity;
        for (let i = 0; i < coordsArray.length - 1; i += 1) {
          const a = coordsArray[i];
          const b = coordsArray[i + 1];
          const d = pointToSegmentDistanceMeters(p, a, b);
          if (d < minDist) minDist = d;
        }

        if (!isFinite(minDist)) {
          console.warn('RouteWatcher: minDist invalid, skipping', minDist);
          return;
        }

        // debug
        console.debug(
          'RouteWatcher: minDist',
          Math.round(minDist),
          'threshold',
          threshold,
          'accuracy',
          accuracy,
          'count',
          consecutiveRef.current,
        );

        if (minDist > threshold) {
          consecutiveRef.current = Math.min(
            requiredConsecutive,
            consecutiveRef.current + 1,
          );

          if (consecutiveRef.current >= requiredConsecutive && !outOfRoute) {
            // only set if state is not already true
            setOutOfRoute(true);
            console.log('RouteWatcher: set OUT OF ROUTE');
          }
        } else {
          if (consecutiveRef.current > 0) {
            consecutiveRef.current = 0;
          }
          if (outOfRoute) {
            setOutOfRoute(false);
            console.log('RouteWatcher: BACK ON ROUTE');
          }
        }
      } catch (err) {
        console.warn('RouteWatcher:onLocation error', err);
      }
    };

    const onError = e => console.warn('RouteWatcher location error', e);

    const subscription = BackgroundGeolocation.onLocation(onLocation, onError);

    BackgroundGeolocation.getState(state => {
      if (!state.enabled) BackgroundGeolocation.start();
    });

    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else if (
        subscription &&
        typeof subscription.unsubscribe === 'function'
      ) {
        subscription.unsubscribe();
      }
    };
  }, [routeCoords, threshold, requiredConsecutive, outOfRoute, setOutOfRoute]);

  return (
    <Modal visible={outOfRoute} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <CustomText style={styles.title}>You're off the route</CustomText>
          <CustomText style={styles.message}>
            It looks like you went off the planned route. Please rejoin the
            route or check directions.
          </CustomText>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#f44336'}]}
              onPress={() => {
                // dismiss warning, but keep flagged so next checks still consider user off-route
                setOutOfRoute(false);
                consecutiveRef.current = requiredConsecutive;
              }}>
              <CustomText style={styles.buttonText}>Dismiss</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#4CAF50'}]}
              onPress={() => {
                setOutOfRoute(false);
                consecutiveRef.current = 0;
              }}>
              <CustomText style={styles.buttonText}>
                Get back on route
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RouteWatcher;

const styles = StyleSheet.create({
  modalContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: Color.white,
    padding: moderateScale(20, 0.6),
    borderRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: moderateScale(18, 0.6),
    fontWeight: '700',
    marginBottom: moderateScale(8, 0.6),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(14, 0.6),
    marginBottom: moderateScale(16, 0.6),
    textAlign: 'center',
    color: '#333',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  button: {
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(12, 0.6),
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {color: Color.white, fontWeight: '600'},
});
