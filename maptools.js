(function(global){
	var _INFO_ = {
		plug:'maptools',
		version:'1.0.0',
		author:'laokey',
		requires:'openlayers.js'
	}
	var _default_={
		nodeId : '', //容器id
		nodeStyle : 'position: absolute;right:100px;top:55px;z-index: 1001;', //容器样式
		map:null, //传入map对象
		layer:null,
		htmls : '<img id="selRect" src="images/rectangle_icon_on.png" alt="拉框选择矩形" title="拉框选择矩形" />'+
		'<img id="selPol" src="images/polygon_icon_on.png" alt="拉框选择多边形" title="拉框选择多边形" />'+
		'<img id="fullMap" src="images/zoom_back_icon_on.png" alt="全图" title="全图"/>'+
		'<img id="clearMap" src="images/ClearAOI_On.png" alt="清除标记" title="清除标记"/>'
	}
	var mapTools = function (options){
		var settings = Object.assign({},_default_,options);
		var toolsDOM = document.getElementById(settings.nodeId);
		if(!toolsDOM) toolsDOM = document.body;
		
		var toolsBox = document.createElement('div');
		toolsBox.id = 'maptoolsbox';
		toolsBox.style = settings.nodeStyle;
		toolsBox.innerHTML = settings.htmls;
		
		toolsDOM.appendChild(toolsBox);
		
		var selPol = toolsBox.querySelector('#selPol');
		var selRect = toolsBox.querySelector('#selRect');
		var fullMap = toolsBox.querySelector('#fullMap');
		var clearMap = toolsBox.querySelector('#clearMap');
		
		var toolsLists = toolsBox.querySelectorAll('img');
		
		var map = settings.map;
		if(!map){
			alert('缺少地图控件！');
			return;
		}
		var layer = settings.layer;
		
		for(var i=0;i<toolsLists.length;i++){
			(function(index){
				toolsLists[index].addEventListener('click',function(){
				var id = toolsLists[index]['id'];
				switch(id){
					case 'selPol':
						toolsFN.addInteracton(map,layer,'Polygon');
					break;
					case 'selRect':
						toolsFN.addInteracton(map,layer,'Box');
					break;
					case 'fullMap':
						alert('全图');
					break;
					case 'clearMap':
						alert('清理地图');
					break;
					default:
						alert('默认全图');
					break;
				}
			})
			})(i)
		}
	}
	
	var toolsFN = {
		addInteracton:function(map,layer,type){
			if(!layer){
				layer = new OpenLayers.Layer.Vector("vector", {
					styleMap: new OpenLayers.StyleMap({
						"default": new OpenLayers.Style({
							strokeColor: "#00FFFF",
							strokeOpacity: 1,
							fillColor: "#993300",
							fillOpacity: 0
						})
					})
				});
			}
			map.addLayer(layer);
			var draw_control = null;
            if (type === "Box") {
                draw_control = new OpenLayers.Control.DrawFeature(layer,
                    OpenLayers.Handler.RegularPolygon, {
                        handlerOptions: {
                            sides: 4,
                            irregular: true,
                        },
                    }
                )
            } else {
                draw_control = new OpenLayers.Control.DrawFeature(layer,OpenLayers.Handler.Polygon);
            }
			map.addControl(draw_control);
            draw_control.activate();
		}
	}
	

	global[_INFO_.plug] = mapTools;
	
})(typeof window !=='undefined' ? window :this)
