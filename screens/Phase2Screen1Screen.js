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
import { Text, View, ScrollView, Dimensions, Alert, Modal } from 'react-native';
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
import { useAvailabilityContext, updateAvailabilitySettings } from '../contexts/AvailabilityContext';

const Phase1Screen2Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [checkbox2Value, setCheckbox2Value] = React.useState(false);
  const [checkbox3Value, setCheckbox3Value] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  
  // Time selection (start and end)
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  
  // Duration selection
  const [selectedDuration, setSelectedDuration] = React.useState('');
  // Calendar modal visibility state
  const [calendarVisible, setCalendarVisible] = useState(false);

  const { 
    availability, 
    setAvailability, 
    selectedDates, 
    setSelectedDates,
    timeSettings,
    updateAvailabilitySettings,
    getUnavailableTimes,
    handleSaveAvailability,
    isSlotSelected: contextIsSlotSelected // Rename to avoid conflict
  } = useAvailabilityContext();

  
  // Marked dates in calendar
  const [markedDates, setMarkedDates] = useState({});

  
  // Get default dates (current day + 6 more days)
  function getDefaultDates() {
    const today = new Date();
    const dates = [new Date(today)];
    
    for (let i = 1; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    
    return dates;
  }
  
  // Format date to YYYY-MM-DD string for calendar
  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Initialize markedDates when component mounts
  useEffect(() => {
    if (selectedDates.length === 0) {
      setSelectedDates(getDefaultDates());
    }
    updateMarkedDates(selectedDates);
  }, []);


  // Update context with time settings when they change
  useEffect(() => {
    if (startTime && endTime && selectedDuration) {
      updateAvailabilitySettings(startTime, endTime, selectedDuration);
    }
  }, [startTime, endTime, selectedDuration]);
  
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
  // Create 24-hour time options
  const timeOptions = [
    "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", 
    "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", 
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", 
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
  ];
  // Create time options for picker
  const timePickerOptions = timeOptions.map(time => ({
    label: time,
    value: time,
  }));
  // Duration options
  const durationOptions = [
    { label: "30 MINS", value: "30 MINS" },
    { label: "1 HR", value: "1 HR" },
    { label: "2 HRS", value: "2 HRS" },
    { label: "3 HRS", value: "3 HRS" }
  ];
  // Convert duration to number of time slots
  const getDurationInSlots = () => {
    switch (selectedDuration) {
      case "30 MINS": return 1;
      case "1 HR": return 2;
      case "2 HRS": return 4;
      case "3 HRS": return 6;
      default: return 6; // Default to 3 HRS
    }
  };
  // Hours for the grid display
  const hourLabels = [
    "12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", 
    "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"
  ];
  
  // For the actual time slots (each hour is split into two 30-min slots)
  const timeSlots = [];
  hourLabels.forEach(hour => {
    timeSlots.push(`${hour}:00`);
    timeSlots.push(`${hour}:30`);
  });
  
  // Get day of week letter (S,M,T,W,T,F,S) from date
  const getDayLetter = (date) => {
    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    return ["Su", "M", "Tu", "W", "Th", "F", "Sa"][dayIndex];
  };
  
  // Handle day press in calendar
  const handleDayPress = (day) => {
    const selectedDateStr = day.dateString;
    const selectedDate = new Date(selectedDateStr);
    
    // Check if date is already selected
    if (markedDates[selectedDateStr]) {
      // Remove date if already selected
      const updatedDates = selectedDates.filter(
        date => formatDateString(date) !== selectedDateStr
      );
      
      // Update state
      setSelectedDates(updatedDates);
      // Update marked dates
      const newMarkedDates = { ...markedDates };
      delete newMarkedDates[selectedDateStr];
      setMarkedDates(newMarkedDates);
    } else {
      // Add date if not already selected and not exceeding 7 days
      if (selectedDates.length >= 7) {
        Alert.alert(
          "Selection Limit Reached",
          "You can select a maximum of 7 days",
          [{ text: "OK" }]
        );
        return;
      }
      
      // Add new date
      const updatedDates = [...selectedDates, selectedDate];
      
      // Sort dates chronologically
      updatedDates.sort((a, b) => a - b);
      
      // Update state
      setSelectedDates(updatedDates);
      
      // Update marked dates
      const newMarkedDates = { ...markedDates };
      newMarkedDates[selectedDateStr] = {
        selected: true,
        selectedColor: 'rgb(211, 39, 148)',
      };
      setMarkedDates(newMarkedDates);
    }
  };
  
  // Handle time selection validation
  useEffect(() => {
    if (startTime && endTime) {
      const startIndex = timeOptions.indexOf(startTime);
      const endIndex = timeOptions.indexOf(endTime);
      
      if (endIndex <= startIndex) {
        Alert.alert(
          "Invalid Time Selection",
          "End time must be after start time",
          [{ text: "OK", onPress: () => setEndTime('') }]
        );
      }
    }
  }, [startTime, endTime]);
  
  // Handle grid cell selection with duration
  const toggleAvailability = (dayIndex, timeIndex) => {

    const durationSlots = getDurationInSlots();
    const updatedAvailability = { ...availability };
  
    // If we're selecting, apply duration. If unselecting, just unselect the clicked slot
    const isCurrentlySelected = availability[`${dayIndex}-${timeIndex}`] === true;
  
    if (isCurrentlySelected) {
      // Just unselect this specific slot
      updatedAvailability[`${dayIndex}-${timeIndex}`] = false;
    } else {
      // Select this slot and additional slots based on duration
      for (let i = 0; i < durationSlots; i++) {
        if (timeIndex + i < timeSlots.length) {
          updatedAvailability[`${dayIndex}-${timeIndex + i}`] = true;
        }
      }
    }
  
    setAvailability(updatedAvailability);
  };
  // Clear all selected availability slots
  const clearAvailability = () => {
    setAvailability({});
  };  
  // Check if a slot is selected
  const isSlotSelected = (day, time) => {
    const key = `${day}-${time}`;
    return availability[key] === true;
  };
  
  // Calculate cell dimensions based on screen width and number of days
  const screenWidth = Dimensions.get('window').width;
  const cellWidth = (screenWidth - 60) / (selectedDates.length > 0 ? selectedDates.length : 7);
  
  // Handle duration change
  const handleDurationChange = (newDuration) => {
    setSelectedDuration(newDuration);
  };
  
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
  
  // Convert time string to hour index (0-47 for the 48 30-min slots)
  const getTimeSlotIndex = (timeString) => {
    return timeOptions.indexOf(timeString);
  };
  
  // Get filtered time slots and hour labels based on selected time range
  const getFilteredTimeSlots = () => {
    // Default to showing all slots if no times are selected
    if (!startTime || !endTime) {
      return {
        hourIndices: hourLabels.map((_, index) => index),
        slotIndices: Array.from({ length: 48 }, (_, index) => index)
      };
    }
    
    const startIndex = getTimeSlotIndex(startTime);
    const endIndex = getTimeSlotIndex(endTime);
    
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      return {
        hourIndices: hourLabels.map((_, index) => index),
        slotIndices: Array.from({ length: 48 }, (_, index) => index)
      };
    }
    
    // Calculate which hour slots to show
    const startHourIndex = Math.floor(startIndex / 2);
    const endHourIndex = Math.ceil(endIndex / 2);
    
    const hourIndices = [];
    for (let i = startHourIndex; i < endHourIndex; i++) {
      hourIndices.push(i);
    }
    
    // Calculate which 30-min slots to show
    const slotIndices = [];
    for (let i = startIndex; i <= endIndex; i++) {
      slotIndices.push(i);
    }
    
    return { hourIndices, slotIndices };
  };
  // Get hour label for a time slot index
  const getHourLabelForTimeSlot = (slotIndex) => {
    const hourIndex = Math.floor(slotIndex / 2);
    return hourLabels[hourIndex];
  };
  
  // Determine if a slot is first of its hour (for labels)
  const isFirstSlotOfHour = (slotIndex) => {
    return slotIndex % 2 === 0;
  };
  
  const { hourIndices, slotIndices } = getFilteredTimeSlots();
  
  // Show the calendar modal
  const showCalendar = () => {
    setCalendarVisible(true);
  };
  //
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
            {"JUDE'S AVAILIBILITY FOR"}
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

          {/* Clear Availability Button */}
          <Button
            onPress={clearAvailability}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgb(211, 39, 148)',
                marginTop: 10,
                marginHorizontal: 140,
                borderRadius: 10,
                padding: 8
              },
              dimensions.width
            )}
            title="Clear"
          />
         
         

          {/* View 5 */}
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
            {/* Availability Grid */}
            <View style={{ marginHorizontal: 10 }}>
              {/* Grid with hour labels and 30-min intervals */}
              <View style={{ flexDirection: 'row' }}>
                {/* Time labels column - only show filtered hours */}
                <View style={{ width: 35 }}>
                  {slotIndices.map((slotIndex, i) => {
                    // Only show hour label at the top of each hour (first 30-min slot)
                    if (i === 0 || isFirstSlotOfHour(slotIndex)) {
                      return (
                        <View 
                          key={`hour-label-${slotIndex}`} 
                          style={{ 
                            height: 25, // Height for single 30-min slot
                            justifyContent: 'top',
                          }}
                        >
                          <Text style={{ fontSize: 12 }}>
                            {getHourLabelForTimeSlot(slotIndex)}
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
                
                {/* Day columns with filtered 30-min interval cells - only selected days */}
                <View style={{ 
                  flex: 1, 
                  flexDirection: 'row',
                  justifyContent: selectedDates.length > 0 ? 'center' : 'flex-start' 
                }}>
                  {selectedDates.map((date, dayIndex) => (
                    <View 
                      key={`day-${dayIndex}`} 
                      style={{ 
                        width: cellWidth, 
                        marginHorizontal: 1
                      }}
                    >
                      {slotIndices.map((slotIndex, i) => (
                        <Touchable
                          key={`time-slot-${dayIndex}-${slotIndex}`}
                          onPress={() => toggleAvailability(dayIndex, slotIndex)}
                        >
                          <View
                            style={{
                              height: 25,
                              borderWidth: 1,
                              borderColor: '#ddd',
                              backgroundColor: isSlotSelected(dayIndex, slotIndex) 
                                ? 'rgb(211, 39, 148)' 
                                : Math.floor(slotIndex / 2) % 2 === 0 ? '#fce4ec' : '#f5f5f5',
                            }}
                          />
                        </Touchable>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
              
              {/* Day Labels Row */}
              <View style={{ 
                flexDirection: 'row', 
                marginTop: 5,
                justifyContent: selectedDates.length > 0 ? 'center' : 'flex-start'
              }}>
                <View style={{ width: 35 }} />
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
              
              {/* Time Range Indicator */}
              {startTime && endTime && (
                <View style={{ 
                  alignItems: 'center', 
                  marginTop: 10,
                  backgroundColor: '#e1f5fe',
                  paddingVertical: 5,
                  borderRadius: 10
                }}>
                  <Text style={{ 
                    fontSize: 14, 
                    fontWeight: '500' 
                  }}>
                    {`Showing availability: ${startTime} - ${endTime}`}
                  </Text>
                </View>
              )}
              

              
             
            </View>
            
            {/* Instructions Text */}
            {selectedDates.length === 0 ? (
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
                  Please select at least one day to show the availability grid
                </Text>
              </View>
            ) : null}
            


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
export default withTheme(Phase1Screen2Screen);