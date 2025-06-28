import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Icon} from '@rneui/base';
import {
  appFonts,
  colors,
  fontSizes,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  sizes,
} from '../../services';
import {Wrapper} from '..';
import Spacer from '../spacer';

export const Simple = ({
  ContainerWidth,
  DropdownLabel,
  DefaultValue,
  DropdownPlaceHolder,
  DropdownData,
  DropDownLabelField,
  DropDownValueField,
  OptionContainerWidth,
  onValueChange,
  placeholderColor,
  isMultiSelect, // New prop for multi-select
}) => {
  const [selectedValue, setselectedValue] = useState();
  useEffect(() => {
    if (DefaultValue) {
      setselectedValue(DefaultValue);
    }
  }, [DefaultValue]);
  const Defaultdata = [
    {label: 'Todo', value: 'Todo'},
    {label: 'In Progress', value: 'In Progress'},
    {label: 'Completed', value: 'Completed'},
  ];
  const DefaultContainerWidth = ContainerWidth
    ? ContainerWidth
    : responsiveWidth(90);

  const handleValueChange = item => {
    setselectedValue([item.value]);
    onValueChange && onValueChange(item.value);
  };

  return (
    <Wrapper>
      {DropdownLabel ? (
        <Wrapper marginHorizontalBase>
          <Text style={styles.DropdownLabel}>{DropdownLabel}</Text>
          <Spacer isSmall />
        </Wrapper>
      ) : null}
      <View style={[styles.container, {width: DefaultContainerWidth}]}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            renderRightIcon={() => (
              <Icon
                name="keyboard-arrow-down"
                type="material"
                size={responsiveWidth(6)}
                color={colors.appTextColor5}
              />
            )}
            style={styles.dropdown}
            containerStyle={{
              backgroundColor: colors.appBgColor1,
              borderRadius: responsiveWidth(3),
              borderWidth: 0,
              overflow: 'hidden',
            }}
            data={DropdownData ? DropdownData : Defaultdata}
            labelField={DropDownLabelField ? DropDownLabelField : 'label'}
            valueField={DropDownValueField ? DropDownValueField : 'value'}
            placeholder={
              selectedValue
                ? selectedValue
                : DropdownPlaceHolder
                ? DropdownPlaceHolder
                : 'Select'
            }
            placeholderStyle={{
              color: placeholderColor ? placeholderColor : colors.appTextColor1,
            }}
            value={selectedValue}
            selectedTextStyle={{color: colors.appTextColor1}}
            onChange={handleValueChange}
            renderItem={item => (
              <View
                style={[
                  styles.optionContainer,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                  OptionContainerWidth && {width: OptionContainerWidth},
                  selectedValue.includes(item.value) && {
                    backgroundColor: colors.appColor1 + 80,
                  },
                ]}>
                <Text
                  style={[
                    styles.optionText,
                    OptionContainerWidth && {width: OptionContainerWidth},
                  ]}>
                  {item.label}
                </Text>
                {selectedValue.includes(item.value) && (
                  <Icon
                    name="check"
                    type="feather"
                    size={responsiveWidth(4)}
                    color={colors.appBgColor6}
                    //style={{position: 'absolute', right: 10}}
                  />
                )}
              </View>
            )}
          />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  DropdownLabel: {
    fontFamily: appFonts.appTextBold,
    fontSize: fontSizes.regular,
    //color:colors.,
  },
  container: {
    //flex: 1,
    borderColor: 'red',
    //backgroundColor: 'green',
    //width: responsiveWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.appBgColor4,
    borderRadius: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(4.5),
    backgroundColor: colors.appBgColor1,
    height: responsiveHeight(7),
    width: responsiveWidth(80),
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    height: sizes.inputHeight,
  },

  optionContainer: {
    padding: responsiveWidth(2),
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.appBgColor6,
  },
  optionText: {
    fontSize: responsiveFontSize(16),
    color: colors.appTextColor1,
  },
});
