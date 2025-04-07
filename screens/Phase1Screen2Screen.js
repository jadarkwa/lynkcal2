import React from 'react';
import {
  Button,
  Checkbox,
  ExpoImage,
  Picker,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const Phase1Screen2Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [checkbox2Value, setCheckbox2Value] = React.useState(false);
  const [checkbox3Value, setCheckbox3Value] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  const [picker2Value, setPicker2Value] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [pickerValue2, setPickerValue2] = React.useState('');
  const [pickerValue3, setPickerValue3] = React.useState('');

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth({ alignSelf: 'auto' }, dimensions.width)}
    >
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'column' },
          dimensions.width
        )}
      >
        <Button
          accessible={true}
          iconPosition={'left'}
          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
          icon={'AntDesign/arrowleft'}
          iconSize={16}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button'].style,
              theme.typography.button,
              {
                backgroundColor: 'rgb(255, 222, 222)',
                color: 'rgb(0, 0, 0)',
                fontFamily: 'ADLaMDisplay_400Regular',
                left: 10,
                padding: 5,
                top: 10,
                width: 80,
              }
            ),
            dimensions.width
          )}
          title={'BACK\n'}
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
                color: 'rgb(211, 39, 148)',
                fontFamily: 'Roboto_600SemiBold',
                fontSize: 25,
                marginTop: 30,
                textAlign: 'center',
              }
            ),
            dimensions.width
          )}
        >
          {'HOST CALENDAR'}
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
            },
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
                  alignSelf: 'flex-start',
                  fontFamily: 'ADLaMDisplay_400Regular',
                  marginLeft: 60,
                  marginTop: 40,
                }
              ),
              dimensions.width
            )}
          >
            {'Start Time\n'}
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
                  fontFamily: 'ADLaMDisplay_400Regular',
                  marginLeft: 120,
                  marginTop: 40,
                }
              ),
              dimensions.width
            )}
          >
            {'End Time'}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row' },
            dimensions.width
          )}
        >
          <Picker
            autoDismissKeyboard={true}
            dropDownBorderColor={theme.colors.border.base}
            dropDownBorderRadius={8}
            dropDownBorderWidth={1}
            dropDownTextColor={theme.colors.text.strong}
            iconSize={24}
            leftIconMode={'inset'}
            mode={'native'}
            onValueChange={newPickerValue => {
              try {
                setPickerValue(newPickerValue);
              } catch (err) {
                console.error(err);
              }
            }}
            selectedIconColor={theme.colors.text.strong}
            selectedIconName={'Feather/check'}
            selectedIconSize={20}
            type={'solid'}
            {...GlobalStyles.PickerStyles(theme)['Picker'].props}
            dropDownBackgroundColor={theme.colors.background.danger}
            label={pickerValue}
            options={pickerValue}
            placeholder={'Select a time'}
            placeholderTextColor={theme.colors.text.medium}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.PickerStyles(theme)['Picker'].style,
                theme.typography.body2,
                { left: 40, width: 130 }
              ),
              dimensions.width
            )}
            value={pickerValue}
          />
          {/* Picker 2 */}
          <Picker
            autoDismissKeyboard={true}
            dropDownBorderColor={theme.colors.border.base}
            dropDownBorderRadius={8}
            dropDownBorderWidth={1}
            dropDownTextColor={theme.colors.text.strong}
            iconSize={24}
            leftIconMode={'inset'}
            mode={'native'}
            onValueChange={newPicker2Value => {
              const pickerValue = newPicker2Value;
              try {
                setPicker2Value(newPicker2Value);
              } catch (err) {
                console.error(err);
              }
            }}
            selectedIconName={'Feather/check'}
            selectedIconSize={20}
            type={'solid'}
            {...GlobalStyles.PickerStyles(theme)['Picker'].props}
            dropDownBackgroundColor={theme.colors.background.danger}
            placeholder={'Select a time'}
            placeholderTextColor={theme.colors.text.medium}
            selectedIconColor={theme.colors.text.strong}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.PickerStyles(theme)['Picker'].style,
                theme.typography.body2,
                { left: 230, position: 'absolute', width: 130 }
              ),
              dimensions.width
            )}
            value={picker2Value}
          />
        </View>
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'space-around',
              top: 35,
              width: 300,
            },
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
                { fontFamily: 'ADLaMDisplay_400Regular', fontSize: 12 }
              ),
              dimensions.width
            )}
          >
            {'Weekly'}
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
                { fontFamily: 'ADLaMDisplay_400Regular', fontSize: 12 }
              ),
              dimensions.width
            )}
          >
            {'Monthly'}
          </Text>
          {/* Text 3 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.body1,
                { fontFamily: 'ADLaMDisplay_400Regular', fontSize: 12 }
              ),
              dimensions.width
            )}
          >
            {'Repeat?'}
          </Text>
        </View>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'space-evenly', top: 40 },
            dimensions.width
          )}
        >
          {/* WeeklyCheckbox */}
          <Checkbox
            onPress={newWeeklyCheckboxValue => {
              const checkboxValue = newWeeklyCheckboxValue;
              try {
                setCheckboxValue(newWeeklyCheckboxValue);
              } catch (err) {
                console.error(err);
              }
            }}
            color={theme.colors.text.strong}
            status={checkboxValue}
            uncheckedColor={theme.colors.text.strong}
          />
          {/* MonthlyCheckbox */}
          <Checkbox
            onPress={newMonthlyCheckboxValue => {
              const checkboxValue = newMonthlyCheckboxValue;
              try {
                setCheckbox2Value(newMonthlyCheckboxValue);
              } catch (err) {
                console.error(err);
              }
            }}
            color={theme.colors.text.strong}
            status={checkbox2Value}
            uncheckedColor={theme.colors.text.strong}
          />
          {/* RepeatCheckbox */}
          <Checkbox
            onPress={newRepeatCheckboxValue => {
              const checkboxValue = newRepeatCheckboxValue;
              try {
                setCheckbox3Value(newRepeatCheckboxValue);
              } catch (err) {
                console.error(err);
              }
            }}
            color={theme.colors.text.strong}
            status={checkbox3Value}
            uncheckedColor={theme.colors.text.strong}
          />
        </View>
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
                fontFamily: 'ADLaMDisplay_400Regular',
                marginTop: 50,
              }
            ),
            dimensions.width
          )}
        >
          {'DURATION PERIOD'}
        </Text>
        {/* Button 2 */}
        <Button
          accessible={true}
          iconPosition={'left'}
          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button'].style,
              theme.typography.button,
              {
                backgroundColor: palettes.App['Custom Color'],
                color: 'rgb(0, 0, 0)',
                fontFamily: 'ADLaMDisplay_400Regular',
                fontSize: 15,
                left: 130,
                top: 10,
                width: 130,
              }
            ),
            dimensions.width
          )}
          title={'3 HRS'}
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
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Phase1Screen2Screen);
