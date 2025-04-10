import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  ExpoImage,
  Picker,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View, ScrollView, Dimensions, Alert, Modal, ActivityIndicator } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Calendar } from 'react-native-calendars';
import { useAvailabilityContext } from '../contexts/AvailabilityContext';

const Phase2Screen1Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  
  // Get all context values
  const { 
    availability, 
    setAvailability, 
    selectedDates, 
    timeSettings,
    timeOptions,
    isTimeSlotUnavailable,
    getUnavailableTimes,
    getAvailableTimeBlocks,
    headerInfo,
    isLoading,
    handleSaveAvailability,
    isSlotSelected,
    toggleAvailability,
    clearAvailability,
    formatDateString
  } = useAvailabilityContext();

  // Calendar modal visibility state
  const [calendarVisible, setCalendarVisible] = useState(false);
  // Marked dates in calendar
  const [markedDates, setMarkedDates] = useState({});
  
  // Update marked dates when selectedDates changes
  useEffect(() => {
    if (selectedDates.length > 0) {
      updateMarkedDates(selectedDates);
    }
  }, [selectedDates]);

  // Update marked dates in calendar
  const updateMarkedDates = (dates) => {
    const newMarkedDates = {};
    
    dates.forEach(date => {
      const dateString = formatDateString(date);
      newMarkedDates[dateString] = {
        selected: true,
        selectedColor: 'rgb(211, 39, 148)',
      };
    });
    
    setMarkedDates(newMarkedDates);
  };
  
  // Format date for display
  const formatDateHeader = (date) => {
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };
  
  // Convert duration to number of time slots
  const getDurationInSlots = () => {
    switch (timeSettings.duration) {
      case "30 MINS": return 1;
      case "1 HR": return 2;
      case "2 HRS": return 4;
      case "3 HRS": return 6;
      default: return 2; // Default to 1 HR
    }
  };
  
  // Hours for the grid display
  const getHourLabels = () => {
    const labels = [];
    
    if (timeOptions.length === 0) {
      return [];
    }
    
    // Get unique hour labels
    timeOptions.forEach(time => {
      const [hourPart, period] = time.split(' ');
      const hour = hourPart.split(':')[0];
      const label = `${hour}${period}`;
      
      if (!labels.includes(label)) {
        labels.push(label);
      }
    });
    
    return labels;
  };
  
  const hourLabels = getHourLabels();
  
  // Get day of week letter (S,M,T,W,T,F,S) from date
  const getDayLetter = (date) => {
    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    return ["Su", "M", "Tu", "W", "Th", "F", "Sa"][dayIndex];
  };
  
  // Handle calendar day press
  const handleDayPress = (day) => {
    // Calendar selection disabled in Phase 2 (guest view)
    Alert.alert(
      "Selection Not Allowed",
      "As a guest, you can only select from the days the host has made available.",
      [{ text: "OK" }]
    );
  };
  
  // Check if a time slot is unavailable (set by host)
  const isUnavailable = (dayIndex, timeIndex) => {
    const date = selectedDates[dayIndex];
    const timeSlot = timeOptions[timeIndex];
    return isTimeSlotUnavailable(date, timeSlot);
  };
  
  // Calculate cell dimensions based on screen width and number of days
  const screenWidth = Dimensions.get('window').width;
  const cellWidth = (screenWidth - 60) / (selectedDates.length > 0 ? selectedDates.length : 7);
  
  // Get date range display string
  const getDateRangeString = () => {
    if (selectedDates.length === 0) {
      return "NO DAYS SELECTED";
    }
    
    if (selectedDates.length === 1) {
      const date = selectedDates[0];
      const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
      const day = date.getDate();
      return `${month} ${day}`;
    }
    
    // Sort dates chronologically
    const sortedDates = [...selectedDates].sort((a, b) => a - b);
    
    const firstDate = sortedDates[0];
    const lastDate = sortedDates[sortedDates.length - 1];
    
    const firstMonth = firstDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const lastMonth = lastDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    
    const firstDay = firstDate.getDate();
    const lastDay = lastDate.getDate();
    
    if (firstMonth === lastMonth) {
      return `${firstMonth} ${firstDay}-${lastDay}`;
    } else {
      return `${firstMonth} ${firstDay} - ${lastMonth} ${lastDay}`;
    }
  };
  
  // Get hour label for a time slot index
  const getHourLabelForTimeSlot = (slotIndex) => {
    // Every 2 slots is a new hour (for 30-min intervals)
    const hourIndex = Math.floor(slotIndex / 2);
    return hourLabels[hourIndex];
  };
  
  // Determine if a slot is first of its hour (for labels)
  const isFirstSlotOfHour = (slotIndex) => {
    return slotIndex % 2 === 0;
  };
  
  if (isLoading) {
    return (
      <ScreenContainer
        hasSafeArea={false}
        scrollable={false}
        style={StyleSheet.applyWidth({ alignItems: 'center', justifyContent: 'center' }, dimensions.width)}
      >
        <ActivityIndicator size="large" color="rgb(211, 39, 148)" />
        <Text style={{ marginTop: 20 }}>Loading host availability...</Text>
      </ScreenContainer>
    );
  }
  
  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={true}
      style={StyleSheet.applyWidth({ alignSelf: 'auto' }, dimensions.width)}
    >
      <ScrollView>
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column' },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.body1,
                {
                  alignSelf: 'center',
                  color: 'rgb(227, 64, 162)',
                  fontFamily: 'Roboto_700Bold',
                  marginLeft: 10,
                  marginTop: 40,
                  textAlign: 'center',
                }
              ),
              dimensions.width
            )}
          >
            {"YOUR AVAILIBILITY FOR"}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.body1,
                {
                  alignSelf: 'center',
                  color: 'rgb(0, 0, 0)',
                  fontFamily: 'Roboto_700Bold',
                  fontSize: 25,
                  marginLeft: 10,
                  marginTop: 30,
                  textAlign: 'center',
                }
              ),
              dimensions.width
            )}
          >
            {"EMILY'S BIRTHDAY BASH!"}
          </Text>

          {/* Host's Availability Info */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: '#f8f9fa',
                borderRadius: 10,
                padding: 15,
                marginHorizontal: 20,
                marginTop: 20,
                borderWidth: 1,
                borderColor: '#e9ecef'
              },
              dimensions.width
            )}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 5,
                color: 'rgb(211, 39, 148)'
              }}
            >
              Host's Availability:
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 3 }}>
              Time Range: {timeSettings.startTime} - {timeSettings.endTime}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 3 }}>
              Event Duration: {timeSettings.duration}
            </Text>
            <Text style={{ fontSize: 14 }}>
              Available Dates: {getDateRangeString()}
            </Text>
          </View>

          {/* Clear Availability Button */}
          <Button
            onPress={clearAvailability}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgb(211, 39, 148)',
                marginTop: 20,
                marginHorizontal: 140,
                borderRadius: 10,
                padding: 8
              },
              dimensions.width
            )}
            title="Clear"
          />
         
          {/* Calendar Import Icons */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'flex-start',
                alignItems: 'flex-end',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-evenly',
                padding: 0,
                top: 30,
                marginBottom: 50,
              },
              dimensions.width
            )}
          >
            <Touchable>
              {/* gcal  */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image'].props}
                source={imageSource(Images['googlecalendaricon(2020)svg'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image'].style,
                    { borderStyle: 'solid', height: 65, width: 65 }
                  ),
                  dimensions.width
                )}
              />
            </Touchable>
            {/* Touchable 2 */}
            <Touchable>
              {/* apple cal */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image'].props}
                source={imageSource(Images['applecalendar(ios)svg'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image'].style,
                    { height: 65, width: 65 }
                  ),
                  dimensions.width
                )}
              />
            </Touchable>
          </View>
          
          {/* Weekly Availability Grid Section */}
          <View style={StyleSheet.applyWidth({ marginBottom: 50 }, dimensions.width)}>
            {/* Instructions for Guest */}
            <View style={{
              marginHorizontal: 20,
              marginBottom: 20,
              backgroundColor: '#e8f4f8',
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#b8e0ed'
            }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                Instructions:
              </Text>
              <Text>
                Select time slots when you are available to meet. Gray slots indicate times when the host is not available.
              </Text>
            </View>
            
            {/* Availability Grid */}
            {selectedDates.length > 0 ? (
              <View style={{ marginHorizontal: 10 }}>
                {/* Grid with hour labels and 30-min intervals */}
                <View style={{ flexDirection: 'row' }}>
                  {/* Time labels column */}
                  <View style={{ width: 40 }}>
                    {timeOptions.map((time, slotIndex) => {
                      // Only show hour label at the top of each hour (first 30-min slot)
                      if (slotIndex === 0 || isFirstSlotOfHour(slotIndex)) {
                        const hourLabel = time.split(':')[0] + time.split(' ')[1];
                        return (
                          <View 
                            key={`hour-label-${slotIndex}`} 
                            style={{ 
                              height: 25, // Height for single 30-min slot
                              justifyContent: 'flex-start',
                              paddingTop: 3
                            }}
                          >
                            <Text style={{ fontSize: 12 }}>
                              {hourLabel}
                            </Text>
                          </View>
                        );
                      } else {
                        return (
                          <View 
                            key={`hour-spacer-${slotIndex}`} 
                            style={{ height: 25 }}
                          />
                        );
                      }
                    })}
                  </View>
                  
                  {/* Day columns with 30-min interval cells */}
                    <View style={{ 
                      flex: 1, 
                      flexDirection: 'row',
                      justifyContent: selectedDates.length > 0 ? 'center' : 'flex-start' 
                    }}>
                      {selectedDates.map((date, dayIndex) => {
                        // Get available time blocks for this day
                        const availableBlocks = getAvailableTimeBlocks(date);
                        
                        return (
                          <View 
                            key={`day-${dayIndex}`} 
                            style={{ 
                              width: cellWidth, 
                              marginHorizontal: 1
                            }}
                          >
                            {timeOptions.map((time, timeIndex) => {
                              // Determine if this slot is part of a selected block
                              const isSelected = isSlotSelected(dayIndex, timeIndex);
                              const isUnavailableSlot = isUnavailable(dayIndex, timeIndex);
                              
                              // For selected slots, determine if it's the first slot in a block
                              // to show a different style (e.g., darker color or border)
                              const isFirstInBlock = isSelected && 
                                (timeIndex === 0 || !isSlotSelected(dayIndex, timeIndex - 1));
                                
                              // Determine background color based on state
                              let bgColor = '#f5f5f5'; // Default color
                              
                              if (isUnavailableSlot) {
                                bgColor = 'rgb(226, 226, 226)'; // Gray for unavailable
                              } else if (isSelected) {
                                bgColor = 'rgb(211, 39, 148)'; // Pink for selected
                                
                                // Optional: Make first slot in block slightly darker
                                if (isFirstInBlock) {
                                  bgColor = 'rgb(180, 30, 130)'; // Darker pink for first slot
                                }
                              } else {
                                // Alternating colors for available slots
                                bgColor = '#fce4ec';
                              }
                              
                              return (
                                <Touchable
                                  key={`time-slot-${dayIndex}-${timeIndex}`}
                                  onPress={() => toggleAvailability(dayIndex, timeIndex)}
                                  disabled={isUnavailableSlot}
                                >
                                  <View
                                    style={{
                                      height: 25,
                                      borderWidth: 1,
                                      borderColor: '#ddd',
                                      backgroundColor: bgColor,
                                      // Optional: Add visual indicators for first slot in a selection
                                      borderTopWidth: isFirstInBlock ? 2 : 1,
                                      borderLeftWidth: isFirstInBlock ? 2 : 1,
                                    }}
                                  />
                                </Touchable>
                              );
                            })}
                          </View>
                        );
                      })}
                    </View>
                </View>
                
                {/* Day Labels Row */}
                <View style={{ 
                  flexDirection: 'row', 
                  marginTop: 5,
                  justifyContent: selectedDates.length > 0 ? 'center' : 'flex-start'
                }}>
                  <View style={{ width: 40 }} />
                  {selectedDates.map((date, index) => (
                    <View 
                      key={`day-label-${index}`} 
                      style={{ 
                        width: cellWidth,
                        marginHorizontal: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: 'bold' 
                      }}>
                        {getDayLetter(date)}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#666'
                      }}>
                        {date.getDate()}
                      </Text>
                    </View>
                  ))}
                </View>
                
                {/* Legend */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                  marginBottom: 10
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                    <View style={{ 
                      width: 15, 
                      height: 15, 
                      backgroundColor: 'rgb(190, 190, 190)', ////
                      marginRight: 5,
                      borderWidth: 1,
                      borderColor: '#ddd'
                    }} />
                    <Text>Host Unavailable</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ 
                      width: 15, 
                      height: 15, 
                      backgroundColor: 'rgb(211, 39, 148)', 
                      marginRight: 5,
                      borderWidth: 1,
                      borderColor: '#ddd'
                    }} />
                    <Text>Your Selection</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{
                marginTop: 20,
                padding: 15,
                backgroundColor: '#fff3cd',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ffeeba',
                marginHorizontal: 20
              }}>
                <Text style={{
                  fontSize: 14,
                  color: '#856404',
                  textAlign: 'center'
                }}>
                  No dates available from the host. Please check back later.
                </Text>
              </View>
            )}
            
            {/* Submit Button */}
            <Button
              onPress={async () => {
                const success = await handleSaveAvailability(true); 
                if (success) {
                  Alert.alert(
                    "Availability Saved",
                    "Your availability has been saved successfully."
                  );
                } else {
                  Alert.alert(
                    "Error",
                    "There was an error saving your availability. Please try again.",
                    [{ text: "OK" }]
                  );
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgb(211, 39, 148)',
                  marginTop: 30,
                  marginHorizontal: 50,
                  borderRadius: 10,
                  padding: 12
                },
                dimensions.width
              )}
              title="Save Availability"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Phase2Screen1Screen);