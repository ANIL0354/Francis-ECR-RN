/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { scaleText } from '../../../../helpers';
import moment from 'moment'

import { DAY_STATUS } from "./Helper";

export class Day extends PureComponent {

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      selectedDayIndex: 0
    }
  }

  _genStyle() {
    const {
      data, dayTextStyle, selectedDayTextStyle,
      dayContainerStyle, singleDayContainerStyle,
      beginDayContainerStyle, middleDayContainerStyle, endDayContainerStyle
    } = this.props;
    const usedDayTextStyle = [styles.dayText, dayTextStyle];
    const usedDayContainerStyle = [styles.dayContainer, dayContainerStyle];
    if (data.status !== DAY_STATUS.NONE) {
      const containerStyleMap = {
        1: [styles.singleDayContainer, singleDayContainerStyle],
        2: [styles.beginDayContainer, beginDayContainerStyle],
        3: [styles.middleDayContainer, middleDayContainerStyle],
        4: [styles.endDayContainer, endDayContainerStyle]
      };
      usedDayTextStyle.push(styles.selectedDayText, selectedDayTextStyle);
      usedDayContainerStyle.push(...(containerStyleMap[data.status] || []));
    }
    return { usedDayTextStyle, usedDayContainerStyle };
  }

  _onPress() {
    const { data = {}, onPress } = this.props;
    onPress && onPress(data.date, data.available);
  }

  enumerateDaysBetweenDates = (startDate, endDate) => {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      dates.push(moment(new Date(currDate)).format('MM/DD/YYYY'));
    }
    startDate && (dates = [moment(new Date(startDate)).format('MM/DD/YYYY'), ...dates])
    return dates;
  };


  getFreeDays = (startDate, endDate, freeDays) => {
    let days = this.enumerateDaysBetweenDates(startDate, endDate)
    let freeDates = days.slice(0, freeDays);
    let paidDates = days.slice(freeDays);
    return ({ freeDates, paidDates });
  }

  checkDay = (days, day) => {
    let index = days.findIndex(item => item == day);
    return !!(index >= 0);
  }

  render() {
    let { data, renderDay, startDate, endDate, freeDays, availableDateRange } = this.props;
    const { usedDayTextStyle, usedDayContainerStyle } = this._genStyle();
    let datesAvailabel = [];
    let activeDate = moment(new Date(data.date)).format('MM/DD/YYYY');
    startDate = !!startDate ? moment(startDate).format('MM/DD/YYYY') : '';
    endDate = !!endDate ? moment(endDate).format('MM/DD/YYYY') : '';
    datesAvailabel[0] = moment(new Date(availableDateRange[0])).format('MM/DD/YYYY');
    datesAvailabel[1] = moment(new Date(availableDateRange[1])).format('MM/DD/YYYY');
    let { freeDates = [], paidDates = [] } = this.getFreeDays(startDate, endDate, freeDays);
    let allDays = this.enumerateDaysBetweenDates(datesAvailabel[0], datesAvailabel[1]);
    let isFreedate = this.checkDay(freeDates, activeDate);
    let isPaidDate = this.checkDay(paidDates, activeDate);
    let beforeStartDate = moment(startDate).subtract(1, 'day').format('MM/DD/YYYY');
    let afterEndDate = moment(endDate).add(1, 'day').format('MM/DD/YYYY');

    return (
      <TouchableWithoutFeedback style={styles.fullContainer} onPress={this._onPress}>

        <View style={styles.fullContainer}>
          <View style={[
            styles.fullContainer,
          ]}>

            {renderDay ?
              renderDay(data) :
              <View style={[usedDayContainerStyle,
                {
                  marginVertical: scaleText(5).fontSize,
                  backgroundColor: isFreedate ? '#fe6a67' : isPaidDate ? '#f2c225' : this.checkDay(allDays, activeDate) ? '#1dd1a1' : 'transparent',
                  borderTopRightRadius: (beforeStartDate == activeDate || activeDate == datesAvailabel[1] || paidDates[paidDates.length - 1] == activeDate || freeDates[freeDates.length - 1] == activeDate) ? scaleText(20).fontSize : 0,
                  borderBottomRightRadius: (beforeStartDate == activeDate || activeDate == datesAvailabel[1] || paidDates[paidDates.length - 1] == activeDate || freeDates[freeDates.length - 1] == activeDate) ? scaleText(20).fontSize : 0,
                  borderTopLeftRadius: (afterEndDate == activeDate || activeDate == datesAvailabel[0] || paidDates[0] == activeDate || freeDates[0] == activeDate) ? scaleText(20).fontSize : 0,
                  borderBottomLeftRadius: (afterEndDate == activeDate || activeDate == datesAvailabel[0] || paidDates[0] == activeDate || freeDates[0] == activeDate) ? scaleText(20).fontSize : 0,
                }
              ]}>
                {data.date && (
                  <Text style={[...usedDayTextStyle, (data.date >= availableDateRange[0] && data.date <= availableDateRange[1]) ? { color: 'white' } : { color: 'white', opacity: .6 }]}>
                    {data.date.getDate()}
                  </Text>
                )}
              </View>
            }
          </View>
        </View>
      </TouchableWithoutFeedback >

    );
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleText(5).fontSize,
    height: 30
  },
  singleDayContainer: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4291EF'
  },
  beginDayContainer: {
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#4291EF'
  },
  middleDayContainer: {
    height: 40,
    backgroundColor: '#4291EF'
  },
  endDayContainer: {
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#4291EF'
  },
  dayText: {
    fontSize: scaleText(15).fontSize,
    color: '#333'
  },
  selectedDayText: {
    color: '#FFF'
  }
});