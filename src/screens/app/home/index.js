import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Wrapper,
  Text,
  Spacer,
  Buttons,
  StatusBars,
  TextInputs,
  Icons,
} from '../../../components';
import {useHooks} from './hooks';
import {
  appStyles,
  colors,
  fontSizes,
  responsiveHeight,
  responsiveWidth,
  routes,
  sizes,
} from '../../../services';
import {Icon} from '@rneui/base';
import {navigate} from '../../../navigation/rootNavigation';

export default function Home() {
  const {
    // States
    SelectTaskType,
    setSelectTaskType,
    SearchValue,
    setSearchValue,
    TypesOfTaskList,
    //
    TaskData,
    StatusCount,
    //
    IsLoadingData,
  } = useHooks();
  return (
    <Wrapper isMain backgroundColor={colors.appColor1 + 10}>
      <StatusBars.Dark />
      <FlatList
        data={TaskData}
        ListHeaderComponent={
          <HeaderContent
            SelectTaskType={SelectTaskType}
            setSelectTaskType={setSelectTaskType}
            TypesOfTaskList={TypesOfTaskList}
            StatusCount={StatusCount}
            SearchValue={SearchValue}
            setSearchValue={setSearchValue}
            onPress={() => {
              navigate(routes.TaskManager);
            }}
          />
        }
        ListEmptyComponent={() => {
          return IsLoadingData ? (
            <Wrapper flex={1} isCenter style={{height: responsiveHeight(69)}}>
              <ActivityIndicator size="large" color={colors.appColor1} />
            </Wrapper>
          ) : (
            <Wrapper flex={1} isCenter style={{height: responsiveHeight(69)}}>
              <Text isGray>No Task has been created</Text>
            </Wrapper>
          );
        }}
        renderItem={({item, index}) => {
          console.log('PPP?>>>>>>>>', item);
          return item?.title
            .toLowerCase()
            .includes(SearchValue.toLowerCase()) ? (
            SelectTaskType === 'All' ? (
              <RenderItem
                key={index}
                item={item}
                index={index}
                SelectTaskType={SelectTaskType}
              />
            ) : SelectTaskType === item?.status ? (
              <RenderItem
                key={index}
                item={item}
                index={index}
                SelectTaskType={SelectTaskType}
              />
            ) : null
          ) : null;
        }}
      />
    </Wrapper>
  );
}

const HeaderContent = ({
  SelectTaskType,
  setSelectTaskType,
  TypesOfTaskList,
  StatusCount,
  SearchValue,
  setSearchValue,
  onPress,
}) => {
  return (
    <Wrapper>
      <Spacer isStatusBarHeigt />
      <Wrapper marginHorizontalBase>
        <Text isLargeTitle isPrimaryColor>
          Task Manager
        </Text>
        <Spacer isSmall />
        <Text>Organize Your work and stay productive</Text>
      </Wrapper>
      <Spacer isBasic />
      <Wrapper flexDirectionRow alignItemsCenter>
        <TextInputs.Bordered
          containerStyle={{
            width: responsiveWidth(62),
            marginRight: 0,
            borderRadius: responsiveWidth(3),
            borderWidth: 1,
            borderColor: colors.appBgColor5,
            backgroundColor: colors.appBgColor1,
            height: responsiveHeight(6.2),
            fontSize: fontSizes.regular,
          }}
          onChangeText={value => {
            setSearchValue(value);
          }}
          value={SearchValue}
          inputStyle={{fontSize: fontSizes.regular}}
          placeholder="Search Tasks..."
          placeholderTextColor={'black'}
        />
        <Wrapper
          style={[
            appStyles.buttonColord,
            appStyles.ButtonRegular,
            {
              height: responsiveHeight(5),
              width: responsiveWidth(22),
              borderRadius: responsiveWidth(2),
              overflow: 'hidden',
            },
          ]}>
          <Wrapper
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            isGradient
            gradiantColors={[colors.appColor1, '#469EFC']}>
            <TouchableOpacity onPress={onPress ?? onPress}>
              <Wrapper flexDirectionRow alignItemsCenter justifyContentCenter>
                <Icons.WithText
                  text={'Create'}
                  iconName={'plus'}
                  iconSize={responsiveWidth(4)}
                  tintColor={colors.appBgColor1}
                />
              </Wrapper>
            </TouchableOpacity>
          </Wrapper>
          {/* <Buttons.Colored         
            buttonStyle={{
              alignItems: 'center',
              borderRadius: responsiveWidth(2),
              paddingHorizontal: 10,
              height: responsiveHeight(5),
              backgroundColor: colors.appColor1,
            }}
            textStyle={{
              fontSize: fontSizes.regular,
            }}
            iconName={'plus'}
            iconSize={16}
            text={'Create'}
            onPress={onPress}
          /> */}
        </Wrapper>
      </Wrapper>
      <Spacer />
      {/* Tabs Button Container */}
      <Wrapper flexDirectionRow marginHorizontalBase justifyContentSpaceBetween>
        {TypesOfTaskList.map((item, index) => {
          return (
            <TabButton
              key={index}
              title={item}
              StatusCount={StatusCount}
              isActive={SelectTaskType == item}
              onPress={() => {
                if (SelectTaskType != item) {
                  setSelectTaskType(item);
                }
              }}
            />
          );
        })}
      </Wrapper>
      <Spacer />
    </Wrapper>
  );
};

const RenderItem = ({item, index}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(routes.TaskManager, {Item: item});
      }}>
      <Wrapper
        marginHorizontalBase
        paddingVerticalSmall
        paddingHorizontalSmall
        background1
        key={index}
        flex={1}
        style={{
          borderRadius: responsiveWidth(2),
          marginBottom: sizes.baseMargin,
        }}>
        <Wrapper flexDirectionRow style={{overflow: 'hidden'}}>
          {/* Titles */}
          <Wrapper
            flex={1}
            style={{
              width: responsiveWidth(55),
            }}>
            <Text isMedium isBoldFont>
              {item?.title}
            </Text>
            <Wrapper
              paddingVerticalTiny={
                item?.description
                  ? item?.description == ''
                    ? false
                    : true
                  : false
              }>
              <Text isSmall style={{}}>
                {item?.description}
              </Text>
            </Wrapper>
            <Icons.WithText
              text={item?.CreatedDate}
              iconName={'calendar'}
              iconType={'feather'}
              iconSize={responsiveWidth(3.5)}
            />
          </Wrapper>
          {/* button */}
          <TaskStatus TaskType={item?.status} />
        </Wrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

const TaskStatus = ({TaskType, onPress}) => {
  const BtnBgColor =
    TaskType == 'Completed'
      ? colors.CompleteBgcolor
      : TaskType == 'In Progress'
      ? colors.InProgressBgColor
      : colors.todoBgColor;

  const BtnTextColor =
    TaskType == 'Completed'
      ? colors.CompleteTextColor
      : TaskType == 'In Progress'
      ? colors.InProgressTextColor
      : colors.todoTextColor;
  return (
    <TouchableOpacity
      //style={{alignItems: 'flex-end'}}
      onPress={onPress ?? onPress}
      disabled>
      <Wrapper
        paddingHorizontalSmall
        paddingVerticalSmall
        style={{
          borderRadius: responsiveWidth(100),
          backgroundColor: BtnBgColor,
        }}>
        <Wrapper flexDirectionRow alignItemsCenter>
          <Text isBoldFont isSmall style={{color: BtnTextColor}}>
            {TaskType}
          </Text>
          <Spacer horizontal isSmall />
          <Icon
            name={'arrow-down'}
            type={'simple-line-icon'}
            size={responsiveWidth(2.5)}
            style={{paddingTop: responsiveWidth(0.5)}}
            color={BtnTextColor}
          />
        </Wrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

const TabButton = ({title, onPress, isActive, StatusCount}) => {
  return (
    <TouchableOpacity style={{}} onPress={onPress}>
      <Wrapper
        background1
        style={{
          borderRadius: responsiveWidth(100),
          overflow: 'hidden',
          backgroundColor: isActive ? colors.appColor1 : colors.appBgColor1,
        }}>
        <Wrapper
          isGradient={isActive}
          gradiantColors={[colors.appColor1, '#469EFC']}>
          <Wrapper paddingHorizontalSmall paddingVerticalSmall>
            <Text isMediumFont={isActive} isSmall isWhite={isActive}>
              {title == 'All'
                ? `All (${StatusCount?.Total})`
                : StatusCount?.[title] > 0
                ? `${title} (${StatusCount?.[title]})`
                : title}
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
