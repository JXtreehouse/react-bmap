/**
 * @file 地图主文件
 * @author kyle(hinikai@gmail.com)
 */

import React from 'react';
import Component from './component';
import {isString} from '../utils/common';

export default class Map extends Component {

    constructor(args) {
        super(args);
    }

    /**
     * 设置默认的props属性
     */
    static get defaultProps() {
        return {
            style: {
                height: '350px'
            },
            center: {
                lng: 105.403119,
                lat: 38.028658
            },
            zoom: 5
        }
    }

    /**
     * 获取可以给地图绑定的事件名
     */
    get events() {
        return [
            'click',
            'dblclick',
            'rightclick',
            'rightdblclick',
            'maptypechange',
            'mousemove',
            'mouseover',
            'mouseout',
            'movestart',
            'moving',
            'moveend',
            'zoomstart',
            'zoomend',
            'addoverlay',
            'addcontrol',
            'removecontrol',
            'removeoverlay',
            'clearoverlays',
            'dragstart',
            'dragging',
            'dragend',
            'addtilelayer',
            'removetilelayer',
            'load',
            'resize',
            'hotspotclick',
            'hotspotover',
            'hotspotout',
            'tilesloaded',
            'touchstart',
            'touchmove',
            'touchend',
            'longpress'
        ];
    }

    get toggleMethods() {
        return {
            enableScrollWheelZoom: ['enableScrollWheelZoom', 'disableScrollWheelZoom'],
            enableDragging: ['enableDragging', 'disableDragging'],
            enableDoubleClickZoom: ['enableDoubleClickZoom', 'disableDoubleClickZoom'],
            enableKeyboard: ['enableKeyboard', 'disableKeyboard'],
            enableInertialDragging: ['enableInertialDragging', 'disableInertialDragging'],
            enableContinuousZoom: ['enableContinuousZoom', 'disableContinuousZoom'],
            enablePinchToZoom: ['enablePinchToZoom', 'disablePinchToZoom'],
            enableAutoResize: ['enableAutoResize', 'disableAutoResize'],
        }
    }

    get options() {
        return [
            'minZoom',
            'maxZoom',
            'mapType',
            'enableMapClick'
        ]
    }

    componentDidMount() {
        this.initMap();
        this.forceUpdate();
    }

    componentDidUpdate(prevProps) {
        var preCenter = prevProps.center;
        var center = this.props.center;
        if (preCenter && center) {
            if (isString(center)) { // 可以传入城市名
                this.map.centerAndZoom(center);
            } else {
                if (preCenter.lng != center.lng || preCenter.lat != center.lat) {
                    this.map.setCenter(new BMap.Point(center.lng, center.lat));
                }
            }
        }

        if (prevProps.zoom !== this.props.zoom) {
            this.map.zoomTo(this.props.zoom);
        }
    }

    initMap() {

        // 创建Map实例
        var options = this.options;
        options = this.getOptions(options);
        if (this.props.enableMapClick !== true) {
            options.enableMapClick = false;
        }
        var map = new BMap.Map(this.refs.map, options);

        this.map = map;

        if (this.props.mapStyle) {
            map.setMapStyle(this.props.mapStyle);
        }

        var zoom = this.props.zoom;

        if (isString(this.props.center)) { // 可以传入城市名
            map.centerAndZoom(this.props.center);
        } else { // 正常传入经纬度坐标
            var center = new BMap.Point(this.props.center.lng, this.props.center.lat);
            map.centerAndZoom(center, zoom);  // 初始化地图,设置中心点坐标和地图级别
        }

        this.bindToggleMeghods(map, this.toggleMethods);
        this.bindEvent(map, this.events);

        var lastZoom = zoom;
        map.addEventListener('zoomend', () => {
            var zoom = map.getZoom();
            this.props.zoom_changed && this.props.zoom_changed(zoom, lastZoom);
            lastZoom = zoom;
        });

    }

    renderChildren() {

        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (c) {
                return React.cloneElement(c, {
                    map: this.map
                });
            }
        })

    }

    render() {
        return (
            <div style={{height: '100%'}} style={this.props.style}>
                <div ref='map' className={this.props.className} style={{height: '100%'}}>
                 加载地图中...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}
