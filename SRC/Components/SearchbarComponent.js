import {View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowWidth, windowHeight, apiHeader} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import CustomText from './CustomText';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';

const SearchbarComponent = ({
  placeholderName,
  placeHolderColor,
  fontSize,
  SearchStyle,
  disable = true,
  isLeftIcon,
  isRightIcon,
  as,
  color,
  size,
  name,
  setSelectedPilot,
}) => {
  const token = useSelector(state => state.authReducer.token);

  // 🔹 Debounce Hook
  const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    const debouncedFn = useCallback(
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay],
    );

    // cleanup
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    return debouncedFn;
  };

  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [results, setResults] = useState([]);

  // 🔹 API Search Function
  const handleSearch = async text => {
    setDebouncedValue(text);
    if (!text || text.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const formData = new FormData();
      const url = `auth/pilots/search`;
      formData.append('search', text);

      const response = await Post(url, formData, apiHeader(token));

      const searchText = text.toLowerCase();
      const filtered = response?.data?.data?.filter(pilot => {
        return (
          (pilot?.pilot_custom_id &&
            pilot?.pilot_custom_id.toLowerCase().includes(searchText)) ||
          (pilot?.first_name &&
            pilot?.first_name.toLowerCase().includes(searchText)) ||
          (pilot?.last_name &&
            pilot?.last_name.toLowerCase().includes(searchText)) ||
          (pilot?.company_name &&
            pilot?.company_name.toLowerCase().includes(searchText)) ||
          (pilot?.email && pilot?.email.toLowerCase().includes(searchText)) ||
          (pilot?.insurance_number &&
            pilot?.insurance_number.toLowerCase().includes(searchText))
        );
      });

      setResults(filtered && filtered.length > 0 ? filtered : []);
    } catch (error) {
      console.log('Search API Error:', error);
      setResults([]);
    }
  };

  // 🔹 Debounce Search
  const debouncedHandleSearch = useDebounce(handleSearch, 500);

  const handleChangeText = text => {
    setInputValue(text);
    debouncedHandleSearch(text);
  };

  return (
    <>
      {/* 🔹 Search Box */}
      <View
        style={[
          {
            width: windowWidth * 0.9,
            height: windowHeight * 0.06,
            borderWidth: 0.3,
            borderColor: Color.veryLightGray,
            marginTop: moderateScale(5, 0.6),
            borderRadius: moderateScale(20, 0.3),
            paddingHorizontal: moderateScale(10, 0.6),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
          },
          SearchStyle,
        ]}>
        {isLeftIcon && <Icon as={as} name={name} size={size} color={color} />}
        <TextInput
          style={{color: 'black', flex: 1}}
          placeholder={placeholderName ? placeholderName : 'Search'}
          placeholderTextColor={
            placeHolderColor ? placeHolderColor : Color.veryLightGray
          }
          fontSize={fontSize ? fontSize : 14}
          numberOfLines={1}
          value={inputValue}
          onChangeText={handleChangeText}
          editable={disable}
        />
        {isRightIcon && (
          <Icon
            onPress={() => {
              handleSearch(inputValue);
            }}
            as={as}
            name={name}
            size={size}
            color={color}
          />
        )}
      </View>

      {/* 🔹 Search Results */}
      {debouncedValue.length > 0 && (
        <View
          style={{
            width: windowWidth * 0.9,
            alignSelf: 'center',
            marginTop: moderateScale(5,.6),
            borderRadius: moderateScale(10, 0.6),
            // borderWidth: 0.5,
            // borderColor: Color.black,
            backgroundColor: Color.white,
            maxHeight: windowHeight * 0.3,
          }}>
          {results.length > 0 ? (
            <View
              style={{
                borderWidth: 0.3,
                borderColor: Color.mediumGray,
                paddingVertical: moderateScale(10, 0.6),
                paddingHorizontal: moderateScale(5, 0.6),
                width: windowWidth * 0.8,
                alignSelf: 'center',
                // borderBottomWidth: 0.5,
                // borderBottomColor: Color.mediumGray,
                borderRadius: moderateScale(10, 0.6),
              }}>
              <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPilot(item);
                      setDebouncedValue('');
                      setInputValue(
                        item?.first_name
                          ? `${item.first_name} ${item.last_name || ''}`
                          : item?.pilot_custom_id || '',
                      );
                      setResults([]);
                    }}
                    style={{
                      paddingVertical: moderateScale(10, 0.6),
                      paddingHorizontal: moderateScale(12, 0.6),
                      width: windowWidth * 0.8,
                      alignSelf: 'center',

                      borderBottomWidth: 0.5,
                      borderBottomColor: Color.mediumGray,
                      borderRadius: moderateScale(10, 0.6),
                    }}>
                    <CustomText
                      style={{
                        color: Color.black,
                        fontSize: moderateScale(12, 0.6),
                      }}>
                      {item?.first_name
                        ? `${item.first_name} ${item.last_name || ''}`
                        : item?.pilot_custom_id}
                    </CustomText>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                paddingVertical: moderateScale(10, 0.6),
                paddingHorizontal: moderateScale(12, 0.6),
                borderWidth: 0.5,
                borderBottomColor: Color.mediumGray,
                width: windowWidth * 0.8,
                alignSelf: 'center',
                borderRadius: moderateScale(10, 0.6),
              }}>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(12, 0.6),
                }}>
                No match found for "{debouncedValue}"
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default SearchbarComponent;
