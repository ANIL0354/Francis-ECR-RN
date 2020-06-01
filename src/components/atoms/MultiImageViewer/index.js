/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, TouchableOpacity, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import styles from './styles';

const MultiImageViewer = ({
    images,
    visible,
    closeView,
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
                    style={styles.closeButtonWrapper} >
                    <Text style={styles.closeButtonText}>{'X'}</Text>
                </TouchableOpacity>)}
                imageUrls={images} />
        </Modal>
    );
};

export default MultiImageViewer;
