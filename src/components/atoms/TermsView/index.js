/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CANCEL_ICON } from '../../../shared/constants';
import { scaleText } from '../../../helpers';
import HTML from 'react-native-render-html';

const TermsView = ({
    content,
    visible,
    closeView
}) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={() => { }}
            supportedOrientations={['portrait', 'landscape']}
            transparent={true}>
            <HTML
                html={content}
                uri={'uri'}
                imagesMaxWidth={Dimensions.get('window').width}
                textSelectable={false}
                tagStyles={{
                    p: { color: 'black' },
                    h1: { color: 'black' },
                    h2: { color: 'black' },
                    strong: { color: 'black' }
                }}
            />
        </Modal>
    )
};

export default TermsView;