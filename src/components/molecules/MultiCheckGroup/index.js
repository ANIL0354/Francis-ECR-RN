import React, { useState, useEffect, Component } from 'react';
import Checkbox from '../../atoms/Checkbox';
import { View } from 'react-native';
import { CHECKBOX_ACTIVE, CHECKBOX_ICON } from '../../../shared/constants'

class MultiCheckGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: props.selectedValue,
            checkboxOptions: props.checkboxOptions || []
        }
    }


    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.selectedValue.size !== state.selectedValue.size) {
            return {
                selectedValue: nextProps.selectedValue,
            }
        }
    }
    render() {
        return (
            <View>
                {this.state.checkboxOptions.map((item, index) => (
                    <Checkbox title={item.title ? item.title : item.fuelType}
                        key={index}
                        checked={this.props.selectedValue.has(index)}
                        checkedIcon={CHECKBOX_ACTIVE}
                        uncheckedIcon={CHECKBOX_ICON}
                        toggleCheck={(value) => {
                            let temp = this.state.selectedValue;
                            if (this.state.selectedValue.has(index)) {
                                temp.delete(index);
                                this.setState({
                                    selectedValue: temp
                                })
                            }
                            else {
                                temp.add(index);
                                this.setState({
                                    selectedValue: temp
                                })
                            }
                            this.props.setSelectedValue(this.state.selectedValue)
                        }}
                    />
                ))}
            </View>
        )
    }
}

export default MultiCheckGroup;