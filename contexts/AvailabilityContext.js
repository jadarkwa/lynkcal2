import React, { createContext, useState, useContext, useEffect } from 'react';
import unavailableTimesData from '../unavailable_times.json';

// Create context
const AvailabilityContext = createContext({});

export const AvailabilityProvider = ({ children }) => {
  // State variables
  const [availability, setAvailability] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  const [timeSettings, setTimeSettings] = useState({
    startTime: '',
    endTime: '',
    duration: ''
  });
  const [timeOptions, setTimeOptions] = useState([]);
  const [headerInfo, setHeaderInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    loadAvailabilityData();
  }, []);

  // Update timeOptions when timeSettings change
  useEffect(() => {
    if (timeSettings.startTime && timeSettings.endTime) {
      setTimeOptions(generateTimeOptions());
    }
  }, [timeSettings]);

  // Load and process the JSON data
  const loadAvailabilityData = () => {
    try {
      setIsLoading(true);
      
      // Extract header information
      const headerInfo = unavailableTimesData.headerInfo || {};
      setHeaderInfo(headerInfo);
      
      // Set time settings
      setTimeSettings({
        startTime: headerInfo.startTime || '9:00 AM',
        endTime: headerInfo.endTime || '5:00 PM',
        duration: headerInfo.durationPeriod || '1 HR'
      });
      
      // Process dates from the unavailableTimes object
      const unavailableTimes = unavailableTimesData.unavailableTimes || {};
      const dates = Object.keys(unavailableTimes);
      
      // Convert string dates to Date objects
      const parsedDates = dates.map(dateStr => new Date(dateStr));
      setSelectedDates(parsedDates);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading availability data:", error);
      setIsLoading(false);
    }
  };

  // Generate time options based on host's settings
  const generateTimeOptions = () => {
    const timeOptions = [];
    
    // If no time settings loaded yet, return empty array
    if (!timeSettings.startTime || !timeSettings.endTime) {
      return [];
    }
    
    // Helper function to convert time string to minutes
    const timeToMinutes = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return hours * 60 + minutes;
    };
    
    // Helper function to convert minutes to time string
    const minutesToTime = (minutes) => {
      let hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      
      if (hours > 12) {
        hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }
      
      return `${hours}:${mins.toString().padStart(2, '0')} ${period}`;
    };
    
    // Convert start and end times to minutes
    const startMinutes = timeToMinutes(timeSettings.startTime);
    const endMinutes = timeToMinutes(timeSettings.endTime);
    
    // Generate time options in 30-minute intervals
    for (let mins = startMinutes; mins <= endMinutes; mins += 30) {
      timeOptions.push(minutesToTime(mins));
    }
    
    return timeOptions;
  };

  // Get duration in number of 30-minute slots
  const getDurationInSlots = () => {
    switch (timeSettings.duration) {
      case "30 MINS": return 1;
      case "1 HR": return 2;
      case "2 HRS": return 4;
      case "3 HRS": return 6;
      default: return 2; // Default to 1 HR (2 slots)
    }
  };

  // Format date string (YYYY-MM-DD)
  const formatDateString = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Check if a time slot is unavailable
  const isTimeSlotUnavailable = (date, timeSlot) => {
    if (!date) return true;
    
    const dateString = formatDateString(date);
    const unavailableTimes = unavailableTimesData.unavailableTimes || {};
    
    // Check if this date has unavailable times
    if (unavailableTimes[dateString]) {
      // Check if this specific time slot is in the unavailable list
      return unavailableTimes[dateString].includes(timeSlot);
    }
    
    return false;
  };

  // Get all unavailable times for a specific date
  const getUnavailableTimes = (date) => {
    if (!date) return [];
    
    const dateString = formatDateString(date);
    const unavailableTimes = unavailableTimesData.unavailableTimes || {};
    
    return unavailableTimes[dateString] || [];
  };

  // Get all available time blocks for a specific date
  const getAvailableTimeBlocks = (date) => {
    if (!date || !timeOptions.length) return [];
    
    const blocks = [];
    let currentBlock = [];
    
    timeOptions.forEach((timeSlot, index) => {
      if (!isTimeSlotUnavailable(date, timeSlot)) {
        // Add to current block
        currentBlock.push(index);
      } else if (currentBlock.length > 0) {
        // End of a block, add it to blocks array
        blocks.push([...currentBlock]);
        currentBlock = [];
      }
    });
    
    // Add the last block if it exists
    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }
    
    return blocks;
  };
  
  // Find the block that contains a specific timeIndex
  const findContainingBlock = (date, timeIndex) => {
    const blocks = getAvailableTimeBlocks(date);
    return blocks.find(block => block.includes(timeIndex)) || [];
  };

  // Check if a slot is selected by the guest
  const isSlotSelected = (dayIndex, timeIndex) => {
    return availability[`${dayIndex}-${timeIndex}`] === true;
  };

  // Find which available block a timeIndex belongs to and determine optimal selection
  const findOptimalSelectionBlock = (dayIndex, timeIndex) => {
    const date = selectedDates[dayIndex];
    const durationSlots = getDurationInSlots();
    
    // Get the available block that contains this timeIndex
    const containingBlock = findContainingBlock(date, timeIndex);
    
    if (!containingBlock.length) {
      return null;
    }
    
    // If the block is smaller than our duration, we can't select it
    if (containingBlock.length < durationSlots) {
      return null;
    }
    
    // Find where in the block our timeIndex is
    const indexPosition = containingBlock.indexOf(timeIndex);
    
    // Calculate potential start indices within this block
    const potentialStartIndices = [];
    
    // Check if we can form a block starting before the selected index
    for (let i = Math.max(0, indexPosition - durationSlots + 1); i <= indexPosition; i++) {
      // Check if a full duration can fit starting at i
      if (i + durationSlots - 1 < containingBlock.length) {
        potentialStartIndices.push(containingBlock[i]);
      }
    }
    
    if (potentialStartIndices.length === 0) {
      return null;
    }
    
    // Choose the most appropriate start index
    // If the exact timeIndex can be a start, use it
    if (potentialStartIndices.includes(timeIndex)) {
      const startIndex = timeIndex;
      return {
        startIndex,
        indices: Array.from({ length: durationSlots }, (_, i) => startIndex + i)
      };
    }
    
    // Otherwise, find the closest valid start index
    const closestStartIndex = potentialStartIndices.reduce((prev, curr) => 
      Math.abs(curr - timeIndex) < Math.abs(prev - timeIndex) ? curr : prev
    );
    
    return {
      startIndex: closestStartIndex,
      indices: Array.from({ length: durationSlots }, (_, i) => closestStartIndex + i)
    };
  };

  // Toggle guest availability
  const toggleAvailability = (dayIndex, timeIndex) => {
    // Get the date for this slot
    const date = selectedDates[dayIndex];
    const timeSlot = timeOptions[timeIndex];
    
    // Check if this time slot is unavailable (set by host)
    if (isTimeSlotUnavailable(date, timeSlot)) {
      return false;
    }
    
    const updatedAvailability = { ...availability };
    
    // Is the clicked slot currently selected?
    const isCurrentlySelected = isSlotSelected(dayIndex, timeIndex);
    
    if (isCurrentlySelected) {
      // First, determine if this is part of a larger block
      // We need to find all consecutive selected slots
      let startIndex = timeIndex;
      while (startIndex > 0 && isSlotSelected(dayIndex, startIndex - 1)) {
        startIndex--;
      }
      
      let endIndex = timeIndex;
      while (endIndex < timeOptions.length - 1 && isSlotSelected(dayIndex, endIndex + 1)) {
        endIndex++;
      }
      
      const durationSlots = getDurationInSlots();
      
      // If the selected range is exactly our duration, unselect it all
      if (endIndex - startIndex + 1 === durationSlots) {
        for (let i = startIndex; i <= endIndex; i++) {
          updatedAvailability[`${dayIndex}-${i}`] = false;
        }
      } else {
        // Find which duration-sized block this slot belongs to
        // This is more complex - we need to find aligned duration blocks
        
        // Check which exact duration block contains this timeIndex
        const blockStart = startIndex + Math.floor((timeIndex - startIndex) / durationSlots) * durationSlots;
        const blockEnd = Math.min(blockStart + durationSlots - 1, endIndex);
        
        // Unselect just this duration block
        for (let i = blockStart; i <= blockEnd; i++) {
          updatedAvailability[`${dayIndex}-${i}`] = false;
        }
      }
    } else {
      // Find optimal selection block for this timeIndex
      const optimalBlock = findOptimalSelectionBlock(dayIndex, timeIndex);
      
      if (!optimalBlock) {
        return false;
      }
      
      // Select all slots in the optimal block
      optimalBlock.indices.forEach(index => {
        updatedAvailability[`${dayIndex}-${index}`] = true;
      });
    }
    
    setAvailability(updatedAvailability);
    return true;
  };

  // Clear all selected availability slots
  const clearAvailability = () => {
    setAvailability({});
  };

  // Save guest availability
  const handleSaveAvailability = async (isGuest = false) => {
    try {
      // Here you would normally save to a server
      console.log("Saving availability:", {
        availability,
        isGuest
      });
      
      return true;
    } catch (error) {
      console.error("Error saving availability:", error);
      return false;
    }
  };

  return (
    <AvailabilityContext.Provider
      value={{
        availability,
        setAvailability,
        selectedDates,
        setSelectedDates,
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
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

// Create a hook for using the context
export const useAvailabilityContext = () => useContext(AvailabilityContext);