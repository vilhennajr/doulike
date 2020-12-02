import React from 'react';
import {Tag, Tooltip,} from 'antd';

export default class SignalTag extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            value: props.value
        }
    }

    signalArray = {
        'ATIVO': 'green',
        'INATIVO': 'red',
        'EM ESPERA': 'blue'
    };
    
    render() {

        function onEnter(e) {
            e.target.style.width = '18px';
            e.target.style.height = '18px';
        }

        function onLeave(e) {
            e.target.style.width = '16px';
            e.target.style.height = '16px';
        }

        return (
            <Tooltip title={this.state.value} color={this.signalArray[this.state.value]} key={this.signalArray[this.state.value]}>
                <Tag onMouseEnter={onEnter} onMouseLeave={onLeave} color={this.signalArray[this.state.value]} style={{width:16, height:16, borderRadius:50}}></Tag>
            </Tooltip>
        );
    }
}