import React, { Component } from 'react';
import {Map, Marker} from '../../../src'
import {simpleMapStyle} from './mapstyle'

var markers = [
    {
        lng: 116.402544,
        lat: 39.928216
    },
    {
        lng: 119.0874,
        lat: 36.665582
    },
    {
        lng: 112.538537,
        lat: 37.874899
    },
    {
        lng: 114.501011,
        lat: 33.920864
    },
    {
        lng: 109.210063,
        lat: 34.339622
    },
    {
        lng: 99.430831,
        lat: 38.211366
    },
    {
        lng: 89.430831,
        lat: 33.311366
    },
    {
        lng: 99.430831,
        lat: 32.511366
    },
    {
        lng: 79.430831,
        lat: 35.611366
    },
    {
        lng: 83.430831,
        lat: 39.711366
    },
];

export default class App extends Component {
    render() {
        return <div>
        <Map mapStyle={simpleMapStyle}>
            <Marker 
                position={{lng: 116.402544, lat: 39.928216}} 
                icon="simple_red" 
                events={{
                    click: () => {
                        console.log('marker click event');
                    }
                }}
            />
            <Marker position={{lng: 119.0874, lat: 36.665582}} icon="simple_blue" />
            <Marker position={{lng: 112.538537, lat: 37.874899}} icon="loc_blue" />
            <Marker position={{lng: 114.501011, lat: 33.920864}} icon="loc_red" />
            <Marker position={{lng: 109.210063, lat: 34.339622}} icon="start" />
            <Marker position={{lng: 109.430831, lat: 38.211366}} icon="end" />
        </Map>
        <Map mapStyle={simpleMapStyle}>
            <Marker position={{lng: 109.430831, lat: 38.211366}} offset={new BMap.Size(-75, -60)}>
                <div style={{width: '150px', height: '40px', lineHeight: '40px', background: 'red', textAlign: 'center'}}>自定义覆盖物</div>
            </Marker>
            <Marker position={{lng: 109.430831, lat: 38.211366}}>
            </Marker>
        </Map>
        <Map mapStyle={simpleMapStyle}>
            {markers.map((marker, index) => {
                var icon = "red" + (index + 1);
                return <Marker map={this.props.map} icon={icon} position={{lng: marker.lng, lat: marker.lat}} {...marker} />
            })}
        </Map>
        </div>
    }
}

