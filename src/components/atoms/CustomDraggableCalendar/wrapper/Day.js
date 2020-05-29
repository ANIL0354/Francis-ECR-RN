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


  render() {
    const { data, renderDay, weekDays, startDate, endDate, freeDays, availableDateRange } = this.props;
    const { usedDayTextStyle, usedDayContainerStyle } = this._genStyle();
    return (
      <TouchableWithoutFeedback style={styles.fullContainer} onPress={this._onPress}>

        <View style={styles.fullContainer}>
          <View style={{
            ...styles.fullContainer,
            padding: 0,
            backgroundColor: data.date && availableDateRange && (data.date >= availableDateRange[0] && data.date <= availableDateRange[1]) ? data.date && (startDate && endDate && data.available
              ? data.date >= startDate && data.date <= endDate
              : data.date === startDate || data.date === endDate)
              ? (((data.date - startDate) / (1000 * 3600 * 24)) < freeDays) ? '#fe6a67' : '#f2c225' : '#1dd1a1' : 'transparent',
            borderTopRightRadius: data.date === endDate || (((data.date - startDate) / (1000 * 3600 * 24) + 1) === freeDays) || new Date(data.date).getDate() === new Date(availableDateRange[1]).getDate() ? scaleText(20).fontSize : 0,
            borderBottomRightRadius: data.date === endDate || (((data.date - startDate) / (1000 * 3600 * 24) + 1) === freeDays) || new Date(data.date).getDate() === new Date(availableDateRange[1]).getDate() ? scaleText(20).fontSize : 0,
            borderTopLeftRadius: data.date === startDate || (((data.date - startDate) / (1000 * 3600 * 24)) === freeDays) || new Date(data.date).getDate() === new Date(availableDateRange[0]).getDate() || new Date(data.date).getDate() === (new Date(endDate).getDate() + 1) ? scaleText(20).fontSize : 0,
            borderBottomLeftRadius: data.date === startDate || (((data.date - startDate) / (1000 * 3600 * 24)) === freeDays) || new Date(data.date).getDate() === new Date(availableDateRange[0]).getDate() || new Date(data.date).getDate() === (new Date(endDate).getDate() + 1) ? scaleText(20).fontSize : 0,
            // borderRadius: scaleText(20).fontSize
            // borderTopRightRadius:
            //   data.date === endDate || (((data.date - startDate) / (1000 * 3600 * 24)) === freeDays - 1) || !endDate
            //     ? scaleText(20).fontSize
            //     : data.date === availableDateRange[1]
            //       ? scaleText(20).fontSize
            //       : 0,
            // borderBottomRightRadius:
            //   data.date === availableDateRange[1]
            //     ? scaleText(20).fontSize
            //     : data.date === endDate || (((data.date - startDate) / (1000 * 3600 * 24)) === freeDays - 1) || !endDate
            //       ? scaleText(20).fontSize
            //       : 0
            // borderRadius:
            // red : #fe6a67 ==== yellow: '#f2c225' ==== blue : '#1dd1a1'
            //   !startDate || !endDate
            //     ? scaleText(20).fontSize
            //     : 0,
            // paddingLeft:
            //   moment(data.date).format('YYYY-MM-DD') === moment(availableDateRange[0]).format('YYYY-MM-DD')
            //     ? scaleText(5).fontSize
            //     : 0,
            // paddingRight:
            //   moment(data.date).format('YYYY-MM-DD') === moment(availableDateRange[1]).format('YYYY-MM-DD')
            //     ? scaleText(5).fontSize :
            //     0
          }}>
            {renderDay ?
              renderDay(data) :
              <View style={[
                usedDayContainerStyle,
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