import React from 'react';
import {
  Button,
  Checkbox,
  CheckboxRow,
  ExpoImage,
  Icon,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View, Alert } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openShareUtil from '../utils/openShare';
import useWindowDimensions from '../utils/useWindowDimensions';
import { useAvailabilityContext } from '../contexts/AvailabilityContext';
import { ScrollView } from 'react-native';

const Phase1Screen1Screen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [allowInviteRequests, setAllowInviteRequests] = React.useState(false);
  const [checkbox2Value, setCheckbox2Value] = React.useState(false);
  const [checkboxRow2Value, setCheckboxRow2Value] = React.useState('');
  const [checkboxRow2Value2, setCheckboxRow2Value2] = React.useState('');
  const [checkboxRow3Value, setCheckboxRow3Value] = React.useState('');
  const [checkboxRow4Value, setCheckboxRow4Value] = React.useState('');
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [checkboxRowValue10, setCheckboxRowValue10] = React.useState('');
  const [checkboxRowValue2, setCheckboxRowValue2] = React.useState('');
  const [checkboxRowValue3, setCheckboxRowValue3] = React.useState('');
  const [checkboxRowValue4, setCheckboxRowValue4] = React.useState('');
  const [checkboxRowValue5, setCheckboxRowValue5] = React.useState('');
  const [checkboxRowValue6, setCheckboxRowValue6] = React.useState('');
  const [checkboxRowValue7, setCheckboxRowValue7] = React.useState('');
  const [checkboxRowValue8, setCheckboxRowValue8] = React.useState('');
  const [checkboxRowValue9, setCheckboxRowValue9] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [checkboxValue2, setCheckboxValue2] = React.useState(false);
  const [checkboxValue3, setCheckboxValue3] = React.useState(false);
  const [checkboxValue4, setCheckboxValue4] = React.useState(false);
  const [checkboxValue5, setCheckboxValue5] = React.useState(false);
  const [checkboxValue6, setCheckboxValue6] = React.useState(false);
  const [checkboxValue7, setCheckboxValue7] = React.useState(false);
  const [checkboxValue8, setCheckboxValue8] = React.useState(false);
  const [inviteSameGuests, setInviteSameGuests] = React.useState(false);
  const [selectAllContacts, setSelectAllContacts] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');

  // Import availability context
  const { availability, selectedDates, getUnavailableTimes, handleSaveAvailability } = useAvailabilityContext();

  const myFunctionName = () => {
    function handleSelectAllContacts({
      allowInviteRequests,
      inviteSameGuests,
      selectAllContacts,
      setAllowInviteRequests,
      setInviteSameGuests,
      setSelectAllContacts,
    }) {
      const newValue = !selectAllContacts;

      setSelectAllContacts(newValue);
      setAllowInviteRequests(newValue);
      setInviteSameGuests(newValue);
    }
  };

  const myFunctionName2 = () => {
    function syncSelectAllContacts({
      allowInviteRequests,
      inviteSameGuests,
      setSelectAllContacts,
    }) {
      const shouldSelectAll = allowInviteRequests && inviteSameGuests;
      setSelectAllContacts(shouldSelectAll);
    }
  };

  // Function to handle send button click
  const handleSendButtonClick = async () => {
    // Check if any availability slots have been selected
    const unavailableTimes = getUnavailableTimes();
    const hasSelectedAvailability = Object.keys(availability).length > 0;
    const hasSelectedDates = selectedDates.length > 0;

    if (!hasSelectedDates) {
      Alert.alert(
        "No Dates Selected",
        "Please select at least one date in the calendar screen before sending.",
        [{ text: "Set Availability", onPress: () => navigation.navigate('Phase1Screen2Screen') }]
      );
      return;
    }

    if (!hasSelectedAvailability) {
      Alert.alert(
        "No Availability Selected",
        "Please select your available time slots before sending.",
        [{ text: "Set Availability", onPress: () => navigation.navigate('Phase1Screen2Screen') }]
      );
      return;
    }

    // If availability is set, proceed with saving and sharing
    try {
      await handleSaveAvailability();
      Alert.alert(
        "Availability Sent",
        "Your availability has been successfully sent to the selected contacts.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error sending availability:", error);
      Alert.alert(
        "Error",
        "There was an error sending your availability. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { flexDirection: 'column' },
        dimensions.width
      )}
    >

      <ScrollView>
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'column' },
                  dimensions.width
                )}
              >



      {/* Share Cal Button */}
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          try {
            navigation.navigate('Phase1Screen2Screen');
          } catch (err) {
            console.error(err);
          }
        }}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(theme.typography.caption, {
            backgroundColor: 'rgb(255, 222, 222)',
            borderLeftWidth: 0,
            color: 'rgb(0, 0, 0)',
            fontFamily: 'ADLaMDisplay_400Regular',
            left: 20,
            paddingLeft: 0,
            paddingTop: 15, // Add this to push text down
            textAlign: 'center',
            top: 20,
            width: '90%',
            marginBottom: 40,
          }),
          dimensions.width
        )}
        title={'SHARE AVAILABLE CALENDAR\n'}
      />
      
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            bottom: 20,
            flexDirection: 'row',
            gap: 24,
            justifyContent: 'center',
            marginBottom: 20,
          },
          dimensions.width
        )}
      >
        <Touchable>
          {/* Instagram Icon */}
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['Image'].props}
            source={imageSource(
              Images[
                'instagrambuttoniconsetinstagramscreensocialmediaandsocialnetworkinterfacetemplatestoriesuserbuttonsymbolsignlogostorieslikededitorialfreepng'
              ]
            )}
            style={StyleSheet.applyWidth(
              GlobalStyles.ExpoImageStyles(theme)['Image'].style,
              dimensions.width
            )}
          />
        </Touchable>

        <Touchable>
          {/* Snapchat Icon */}
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['Image'].props}
            source={imageSource(Images['socialsnapchatcircle512'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image'].style,
                { height: 70, right: 20, width: 70 }
              ),
              dimensions.width
            )}
          />
        </Touchable>

        <Touchable>
          {/* iMessage Icon */}
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['Image'].props}
            source={imageSource(Images['imessagelogosvg'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image'].style,
                { height: 70, marginRight: 10, width: 70 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
        {/* Touchable 3 */}
        <Touchable
          onPress={() => {
            const handler = async () => {
              try {
                await openShareUtil('Share');
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={StyleSheet.applyWidth(
            { borderRadius: 30, height: 60, width: 60 },
            dimensions.width
          )}
        >
          <Icon
            color={theme.colors.text.strong}
            name={'Ionicons/share-social-outline'}
            size={60}
            style={StyleSheet.applyWidth({ right: 15 }, dimensions.width)}
          />
        </Touchable>
      </View>

      <View
        style={StyleSheet.applyWidth(
          {
            bottom: 40,
            gap: 16,
            height: 10,
            marginTop: 0,
            position: 'relative',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              gap: 12,
            },
            dimensions.width
          )}
        >
          <Checkbox
            onPress={newCheckboxValue => {
              try {
                setAllowInviteRequests(newCheckboxValue);
              } catch (err) {
                console.error(err);
              }
            }}
            color={theme.colors.text.strong}
            status={allowInviteRequests}
            style={StyleSheet.applyWidth({ height: 10 }, dimensions.width)}
            uncheckedColor={theme.colors.text.light}
          />
          {/* Allow people to request invite */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.body1,
                { fontFamily: 'ADLaMDisplay_400Regular', fontSize: 10 }
              ),
              dimensions.width
            )}
          >
            {'ALLOW PEOPLE TO REQUEST INVITE\n'}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              bottom: 3,
              flexDirection: 'row',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <Checkbox
            onPress={newCheckboxValue => {
              try {
                setInviteSameGuests(newCheckboxValue);
              } catch (err) {
                console.error(err);
              }
            }}
            color={theme.colors.text.strong}
            status={inviteSameGuests}
            uncheckedColor={theme.colors.text.light}
          />
          {/* Invite same guests as last time */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.body1,
                {
                  fontFamily: 'ADLaMDisplay_400Regular',
                  fontSize: 10,
                  marginLeft: 12,
                }
              ),
              dimensions.width
            )}
          >
            {'INVITE SAME GUESTS AS LAST TIME'}
          </Text>
        </View>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'flex-start',
              left: 93,
            },
            dimensions.width
          )}
        >
          <Checkbox
            onPress={newCheckboxValue => {
              const checkboxValue = newCheckboxValue;
              try {
                setCheckboxValue8(newCheckboxValue);
              } catch (err) {
                console.error(err);
              }
            }}
            status={checkboxValue8}
            color="black" // Checked color = black
            uncheckedColor="gray" // Unchecked color = gray
          />
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.body1,
                {
                  fontFamily: 'ADLaMDisplay_400Regular',
                  fontSize: 10,
                  paddingTop: 5,
                }
              ),
              dimensions.width
            )}
          >
            {'SELECT ALL CONTACTS'}
          </Text>
        </View>
      </View>
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={true}
        changeTextDelay={500}
        onChangeText={newTextInputValue => {
          const textInputValue = newTextInputValue;
          try {
            setTextInputValue2(newTextInputValue);
          } catch (err) {
            console.error(err);
          }
        }}
        webShowOutline={true}
        {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
        placeholder={'Add and search for people by name and group'}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextInputStyles(theme)['Text Input'].style,
            theme.typography.body2,
            { alignSelf: 'center', position: 'relative', top: 80, width: 375 }
          ),
          dimensions.width
        )}
        value={textInputValue2}
      />
      {/* View 2 */}
      <View style={StyleSheet.applyWidth({ marginTop: 120 }, dimensions.width)}>
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color'],
              borderRadius: 10,
              marginBottom: 12,
              marginLeft: 12,
              marginRight: 12,
              marginTop: 12,
            },
            dimensions.width
          )}
        >
          <CheckboxRow
            onPress={newCheckboxRowValue => {
              const checkboxRowValue = newCheckboxRowValue;
              try {
                setCheckboxRowValue(newCheckboxRowValue);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].props}
            color={theme.colors.text.strong}
            label={'Person 1'}
            status={checkboxRowValue}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].style,
                { fontFamily: 'System', fontWeight: '400', width: 375 }
              ),
              dimensions.width
            )}
            uncheckedColor={theme.colors.text.strong}
          />
        </View>
        {/* View 5 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color'],
              borderRadius: 10,
              marginBottom: 12,
              marginLeft: 12,
              marginRight: 12,
              marginTop: 12,
            },
            dimensions.width
          )}
        >
          <CheckboxRow
            onPress={newCheckboxRowValue => {
              const checkboxRowValue = newCheckboxRowValue;
              try {
                setCheckboxRowValue8(newCheckboxRowValue);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].props}
            color={theme.colors.text.strong}
            label={'Person 2'}
            status={checkboxRowValue8}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].style,
                { width: 375 }
              ),
              dimensions.width
            )}
            uncheckedColor={theme.colors.text.strong}
          />
        </View>
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color'],
              borderRadius: 10,
              marginBottom: 12,
              marginLeft: 12,
              marginRight: 12,
              marginTop: 12,
            },
            dimensions.width
          )}
        >
          <CheckboxRow
            onPress={newCheckboxRowValue => {
              const checkboxRowValue = newCheckboxRowValue;
              try {
                setCheckboxRowValue9(newCheckboxRowValue);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].props}
            color={theme.colors.text.strong}
            label={'Person 3'}
            status={checkboxRowValue9}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].style,
                { width: 375 }
              ),
              dimensions.width
            )}
            uncheckedColor={theme.colors.text.strong}
          />
        </View>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color'],
              borderRadius: 10,
              marginBottom: 12,
              marginLeft: 12,
              marginRight: 12,
              marginTop: 12,
            },
            dimensions.width
          )}
        >
          <CheckboxRow
            onPress={newCheckboxRowValue => {
              const checkboxRowValue = newCheckboxRowValue;
              try {
                setCheckboxRowValue10(newCheckboxRowValue);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].props}
            color={theme.colors.text.strong}
            label={'Person 4'}
            status={checkboxRowValue10}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].style,
                { width: 375 }
              ),
              dimensions.width
            )}
            uncheckedColor={theme.colors.text.strong}
          />
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color'],
              borderRadius: 10,
              marginBottom: 12,
              marginLeft: 12,
              marginRight: 12,
              marginTop: 12,
            },
            dimensions.width
          )}
        >
          {/* Checkbox Row 2 */}
          <CheckboxRow
            onPress={newCheckboxRow2Value => {
              const checkboxRowValue = newCheckboxRow2Value;
              try {
                setCheckboxRow2Value2(newCheckboxRow2Value);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].props}
            color={theme.colors.text.strong}
            label={'Person 5'}
            status={checkboxRow2Value2}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.CheckboxRowStyles(theme)['Checkbox Row'].style,
                { width: 375 }
              ),
              dimensions.width
            )}
            uncheckedColor={theme.colors.text.strong}
          />
        </View>
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={handleSendButtonClick}
          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button'].style,
              theme.typography.button,
              {
                backgroundColor: theme.colors.border.danger,
                borderRadius: 10,
                marginBottom: 10,
                marginLeft: 150,
                marginRight: 150,
                marginTop: 10,
                paddingVertical: 10,
                width: 100,
              }
            ),
            dimensions.width
          )}
          title={'Send'}
        />
      </View>
      </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Phase1Screen1Screen);