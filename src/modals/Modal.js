import React, {Component} from 'react';
import Portal from "./Portal";


export default class Modal extends Component{

    render() {
        const { children, toggle, active } = this.props
        
        return (
            <Portal>
                {active &&
                    <div style={styles.wrapper}>
                        <div style={styles.window}>
                            <button style={styles.closeBtn} onClick={toggle}>X</button>
                            <div>{children}</div>
                        </div>
                    </div>
                }
            </Portal>
        )
    }
}

const styles = {
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 1450,
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.68)'
    },

    window: {
        position: 'fixed',
        background: '#fff',
        borderRadius: 5,
        top: 200,
        left: '38%',
        padding: 15,
        boxShadow: 'rgba(0, 0, 0, 0.61)',
        zIndex: 10,
        minWidth: 320
    },

    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
}
