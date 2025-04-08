import React from 'react';
import {
  Button,
  ExpoImage,
  HStack,
  ScreenContainer,
  Square,
  Touchable,
  VStack,
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
import { handleSaveAvailability } from './Phase1Screen2Screen';

const Phase2Screen1Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View
        style={StyleSheet.applyWidth(
          { backgroundColor: 'rgb(255, 243, 243)', height: 852, width: 393 },
          dimensions.width
        )}
      >
        {/* Button 2 */}
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
                fontFamily: 'Roboto_800ExtraBold',
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
        <View>
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
                  marginTop: 90,
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
        </View>
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
                  {
                    borderStyle: 'solid',
                    height: 65,
                    marginLeft: -10,
                    marginTop: 50,
                    position: 'absolute',
                    width: 65,
                  }
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
                  {
                    height: 65,
                    marginLeft: -50,
                    marginTop: 50,
                    position: 'absolute',
                    width: 65,
                  }
                ),
                dimensions.width
              )}
            />
          </Touchable>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { marginLeft: 30, marginTop: 230 },
            dimensions.width
          )}
        >
          <VStack
            {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.VStackStyles(theme)['V Stack'].style,
                { gap: 8 }
              ),
              dimensions.width
            )}
          >
            {/* 9 AM */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'09:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderColor: 'rgb(0, 0, 0)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderColor: 'rgb(0, 0, 0)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 11 AM */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'11:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 1 pm */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'13:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 3 pm */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'15:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderColor: 'rgb(0, 0, 0)',
                        borderRadius: 1,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 5 pm */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'17:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 7pm */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'19:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderColor: 'rgb(0, 0, 0)',
                        borderRadius: 1,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 9 pm */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'21:00'}
              </Text>

              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(217, 217, 217)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 4 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 5 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(255, 222, 222)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 6 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
              {/* Touchable 7 */}
              <Touchable>
                <Square
                  {...GlobalStyles.SquareStyles(theme)['Square'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.SquareStyles(theme)['Square'].style,
                      {
                        backgroundColor: 'rgb(227, 64, 162)',
                        borderRadius: 1,
                        borderWidth: 1,
                        height: 25,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </Touchable>
            </HStack>
            {/* 9 AM 2 */}
            <HStack
              {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.HStackStyles(theme)['H Stack'].style,
                  { gap: 15 }
                ),
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
                      alignSelf: 'flex-end',
                      color: 'rgb(109, 109, 109)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 15,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'             '}
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
                      alignSelf: 'flex-end',
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'S  '}
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
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'M  '}
              </Text>
              {/* Text 4 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.body1,
                    {
                      alignSelf: 'flex-end',
                      color: theme.colors.text.strong,
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'T   '}
              </Text>
              {/* Text 5 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.body1,
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'W   '}
              </Text>
              {/* Text 6 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.body1,
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'T   '}
              </Text>
              {/* Text 7 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.body1,
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(8, 8, 8)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'F   '}
              </Text>
              {/* Text 8 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.body1,
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'Roboto_800ExtraBold',
                      fontSize: 18,
                      textAlign: 'right',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'S'}
              </Text>
            </HStack>
          </VStack>
        </View>
        {/* View 3 */}
        <View>
          <Button
            accessible={true}
            iconPosition={'left'}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                theme.typography.button,
                {
                  backgroundColor: 'rgb(255, 222, 222)',
                  color: 'rgb(0, 0, 0)',
                  fontFamily: 'Roboto_800ExtraBold',
                  fontSize: 16,
                  height: 10,
                  marginLeft: 105,
                  marginTop: 15,
                  width: 200,
                }
              ),
              dimensions.width
            )}
            title={'WEEK OF FEB 16TH'}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Phase2Screen1Screen);
