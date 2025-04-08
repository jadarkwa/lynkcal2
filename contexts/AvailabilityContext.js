import React, { createContext, useState, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Create the context
const AvailabilityContext = createContext();

// Provider component
export const AvailabilityProvider = ({ children }) => {
  // State for storing availability data
  const [availability, setAvailability] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  
  // Get unavailable times
  const getUnavailableTimes = () => {
    const unavailableTimes = {};
    
    selectedDates.forEach((date, dayIndex) => {
      const dateString = formatDateString(date);
      const dayUnavailableTimes = [];
      
      // For each possible time slot
      const timeOptions = [
        "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", 
        "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", 
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", 
        "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
      ];
      
      // Check each time slot
      for (let slotIndex = 0; slotIndex < timeOptions.length; slotIndex++) {
        if (!isSlotSelected(dayIndex, slotIndex)) {
          // This slot is unavailable - add it to the list
          const timeString = timeOptions[slotIndex];
          dayUnavailableTimes.push(timeString);
        }
      }
      
      // Only add days that have unavailable times
      if (dayUnavailableTimes.length > 0) {
        unavailableTimes[dateString] = dayUnavailableTimes;
      }
    });
    
    return unavailableTimes;
  };
  
  // Save availability data to a file and share it
  const handleSaveAvailability = async () => {
    try {
      const unavailableTimes = getUnavailableTimes();
      
      // Convert to JSON string for export
      const jsonData = JSON.stringify(unavailableTimes, null, 2);
      
      // Define the file path
      const fileName = 'unavailable_times.json';
      const filePath = FileSystem.documentDirectory + fileName;
      
      // Write the JSON data to the file
      await FileSystem.writeAsStringAsync(filePath, jsonData);
      
      // Share the file with the user
      shareUnavailabilityFile(filePath, fileName);
      
      return true;
    } catch (error) {
      console.error("Error saving availability:", error);
      return false;
    }
  };





  // Helper function to share the availability file
  const shareUnavailabilityFile = async (filePath, fileName) => {
    try {
      const shareResult = await FileSystem.getContentUriAsync(filePath);
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(shareResult, {
          mimeType: 'application/json',
          dialogTitle: 'Share your unavailable times',
          UTI: 'public.json'
        });
      }
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };
  
  // Helper function to format date string
  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Helper function to check if a slot is selected
  const isSlotSelected = (dayIndex, slotIndex) => {
    const key = `${dayIndex}-${slotIndex}`;
    return availability[key] === true;
  };

  return (
    <AvailabilityContext.Provider
      value={{
        availability,
        setAvailability,
        selectedDates,
        setSelectedDates,
        getUnavailableTimes,
        handleSaveAvailability,
        isSlotSelected
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

// Custom hook for using the context
export const useAvailabilityContext = () => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error('useAvailabilityContext must be used within an AvailabilityProvider');
  }
  return context;
};