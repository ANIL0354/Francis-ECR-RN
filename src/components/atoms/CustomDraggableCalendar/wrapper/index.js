/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import {
  View,
  Text,
  FlatList,
  UIManager,
  ScrollView,
  StyleSheet,
  PanResponder,
  findNodeHandle
} from 'react-native';

import { Helper, DAY_STATUS } from "./Helper";

import { Day } from "./Day";
import { MonthHeader } from "./MonthHeader";
import { scaleText } from '../../../../helpers';

export class DraggableCalendar extends Component {

  constructor(props) {

    super(props);

    const { initialSelectedRange, fullDateRange, availableDateRange, maxDays } = props;
    this.state = {
      startDate: initialSelectedRange[0],
      endDate: initialSelectedRange[1],
      index: 0,
      firstDate: null,
      secondDate: null,
      firstPick: true,
      calendarData: this._genCalendarData({ fullDateRange, availableDateRange, maxDays })
    };

    this._scrollY = 0;
    this._monthRefs = [];
    this._dayLayouts = {};
    this._touchPoint = {};
    this._panResponder = {};
    this._pressEnd = false;
    this._pressStart = false;
    this._dayLayoutsIndex = [];

    this._onScroll = this._onScroll.bind(this);
    this._onPanMove = this._onPanMove.bind(this);
    this._onPressDay = this._onPressDay.bind(this);
    this._onPanGrant = this._onPanGrant.bind(this);
    this._onPanRelease = this._onPanRelease.bind(this);
  }

  componentWillMount() {
    this._initPanResponder();
    this._updateDayStatus(this.props.initialSelectedRange);
  }

  componentDidMount() {
    Helper.waitFor(0).then(() => this._genLayouts());
  }

  resetSelection(selectionRange = []) {

    // illegal selectionRange
    if (Helper.isEmptyArray(selectionRange)) {
      return;
    }

    // updates state and makes calendar re-render
    this._updateDayStatus(selectionRange);
    this.setState({ startDate: selectionRange[0], endDate: selectionRange[1] });

    // call the func onSelectionChange which is passed by props
    const { onSelectionChange } = this.props;
    onSelectionChange && onSelectionChange(selectionRange);
  }

  _initPanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this._onPanGrant,
      onPanResponderMove: this._onPanMove,
      onPanResponderRelease: this._onPanRelease
    });
  }

  _getRefLayout(ref) {
    return new Promise(resolve => {
      UIManager.measureLayout(findNodeHandle(ref), findNodeHandle(this._sv), () => { }, (x, y, width, height, pageX, pageY) => {
        resolve({ x, y, width, height, pageX, pageY });
      });
    });
  }

  _genDayData({ startDate, endDate, availableStartDate, availableEndDate }) {

    let result = {}, curDate = new Date(startDate);

    while (curDate <= endDate) {

      // use `year-month` as the unique identifier
      const identifier = Helper.formatDate(curDate, 'yyyy-MM');

      // if it is the first day of a month, init it with an array
      // Note: there are maybe several empty days at the first of each month
      if (!result[identifier]) {
        result[identifier] = [...(new Array(curDate.getDay() % 7).fill({}))];
      }

      // save each day's data into result
      result[identifier].push({
        date: curDate,
        status: DAY_STATUS.NONE,
        available: (curDate >= availableStartDate && curDate <= availableEndDate)
      });

      // curDate adds
      curDate = Helper.addDay(curDate, 1);
    }

    // there are several empty days in each month
    Object.keys(result).forEach(key => {
      const len = result[key].length;
      result[key].push(...(new Array((7 - len % 7) % 7).fill({})));
    });

    return result;
  }

  _genCalendarData({ fullDateRange, availableDateRange, maxDays }) {

    let startDate, endDate, availableStartDate, availableEndDate;

    // if the exact dateRange is given, use availableDateRange; or render [today, today + maxDays]
    if (fullDateRange) {
      [startDate, endDate] = fullDateRange;
      [availableStartDate, availableEndDate] = availableDateRange;
    } else {
      const today = Helper.parseDate(Helper.formatDate(new Date(), 'yyyy-MM-dd'));
      availableStartDate = today;
      availableEndDate = Helper.addDay(today, maxDays);
      startDate = new Date(new Date(today).setDate(1));
      endDate = Helper.getLastDayOfMonth(availableEndDate.getFullYear(), availableEndDate.getMonth());
    }

    return this._genDayData({ startDate, endDate, availableStartDate, availableEndDate });
  }

  _genDayLayout(identifier, layout) {

    // according to the identifier, find the month data from calendarData
    const monthData = this.state.calendarData[identifier];

    // extract info from layout, and calculate the width and height for each day item
    const { x, y, width, height } = layout;
    const ITEM_WIDTH = width / 7, ITEM_HEIGHT = height / (monthData.length / 7);

    // calculate the layout for each day item
    const dayLayouts = {};
    monthData.forEach((data, index) => {
      if (data.date) {
        dayLayouts[Helper.formatDate(data.date, 'yyyy-MM-dd')] = {
          x: x + (index % 7) * ITEM_WIDTH,
          y: y + parseInt(index / 7) * ITEM_HEIGHT,
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT
        };
      }
    });

    // save dayLayouts into this._layouts.days
    Object.assign(this._dayLayouts, dayLayouts);

    // build the index for days' layouts to speed up transforming (x, y) to date
    this._dayLayoutsIndex.push(Helper.buildIndexItem({
      identifier, left: x, right: x + width,
      dayLayouts: Object.keys(dayLayouts).map(key => dayLayouts[key])
    }));
  }

  _genLayouts() {
    // after rendering scrollView and months, generates the layout params for each day item.
    Promise
      .all(this._monthRefs.map(ref => this._getRefLayout(ref)))
      .then((monthLayouts) => {
        // according to the month's layout, generates each day's layout
        monthLayouts.forEach((monthLayout, index) => {
          this._genDayLayout(Object.keys(this.state.calendarData).sort()[index], monthLayout);
        });
        this.forceUpdate();
      });
  }

  _genDraggableAreaStyle(date) {
    if (!date) {
      return null;
    } else {
      if (Helper.isEmptyObject(this._dayLayouts)) {
        return null;
      } else {
        const { x, y, width, height } = this._dayLayouts[Helper.formatDate(date, 'yyyy-MM-dd')];
        return { left: x, top: y - this._scrollY, width, height };
      }
    }
  }

  _updateDayStatus(selectionRange = []) {

    if (Helper.isEmptyArray(selectionRange)) {
      return;
    }

    const { calendarData } = this.state;
    Object.keys(calendarData).forEach(key => {

      // set a flag: if status has changed, it means this month should be re-rendered.
      let hasChanged = false;
      calendarData[key].forEach(dayData => {
        if (dayData.date) {
          const newDayStatus = Helper.getDayStatus(dayData.date, selectionRange);
          if (dayData.status !== newDayStatus) {
            hasChanged = true;
            dayData.status = newDayStatus;
          }
        }
      });

      // as monthBody is FlatList, the data should be two objects. Or it won't be re-rendered
      if (hasChanged) {
        calendarData[key] = Object.assign([], calendarData[key]);
      }
    });

    this.setState({ calendarData });
  }

  _updateSelection() {

    const { x, dx, y, dy } = this._touchPoint;
    const touchingDate = Helper.positionToDate({ x: x + dx, y: y + dy }, this._dayLayoutsIndex);
    const touchingData = Helper.dateToData(touchingDate, this.state.calendarData);

    // only if the touching day is available, it can continues
    if (!(touchingData && touchingData.available)) return;

    // generates new selection dateRange
    let newSelection = [], { startDate, endDate } = this.state;
    if (this._pressStart && touchingDate.getTime() !== startDate.getTime()) {
      if (touchingDate <= endDate) {
        newSelection = [touchingDate, endDate];
      } else {
        this._pressStart = false;
        this._pressEnd = true;
        newSelection = [endDate, touchingDate];
      }
    } else if (this._pressEnd && touchingDate.getTime() !== endDate.getTime()) {
      if (touchingDate >= startDate) {
        newSelection = [startDate, touchingDate];
      } else {
        this._pressStart = true;
        this._pressEnd = false;
        newSelection = [touchingDate, startDate];
      }
    }

    // if selection dateRange changes, update it
    if (newSelection.length > 0) {
      this.resetSelection(newSelection);
    }
  }

  _onScroll(e) {
    this._scrollY = Helper.getValue(e, 'nativeEvent:contentOffset:y', this._scrollY);
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(() => this.forceUpdate(), 100);
  }

  _onPressDay(date, available) {
    let { availableDateRange } = this.props;
    if ((this.props.startDate && ((date - this.props.startDate) / (1000 * 3600 * 24) + 1) > this.props.totalSelectable)) {
      return;
    }
    if (date > availableDateRange[1] || date < availableDateRange[0] || (this.props.endDate && this.props.startDate && (((this.props.endDate - this.props.startDate) / (1000 * 3600 * 24) + 1) === this.props.totalSelectable)) || !date) {
      return;
    }
    if (this.props.startDate) {
      this.props.setEndDate(date)
    }
    else {
      this.props.setStartDate(date)
    }
    // if (this.props.startDate) {
    //   this.setState({
    //     endDate: date,
    //   }, () => {
    //     if (this.state.secondDate && this.state.firstDate < this.state.secondDate) {
    //       this.setState({
    //         startDate: this.state.firstDate
    //       })
    //     }
    //     else if (this.state.secondDate && this.state.firstDate > this.state.secondDate) {
    //       this.setState({
    //         endDate: this.state.firstDate
    //       })
    //     }
    //     else {
    //       this.setState({
    //         startDate: this.state.firstDate
    //       })
    //     }
    //   })
    // }
    // else {
    //   this.setState({
    //     secondDate: date,
    //     firstPick: !this.state.firstPick
    //   }, () => {
    //     if (this.state.firstDate && this.state.firstDate < this.state.secondDate) {
    //       this.setState({
    //         endDate: this.state.secondDate
    //       })
    //     }
    //     else if (this.state.firstDate && this.state.firstDate > this.state.secondDate) {
    //       this.setState({
    //         startDate: this.state.secondDate
    //       })
    //     }
    //     else {
    //       this.setState({
    //         endDate: this.state.secondDate
    //       })
    //     }
    //   })
    // }
    if (date && available) {
    }
  }

  _onPanGrant(evt) {
    // save the initial position
    const { locationX, locationY } = evt.nativeEvent;
    this._touchPoint.x = locationX;
    this._touchPoint.y = locationY;
  }

  _onTouchStart(type, date) {
    const pressMap = { start: '_pressStart', end: '_pressEnd' };
    this[pressMap[type]] = true;
    if (this._pressStart || this._pressEnd) {
      const dateStr = Helper.formatDate(date, 'yyyy-MM-dd');
      this._touchPoint.x += Helper.getValue(this, `_dayLayouts:${dateStr}:x`, 0);
      this._touchPoint.y += Helper.getValue(this, `_dayLayouts:${dateStr}:y`, 0);
    }
  }

  _onPanMove(evt, gesture) {

    // save the delta offset
    const { dx, dy } = gesture;
    this._touchPoint.dx = dx;
    this._touchPoint.dy = dy;

    // updates selection dateRange
    this._updateSelection();
  }

  _onPanRelease() {
    // clear the saved info
    this._touchPoint = {};
    this._pressStart = false;
    this._pressEnd = false;
  }



  _renderBody() {
    const { calendarData, index } = this.state;
    let keys = Object.keys(calendarData);
    let displayMonth = [keys[index]];
    return (
      <View style={styles.bodyContainer}>
        <View
          ref={_ => this._sv = _}
        >
          {/* {Object
            .keys(calendarData)
            .map((key, index) => this._renderMonth({ identifier: key, data: calendarData[key], index }))
          } */}
          {displayMonth.map((key, index) => this._renderMonth({ identifier: key, data: calendarData[key], index }))}
        </View>
        {/* {this._renderMonth({ identifier: keys[index], data: calendarData[key], index })} */}
        {/* {this._renderDraggableArea()} */}
      </View>
    );
  }

  _renderMonth({ identifier, data, index }) {
    return (
      <View style={{ flex: 1, minWidth: scaleText(270).fontSize, }}>
        {this._renderMonthHeader({ identifier })}
        {this._renderMonthBody({ identifier, data, index })}
      </View>
    )
  }

  _renderMonthHeader({ identifier }) {
    const { monthHeaderTextStyle, renderMonthHeader } = this.props;
    let totalMonths = Object.keys(this.state.calendarData);
    return (
      <MonthHeader
        key={identifier}
        identifier={identifier}
        renderNextMonth={() => {
          if (this.state.index < totalMonths.length - 1) {
            this.setState({ index: this.state.index + 1 })
          }
        }}
        renderPreviousMonth={() => {
          if (this.state.index) {
            this.setState({ index: this.state.index - 1 })
          }
        }
        }
        index={this.state.index}
        totalMonths={totalMonths}
        monthHeaderTextStyle={monthHeaderTextStyle}
        renderMonthHeader={renderMonthHeader}
      />
    );
  }

  _renderMonthBody({ identifier, data, index }) {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let { startDate, endDate } = this.props;
    return (
      <>
        <View style={[{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: scaleText(20).fontSize
        }]}>
          {weekDays.map((item, index) => {
            return (
              <Text style={[{ color: 'white', flex: 1, textAlign: 'center', textTransform: 'uppercase', fontWeight: '700', fontSize: scaleText(14).fontSize }]}>
                {item}
              </Text>
            )
          })}
        </View>
        <FlatList
          ref={_ => this._monthRefs[index] = _}
          style={{ width: '100%' }}
          data={data}
          numColumns={7}
          bounces={false}
          key={`month-body-${identifier}`}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => this._renderDay(item, index, startDate, endDate)}
        />
      </>
    );
  }

  _renderDay(item, index, startDate, endDate) {
    const { renderDay, freeDays, availableDateRange } = this.props;
    const styles = [
      'dayTextStyle', 'selectedDayTextStyle',
      'dayContainerStyle', 'singleDayContainerStyle',
      'beginDayContainerStyle', 'middleDayContainerStyle', 'endDayContainerStyle'
    ].map(_ => this.props[_]);
    return (
      <Day
        key={`day-${index}`}
        {...styles}
        startDate={startDate}
        endDate={endDate}
        dayTextStyle={{ color: 'white' }}
        data={item}
        freeDays={freeDays}
        status={item.status}
        availableDateRange={availableDateRange}
        renderDay={renderDay}
        onPress={this._onPressDay}
      />
    );
  }

  _renderDraggableArea() {
    const { startDate, endDate } = this.state;
    // if (!startDate || !endDate) {
    //   return null;
    // } else {
    let isSingleChosen = false;
    if (startDate && endDate && startDate.getTime() === endDate.getTime()) {
      isSingleChosen = true
    }

    return [
      <View
        key={'drag-start'}
        // {...this._panResponder.panHandlers}
        // onTouchStart={() => this._onTouchStart('start', startDate)}
        style={[styles.dragContainer, this._genDraggableAreaStyle(startDate), { backgroundColor: 'yellow' }]
        }
      />,
      < View
        key={'drag-end'}
        // {...this._panResponder.panHandlers}
        // onTouchStart={() => this._onTouchStart('end', endDate)}
        style={[styles.dragContainer, this._genDraggableAreaStyle(endDate), { backgroundColor: 'red' }, isSingleChosen && { height: 0 }]}
      />
    ];
    // }
  }

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.container, style]}>
        {this._renderBody()}
      </View>
    );
  }
}

DraggableCalendar.defaultProps = {
  maxDays: 90,
  initialSelectedRange: []
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center'
  },
  bodyContainer: {
    flex: 1,
    overflow: 'hidden'
  },
  dragContainer: {
    zIndex: 0,
    position: 'absolute'
  }
});