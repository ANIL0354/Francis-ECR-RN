/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { scaleText } from '../../../../helpers';

export class MonthHeader extends PureComponent {
  render() {
    const { index, identifier, monthHeaderTextStyle, renderMonthHeader, renderPreviousMonth, renderNextMonth } = this.props;
    const [year, month] = identifier.split('-');
    return (
      <View>
        {renderMonthHeader ?
          renderMonthHeader(identifier) :
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity disabled={index === 0} onPress={() => { renderPreviousMonth(); }}>
              <Text
                style={[
                  styles.monthHeaderText,
                  monthHeaderTextStyle,
                  {
                    color: index === 0 ? 'rgba(255,255,255,0.4)' : 'white',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: scaleText(20).fontSize,
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }
                ]}>
                {'<'}
              </Text></TouchableOpacity>
            <Text style={[styles.monthHeaderText, monthHeaderTextStyle, { textAlign: 'center', fontSize: scaleText(26).fontSize, fontWeight: 'bold', textTransform: 'uppercase' }]}>
              {`${moment(identifier).format('MMMM YYYY')}`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                renderNextMonth()
              }}>
              <Text style={[
                styles.monthHeaderText,
                monthHeaderTextStyle,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: scaleText(20).fontSize,
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }
              ]}>
                {'>'}
              </Text></TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monthHeaderText: {
    flex: 1,
    marginVertical: scaleText(5).fontSize,
    fontSize: 18,
    color: '#333'
  }
});