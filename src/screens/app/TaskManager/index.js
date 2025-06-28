import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Wrapper,
  Text,
  StatusBars,
  Spacer,
  TextInputs,
  Buttons,
  DropDowns,
  ScrollViews,
} from '../../../components';
import {
  colors,
  fontSizes,
  responsiveHeight,
  responsiveWidth,
} from '../../../services';
import {Icon} from '@rneui/base';
import {verticalScale} from 'react-native-size-matters';
import {goBack} from '../../../navigation/rootNavigation';
import {useHooks} from './hooks';

export default function Index() {
  const {
    taskValues,
    error,
    handleChangingTaskValue,
    handleSubmit,
    isLoading,
    handleDelete,
    ItemCameFromParam,
    isDelLoading,
  } = useHooks();

  return (
    <ScrollViews.WithKeyboardAvoidingView>
      <Wrapper isMain backgroundColor={colors.appColor1 + 10}>
        <StatusBars.Dark />
        <Spacer isStatusBarHeigt />
        <Spacer isBasic />
        <Wrapper
          flexDirectionRow
          alignItemsCenter
          justifyContentFlexend
          marginHorizontalBase>
          <TouchableOpacity style={styles.crossContainer} onPress={goBack}>
            <Icon
              name="cross"
              type="entypo"
              color={colors.black}
              size={responsiveWidth(6)}
            />
          </TouchableOpacity>
        </Wrapper>
        <Wrapper marginHorizontalBase>
          <Text isLargeTitle alignTextCenter isPrimaryColor>
            Create New Task
          </Text>
          <Spacer isBasic />
          <Wrapper>
            <TextInputs.Bordered
              value={taskValues.title}
              onChangeText={text => {
                handleChangingTaskValue('title', text);
              }}
              inputLabel={'Task Title'}
              containerStyle={[
                styles.inputContainer,
                error.title && {borderColor: colors.error2},
              ]}
              inputStyle={{fontSize: fontSizes.regular}}
              placeholder="Task Title"
              placeholderTextColor={'black'}
              Error={error.title}
            />
            {error.title && (
              <Wrapper marginHorizontalBase>
                <Text style={styles.errorText}>Title is required.</Text>
              </Wrapper>
            )}
            <Spacer isBasic />
            <TextInputs.Bordered
              value={taskValues.description}
              onChangeText={text => {
                handleChangingTaskValue('description', text);
              }}
              inputLabel={'Task Description'}
              editable
              multiline
              numberOfLines={5}
              containerStyle={styles.descriptionContainer}
              inputStyle={styles.textInputStyle}
              placeholder="Description..."
              placeholderTextColor={'black'}
            />
          </Wrapper>
          <Spacer />
          <DropDowns.Simple
            DropdownLabel={'Status'}
            iconNameRight={'arrow-down'}
            iconTypeRight={'feather'}
            DefaultValue={taskValues.status}
            onValueChange={value => {
              handleChangingTaskValue('status', value);
            }}
          />
          <Spacer />
          <Buttons.Colored
            buttonColor={colors.appColor1}
            buttonStyle={styles.buttonStyle}
            text={ItemCameFromParam ? 'Update Task' : 'Create Task'}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          {ItemCameFromParam && (
            <React.Fragment>
              <Spacer />
              <Buttons.Colored
                buttonColor={colors.error}
                buttonStyle={styles.buttonStyle}
                text={'Delete Task'}
                onPress={handleDelete}
                isLoading={isDelLoading}
              />
            </React.Fragment>
          )}
        </Wrapper>
      </Wrapper>
    </ScrollViews.WithKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  crossContainer: {
    height: verticalScale(25),
    width: verticalScale(25),
    backgroundColor: colors.appBgColor1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
  },
  inputContainer: {
    borderRadius: responsiveWidth(3),
    borderWidth: 1,
    borderColor: colors.appBgColor5,
    backgroundColor: colors.appBgColor1,
    fontSize: fontSizes.regular,
  },
  descriptionContainer: {
    borderRadius: responsiveWidth(3),
    borderWidth: 1,
    borderColor: colors.appBgColor5,
    backgroundColor: colors.appBgColor1,
    fontSize: fontSizes.regular,
    height: responsiveHeight(20),
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  textInputStyle: {
    height: responsiveHeight(17),
  },
  buttonStyle: {
    borderRadius: responsiveWidth(2.5),
  },
  errorText: {
    color: 'red',
    fontSize: fontSizes.small,
  },
});
