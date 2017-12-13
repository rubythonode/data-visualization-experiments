import React, {Component} from 'react'
import * as d3 from 'd3'

class CountryMap extends Component {
	constructor(props) {
		super(props)
		this.updateD3(props)
	}
	
	
	componentWillUpdate(nextProps) {
		this.updateD3(nextProps)
	}
	
	

	
	updateD3(props) {
		const {data, width, height, zoomTransform, zoomType} = props;
		//
		this.xScale = d3.scaleLinear()
			.domain([0, d3.max(30, ([x, y]) => x)])
			.range([0, width]),
			this.yScale = d3.scaleLinear()
				.domain([0, d3.max(30, ([x, y]) => y)])
				.range([0, height])
	}
	
	
	get transform() {
		const {x, y, zoomTransform, zoomType} = this.props;
		let transform = "";
		if (zoomTransform && zoomType === "scale") {
			transform = `translate(${x + zoomTransform.x}, ${y + zoomTransform.y}) scale(${zoomTransform.k})`;
		}
		return transform;
	}
	
	projection() {
		const {width, height} = this.props
		return d3.geoMercator()
			.center([128, 36])
			.scale(7000)
			.translate([width / 2, height / 2])
	}
	
	
	
	
	render() {
		const canvas = {
			className: 'canvas',
			width: 1200,
			height: 600,
		}
		const {width, height, mapData, schools} = this.props
		
		return (
			<svg className="map" width={width} height={height} viewBox={`0 0 ${width} ${height}`} ref="svg">
				<g transform={this.transform}>
					<g className="cities">
						{
							mapData.map((d, i) => (
								<path
									key={`path-${i}`}
									d={d3.geoPath().projection(this.projection())(d)}
									className="country"
									fill={`rgba(194,200,225,${1 / mapData.length * i})`}
									stroke="#fff"
									fillOpacity={0.5}
									strokeWidth={0.5}
								/>
							))
						}
					</g>
					
					{schools.data?
						schools.data.map((d, i) => (
							<g className="markers" key={`elementary-${i}`}>
								<circle
									cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}
									cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}
									r={1.5}
									fill={`${d["학교급구분"]=== "초등학교"? '#003bff' : d["학교급구분"]=== "중학교"? '#00ff45': '#ff00bb'}`}
									className="marker"
									fillOpacity={0.5}
								
								/>
							</g>
						))
						: null}
					
					
					{/*{schools.elementary?*/}
						{/*schools.elementary.map((d, i) => (*/}
							{/*<g className="markers" key={`elementary-${i}`}>*/}
								{/*<circle*/}
									{/*cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}*/}
									{/*cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}*/}
									{/*r={1.5}*/}
									{/*fill="#00baff"*/}
									{/*className="marker"*/}
									{/*fillOpacity={0.5}*/}
								{/**/}
								{/*/>*/}
							{/*</g>*/}
						{/*))*/}
						{/*: null}*/}
					
					{/*{schools.middle?*/}
						{/*schools.middle.map((d, i) => (*/}
							{/*<g className="markers" key={`elementary-${i}`}>*/}
								{/*<circle*/}
									{/*cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}*/}
									{/*cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}*/}
									{/*r={1.5}*/}
									{/*fill="#FF00BA"*/}
									{/*className="marker"*/}
									{/*fillOpacity={0.5}*/}
								{/*/>*/}
							{/*</g>*/}
						{/*))*/}
						{/*: null}*/}
					
					{/*{schools.high?*/}
						{/*schools.high.map((d, i) => (*/}
							{/*<g className="markers" key={`elementary-${i}`}>*/}
								{/*<circle*/}
									{/*cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}*/}
									{/*cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}*/}
									{/*r={1.5}*/}
									{/*fill="#00e832"*/}
									{/*className="marker"*/}
									{/*fillOpacity={0.5}*/}
								{/**/}
								{/*/>*/}
							{/*</g>*/}
						{/*))*/}
						{/*: null}*/}
					
					
				
						
				</g>
			
			</svg>
		)
	}
}


export default CountryMap
