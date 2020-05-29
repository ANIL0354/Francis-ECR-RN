/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CANCEL_ICON } from '../../../shared/constants';
import { scaleText } from '../../../helpers';

const MultiImageViewer = ({
    images,
    visible,
    closeView
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={() => closeView()}
            supportedOrientations={['portrait', 'landscape']}
            transparent={true}>
            <ImageViewer
                renderHeader={() => (<TouchableOpacity
                    onPress={() => closeView()}
                    style={{ padding: scaleText(5).fontSize, justifyContent: 'flex-end', borderRadius: scaleText(10).fontSize, justifyContent: 'center', }} >
                    <Text style={{ color: 'white', fontSize: scaleText(24).fontSize, textAlign: 'right', margin: scaleText(10).fontSize }}>{'X'}</Text>
                </TouchableOpacity>)}
                imageUrls={images} />
        </Modal>
    )
};

export default MultiImageViewer;