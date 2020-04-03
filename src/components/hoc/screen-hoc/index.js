import React, { useState } from 'react';
import { Loader } from '../../atoms/loader';
import './style.scss';
import { connect } from 'react-redux';

const HOC = ({
    containerStyle,
    containerId = 'screen-hoc-container',
    contentId = 'screen-content',
    childrenStyle,
    children,
    loader = false,
}) => {
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1024) {
                setDrawerVisible(false);
                return;
            }
            else if (window.innerWidth >= 1024) {
                setDrawerVisible(true);
                return;
            }
        });
    })

    const [drawerVisible, setDrawerVisible] = useState(true);
    const responsiveScroll = () => { }
    return (
        <div id={containerId} className={containerStyle} onScroll={responsiveScroll}>

            <div id={contentId} className={childrenStyle} onClick={(e) => { window.innerWidth < 1024 && setDrawerVisible(false) }}>
                {children}
                {loader &&
                    <Loader />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const ScreenHOC = connect(mapStateToProps, mapDispatchToProps)(HOC);