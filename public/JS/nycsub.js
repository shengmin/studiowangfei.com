$(document).ready(function(){
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });
  $('#scroll').click(function(){
    $('body, html').animate({ scrollTop: 750 }, 'slow');
  });

  //global var, store window scrollTop value
  var scrollHeight;

  //project slideshow image append
  var img_number = 13;
  for(var x=0;x<img_number;x++){
    $('.project_img').append(
      '<img id="project_small_' + x + '" src="../img/project/nycsub/' + x +'_small.jpg"/>'
    );

    $('.project_slide_img').append(
      '<img id="project_big_' + x + '" src="../img/project/nycsub/' + x +'_big.jpg"/>'
    );
  };

  //project slideshow (automatic on page top-right)
  $(".project_img > img:gt(0)").hide();

  function slideSwitch(){
    $('.project_img > img:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('.project_img');
  }

  //slideshow pause when hover
  var theInterval;
  function startSlide() {
    theInterval = setInterval(slideSwitch, 4000);
  }

  function stopSlide() {
    clearInterval(theInterval);
  }

  $(function(){
    startSlide();
    $('.project_img').hover(function(){
      stopSlide();
    }, function(){
      startSlide();
    })
  });


  // slide responsive to window, initial and resize
  function slide_resize(){
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var slideHeight = $('.project_slide').height();
    if(windowHeight-slideHeight>0){
      $('.project_slide').css('margin-top', (windowHeight-slideHeight)*0.5+'px');
    }else{
      $('.project_slide').css('margin-top', '48px');
    }
    $('#project_arrow_left, #project_arrow_right').css('margin-top', (slideHeight-72)*0.5+'px');
  };

  //resize all related items when window change
  $(window).resize(function(){
    slide_resize();
    travelMap_resize();
    map_resize();
  });

  // project slideshow
  var slideshowIndex =0;
  function project_slideshow(id){
    return function(){
      scrollHeight = $(window).scrollTop();
      slideshowIndex = id;
      $('body, html').css('overflow', 'hidden');
      $('.project_slide_container').show();
      $('.project_slide_img img').hide();
      $('#project_big_'+id).fadeIn('slow');
      slide_resize();
    }
  }

  function project_slide_prev(){
    if (slideshowIndex === 0) {
      slideshowIndex = img_number-1;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    } else {
      slideshowIndex--;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    }
  }

  function project_slide_next(){
    if (slideshowIndex === img_number-1) {
      slideshowIndex = 0;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    } else {
      slideshowIndex++;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    }
  }

  for(var y=0;y<img_number;y++){
    $('#project_small_'+y).click(project_slideshow(y));
  };

  $('#project_arrow_left').click(project_slide_prev);
  $('#project_arrow_right').click(project_slide_next);
  $('.project_slide_img img').click(project_slide_next);


  $('.project_close').click(function(){
      $('body, html').css('overflow', 'auto');
      $('.project_slide_container').hide();
  });

  //left-bar appear and fixed after certain scroll
  $(window).scroll(function(){
    var scrollHeight = $(window).scrollTop();
    var nycsub_flipper_height = $('.nycsub').height();
    if(scrollHeight>640 && scrollHeight<400+nycsub_flipper_height){
      $('.nycsub_lines').fadeIn('slow');
    }else{
      $('.nycsub_lines').fadeOut('slow');
    }
  });

  //flipper append
  for(var i=0;i<60;i++){
    $('.nycsub').append('<div class="nycsub_flipper" id="nycsub_flipper_'+i+'"><div class="nycsub_front"><img id="nycsub_front_' +i+ '" src="../img/project/nycsub/riders/a/' + i +'.png"/></div><div class="nycsub_back"><img id="nycsub_back_'+ i+ '" src="../img/project/nycsub/riders/b/' + i +'.png"/></div></div>');
  };


  //subway line sort
  var line_all = [];
  for (var i=0; i<60; i++){
      line_all.push(i)
    };

  var nycsub_123 = [2, 10, 18, 26, 28, 29, 42, 46, 49, 59];
  var nycsub_456 = [7, 8, 25, 32, 34, 41, 44, 48, 54, 58];
  var nycsub_7 = [13];
  var nycsub_ace = [3, 5, 11, 17, 21, 33, 38, 45, 52, 53, 56, 57];
  var nycsub_bdfm = [1, 4, 6, 9, 19, 23, 27, 31, 35, 36, 39, 40, 43, 47, 51];
  var nycsub_nqr =[0, 12, 14, 15, 37, 50];
  var nycsub_jz = [16, 20, 22, 24, 30];
  var nycsub_l = [55];

  // color shadow effect for different sub lines
  function boxShadow (linename, colorHex){
    for (var i=0; i<linename.length; i++){
    $('#nycsub_back_'+linename[i]).css('box-shadow', '0px 4px 1px'+colorHex);
    }
  }

  boxShadow(nycsub_123, '#EE352E');
  boxShadow(nycsub_456, '#00933C');
  boxShadow(nycsub_7, '#B933AD');
  boxShadow(nycsub_ace, '#2850AD');
  boxShadow(nycsub_bdfm, '#FF6319');
  boxShadow(nycsub_nqr, '#FCCC0A');
  boxShadow(nycsub_jz, '#996633');
  boxShadow(nycsub_l, '#A7A9AC');
  //boxShadow(nycsub_g, '#6CBE45');
  //boxShadow(nycsub_s, '#A7A9AC');


  // sub lines flip
  // test if a sub line already flipped
  function test1(linename){
    var x = linename[0];
    if($('#nycsub_flipper_'+x).hasClass('nycsub_selected_flipper')){
      return 0
    }else{
      return 1
    }
  }

  // flip all
  $('#nycsub_all').click(function(){
    if ( test1(nycsub_123)+test1(nycsub_456)+test1(nycsub_7)+test1(nycsub_ace)+test1(nycsub_bdfm)+test1(nycsub_nqr)+test1(nycsub_jz)+test1(nycsub_l) === 0){
      for (var i=0; i<line_all.length; i++){
        $('#nycsub_flipper_'+i).removeClass('nycsub_selected_flipper')
      }
    }else{
      for (var i=0; i<line_all.length; i++){
        $('#nycsub_flipper_'+i).addClass('nycsub_selected_flipper')
      }
    }
  });

  // flip each
  function clickFlip (linename){
    var sum_lines = test1(nycsub_123)+test1(nycsub_456)+test1(nycsub_7)+test1(nycsub_ace)+test1(nycsub_bdfm)+test1(nycsub_nqr)+test1(nycsub_jz)+test1(nycsub_l);

    var diff = line_all.filter(function(x) {
     return linename.indexOf(x) < 0
    });

    for (var n=0; n<diff.length; n++){
      var m = diff[n];
      $('#nycsub_flipper_'+m).removeClass('nycsub_selected_flipper');
    };
    console.log(sum_lines);
    if(sum_lines + test1(linename) === 7){
      for (var i=0; i<linename.length; i++){
        var x = linename[i];
        $('#nycsub_flipper_'+x).removeClass('nycsub_selected_flipper');
      }
    }else{
      for (var i=0; i<linename.length; i++){
        var x = linename[i];
        $('#nycsub_flipper_'+x).addClass('nycsub_selected_flipper');
      }
    }
  }


  $('#nycsub_123').click(function(){
    clickFlip(nycsub_123);
  });
  $('#nycsub_456').click(function(){
    clickFlip(nycsub_456);
  });
  $('#nycsub_7').click(function(){
  clickFlip(nycsub_7);
  });
  $('#nycsub_ace').click(function(){
    clickFlip(nycsub_ace);
  });
  $('#nycsub_bdfm').click(function(){
    clickFlip(nycsub_bdfm);
  });
  $('#nycsub_nqr').click(function(){
    clickFlip(nycsub_nqr);
  });
  $('#nycsub_jz').click(function(){
    clickFlip(nycsub_jz);
  });
  $('#nycsub_l').click(function(){
    clickFlip(nycsub_l);
  });

  //scroll down to map
  $('#nycsub_down').click(function(){
    var fullHeight = $('.outer-container').height();
    var mapHeight = $('#nycsub_map-canvas').height();
    $('body, html').animate({ scrollTop: fullHeight-mapHeight-240 }, 'slow');
  });

  //map fullscreen and exit
  $('#map_fullscreen').click(function(){
    scrollHeight = $(window).scrollTop();
    $('#map_close, .nycsub_map_scale_fullscreen').css('display','initial');
    $('body, html').css('overflow', 'hidden');
    $('.nycsub_map_container').show();
    $('#nycsub_map-canvas')
    .css('height', '100%')
    .css('z-index','10')
    .css('position', 'fixed');
  });

  $('#map_close').click(function(){
    $('#map_close, .nycsub_map_scale_fullscreen').css('display', 'none');
    $('body, html').css('overflow', 'auto');
    $('.nycsub_map_container').hide();
    $('#nycsub_map-canvas')
    .css('position', 'relative')
    .css('z-index','1');
    map_resize();
    $('body, html').scrollTop(scrollHeight);
  });


  // travel map slideshow
  for(var x=0;x<60;x++){
    $('.nycsub_slide_img').append(
      '<img id="nycsub_ridermap_big_' + x + '" src="../img/project/nycsub/riders/b_black/' + x +'.png"/>');
  };

  var travelMapIndex =0;
  function nycsub_slideshow(id){
    return function(){
      scrollHeight = $(window).scrollTop();
      travelMapIndex = id;
      $('body, html').css('overflow', 'hidden');
      $('.nycsub_slide_img img').hide();
      $('.nycsub_slide_container').show();
      $('#nycsub_ridermap_big_'+id).fadeIn('slow');
      travelMap_resize();
    };
  };

  function nycsub_slide_prev(){
    if (travelMapIndex === 0) {
        travelMapIndex = 59;
        $('.nycsub_slide_img img').hide();
        $('#nycsub_ridermap_big_'  + travelMapIndex).fadeIn();
    } else {
        travelMapIndex--;
        $('.nycsub_slide_img img').hide();
        $('#nycsub_ridermap_big_'  + travelMapIndex).fadeIn('slow');
    }
    travelMap_resize();
  };

  function nycsub_slide_next(){
    if (travelMapIndex === 59) {
        travelMapIndex = 0;
        $('.nycsub_slide_img img').hide();
        $('#nycsub_ridermap_big_'  + travelMapIndex).fadeIn();
    } else {
        travelMapIndex++;
        $('.nycsub_slide_img img').hide();
        $('#nycsub_ridermap_big_'  + travelMapIndex).fadeIn('slow');
    }
    travelMap_resize();
  };

  //travel map slideshow resize
  function travelMap_resize(){
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var slideHeight = $('.nycsub_slide').height();
    if(windowHeight-slideHeight>0){
      $('.nycsub_slide').css('margin-top', (windowHeight-slideHeight)*0.5+'px');
    }else{
      $('.nycsub_slide').css('margin-top', '48px');
    }
    $('#nycsub_arrow_left, #nycsub_arrow_right').css('margin-top', (slideHeight-72)*0.5+'px');
  };

  for(var y=0;y<60;y++){
    $('#nycsub_back_'+y).click(nycsub_slideshow(y));
  };

  $('#nycsub_arrow_left').click(nycsub_slide_prev);
  $('#nycsub_arrow_right').click(nycsub_slide_next);
  $('.nycsub_slide_img img').click(nycsub_slide_next);


  // escape key maps to keycode `27`
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('#map_close, .nycsub_map_scale_fullscreen').css('display', 'none');
      $('body, html').css('overflow', 'auto');
      $('.project_slide_container').hide();
      $('.nycsub_slide_container').hide();
      $('.nycsub_map_container').hide();
      $('#nycsub_map-canvas')
      .css('position', 'relative')
      .css('z-index','1');
      map_resize();
      $('body, html').scrollTop(scrollHeight);
    };
  });

  $('.nycsub_close').click(function(){
      $('body, html').css('overflow', 'auto');
      $('.nycsub_slide_container').hide();
  });


  //control the proportion of map
  function map_resize(){
    var map_width = $('#nycsub_map-canvas').width();
    var map_indicator = $('.nycsub_map_container').css('display');
    if(map_indicator === "none"){
      $('#nycsub_map-canvas').css('height', map_width*0.6875+'px');
    }
  }
  map_resize();

});


//google map api setting
var map;
function initialize() {

// Create an array of styles.
var styles = [ {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#0008FF" },
      { "saturation": -54 },
      { "lightness": -42 }
    ]
  },{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#1100ff" },
      { "color": "#808080" },
      { "lightness": 100 }
    ]
  },{
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#cccccc" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "hue": "#0033ff" },
      { "color": "#0033ff" },
      { "visibility": "off" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#ff00e6" },
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit.station.rail",
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" },
    ]
  },{
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "on" },
      { "hue": "#0800ff" },
      { "color": "#000000" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#808080" },
      { "visibility": "on" },
      { "lightness": 100 }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#808080" },
      { "lightness": 30 }
    ]
  },{
    "featureType": "landscape.natural",
    "stylers": [
      { "visibility": "on" },
      { "color": "#808080" },
      { "lightness": 100 }
    ]
  }/*{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#515151"},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":0.1},{"lightness":-100}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"hue":"#000000"},{"lightness":50}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]}*/
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "NYC Subway Ridership Viz"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.

  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(40.757552,-73.969055),
    disableDefaultUI: true,
    streetViewControl: false,
    zoomControl: true,
    panControl: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById('nycsub_map-canvas'),
    mapOptions);

// drawing ridership circle
  var center;
  var radius_total =[];

  for(var i=0; i<stations.length; i++){
    var myLatLng = new google.maps.LatLng(stations[i].Latitude, stations[i].Longitude);

    //color for each line
    function color_index (i){
      var line_index = stations[i].Route;
      if (line_index === "1" || line_index === "2" || line_index === "3"){
        return '#EE352E'
      }else if(line_index === "4" || line_index === "5" || line_index === "6"){
        return '#00933C'
      }else if(line_index === "7"){
        return '#B933AD'
      }else if(line_index === "A" || line_index === "C" || line_index === "E"){
        return '#2850AD'
      }else if(line_index === "B" || line_index === "D" || line_index === "F" || line_index === "M"){
        return '#FF6319'
      }else if(line_index === "N" || line_index === "Q" || line_index === "R"){
        return '#FCCC0A'
      }else if(line_index === "J" || line_index === "Z"){
        return '#996633'
      }else if(line_index === "L"){
        return '#A7A9AC'
      }else if(line_index === "G"){
        return '#6CBE45'
      }else if(line_index === "S"){
        return '#A7A9AC'
      }
    };

    var radius_weekday = new google.maps.Marker({
      position: myLatLng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color_index(i),
        fillOpacity: 0.5,
        scale: stations[i].AVSUN_ROOT/5,
        strokeColor: 'gold',
        strokeWeight: 0
      },
      draggable: false,
      map: map
    });

    var radius_weekday = new google.maps.Marker({
      position: myLatLng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color_index(i),
        fillOpacity: 0.5,
        scale: stations[i].AVWKDY_ROOT/5,
        strokeColor: 'gold',
        strokeWeight: 0
      },
      draggable: false,
      map: map
    });

    //store markers in an array for later use
    radius_total[i] = new google.maps.Marker({
      position: myLatLng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color_index(i),
        fillOpacity: 0.25,
        scale: stations[i].TOTAL_ROOT/50,
        strokeColor: 'black',
        strokeWeight: 0
      },
      draggable: false,
      map: map
    });

    center = new google.maps.Marker({
      position: myLatLng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'white',
        fillOpacity: 1,
        scale: 2,
        strokeColor: 'black',
        strokeWeight: 0
      },
      draggable: false,
      map: map
    });
  }


  var infowindow;
  function infoWindowOpen(x, i){
    return function(){
      var string = '<div class="nycsub_map_infowindow"><div id="station_name">'+
      stations[i].Station_name+'</div>'+
      '<div class="ridership_year">Year: '+
      stations[i].TOTAL+' (*0.01)</div>'+
      '<div class="ridership_weekday">Avg. Weekday: '+
      stations[i].AVWKDY+'</div>'+
      '<div class="ridership_weekend">Avg. Weekend: '+
      stations[i].AVSUN+'</div>'+
      '</div>'
      ;
      infowindow = new google.maps.InfoWindow({
        content: string,
        disableAutoPan: true
      });
      infowindow.open(map, x);
    }
  }

  function infoWindowClose(){
    return function(){
      infowindow.close();
    }
  }

  for(var i=0; i<stations.length; i++){
    radius_total[i].addListener('mouseover', infoWindowOpen(radius_total[i], i));
    radius_total[i].addListener('mouseout', infoWindowClose());
  }


  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  //transit layer automatic overlay
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  //var trafficLayer = new google.maps.TrafficLayer();
  //trafficLayer.setMap(map);


  //possible animation
  /*function animateMarker(){
    var y = 1;
    window.setInterval(function(){
      var x = radius.get('icon');
      y=y-0.01;
      if(y>0.02){x.fillOpacity = y
      console.log(x.fillOpacity);
      radius.set('icon', x);
      }else{
        y=1;
      }
    }, 50);
  }*/
  //animateMarker();
}


google.maps.event.addDomListener(window, 'load', initialize);


//load nyc ridership dataset
/*var stations =[];
$.getJSON( "url of dataset, the js file and json file need to be on the same server", function(data){
  $.each(data, function(key, val){
    stations.push(key + val);
  });
});

console.log(stations);*/

var stations = [
{"Station_name":"Far Rockaway-Mott Av","Latitude":40.603995,"Longitude":-73.755405,"AVWKDY":4022,"AVWKDY_ROOT":63,"AVSAT":2342,"AVSAT_ROOT":48,"AVSUN":1801,"AVSUN_ROOT":42,"TOTAL":1251685,"TOTAL_ROOT":1119 ,"Route":"A"},
{"Station_name":"Beach 25th St","Latitude":40.600066,"Longitude":-73.761353,"AVWKDY":1647,"AVWKDY_ROOT":41,"AVSAT":773,"AVSAT_ROOT":28,"AVSUN":595,"AVSUN_ROOT":24,"TOTAL":494252,"TOTAL_ROOT":703 ,"Route":"A"},
{"Station_name":"Beach 36th St","Latitude":40.595398,"Longitude":-73.768175,"AVWKDY":586,"AVWKDY_ROOT":24,"AVSAT":354,"AVSAT_ROOT":19,"AVSUN":281,"AVSUN_ROOT":17,"TOTAL":184313,"TOTAL_ROOT":429 ,"Route":"A"},
{"Station_name":"Beach 44th St","Latitude":40.592943,"Longitude":-73.776013,"AVWKDY":353,"AVWKDY_ROOT":19,"AVSAT":231,"AVSAT_ROOT":15,"AVSUN":189,"AVSUN_ROOT":14,"TOTAL":113004,"TOTAL_ROOT":336 ,"Route":"A"},
{"Station_name":"Jamaica-179th St","Latitude":40.712646,"Longitude":-73.783817,"AVWKDY":24804,"AVWKDY_ROOT":157,"AVSAT":9706,"AVSAT_ROOT":99,"AVSUN":6542,"AVSUN_ROOT":81,"TOTAL":7197237,"TOTAL_ROOT":2683 ,"Route":"F"},
{"Station_name":"Beach 60th St","Latitude":40.592374,"Longitude":-73.788522,"AVWKDY":1892,"AVWKDY_ROOT":43,"AVSAT":1167,"AVSAT_ROOT":34,"AVSUN":853,"AVSUN_ROOT":29,"TOTAL":593055,"TOTAL_ROOT":770 ,"Route":"A"},
{"Station_name":"169th St","Latitude":40.71047,"Longitude":-73.793604,"AVWKDY":8164,"AVWKDY_ROOT":90,"AVSAT":4429,"AVSAT_ROOT":67,"AVSUN":3234,"AVSUN_ROOT":57,"TOTAL":2494933,"TOTAL_ROOT":1580 ,"Route":"F"},
{"Station_name":"Beach 67th St","Latitude":40.590927,"Longitude":-73.796924,"AVWKDY":1440,"AVWKDY_ROOT":38,"AVSAT":831,"AVSAT_ROOT":29,"AVSUN":597,"AVSUN_ROOT":24,"TOTAL":445581,"TOTAL_ROOT":668 ,"Route":"A"},
{"Station_name":"Parsons Blvd-Archer Av - Jamaica Center","Latitude":40.702147,"Longitude":-73.801109,"AVWKDY":36893,"AVWKDY_ROOT":192,"AVSAT":17779,"AVSAT_ROOT":133,"AVSUN":12211,"AVSUN_ROOT":111,"TOTAL":11023711,"TOTAL_ROOT":3320 ,"Route":"E"},
{"Station_name":"Parsons Blvd","Latitude":40.707564,"Longitude":-73.803326,"AVWKDY":6544,"AVWKDY_ROOT":81,"AVSAT":3741,"AVSAT_ROOT":61,"AVSUN":2771,"AVSUN_ROOT":53,"TOTAL":2020445,"TOTAL_ROOT":1421 ,"Route":"F"},
{"Station_name":"Sutphin Blvd-Archer Av - JFK","Latitude":40.700486,"Longitude":-73.807969,"AVWKDY":15376,"AVWKDY_ROOT":124,"AVSAT":9212,"AVSAT_ROOT":96,"AVSUN":6904,"AVSUN_ROOT":83,"TOTAL":4794549,"TOTAL_ROOT":2190 ,"Route":"E"},
{"Station_name":"Sutphin Blvd","Latitude":40.70546,"Longitude":-73.810708,"AVWKDY":4438,"AVWKDY_ROOT":67,"AVSAT":2505,"AVSAT_ROOT":50,"AVSUN":1951,"AVSUN_ROOT":44,"TOTAL":1372551,"TOTAL_ROOT":1172 ,"Route":"F"},
{"Station_name":"Beach 90th St","Latitude":40.588034,"Longitude":-73.813641,"AVWKDY":990,"AVWKDY_ROOT":31,"AVSAT":530,"AVSAT_ROOT":23,"AVSUN":408,"AVSUN_ROOT":20,"TOTAL":303880,"TOTAL_ROOT":551 ,"Route":"H"},
{"Station_name":"Broad Channel","Latitude":40.608382,"Longitude":-73.815925,"AVWKDY":338,"AVWKDY_ROOT":18,"AVSAT":93,"AVSAT_ROOT":10,"AVSUN":71,"AVSUN_ROOT":8,"TOTAL":95085,"TOTAL_ROOT":308 ,"Route":"A"},
{"Station_name":"Jamaica-Van Wyck","Latitude":40.702566,"Longitude":-73.816859,"AVWKDY":4649,"AVWKDY_ROOT":68,"AVSAT":2591,"AVSAT_ROOT":51,"AVSUN":1907,"AVSUN_ROOT":44,"TOTAL":1428625,"TOTAL_ROOT":1195 ,"Route":"E"},
{"Station_name":"Briarwood-Van Wyck Blvd","Latitude":40.709179,"Longitude":-73.820574,"AVWKDY":5733,"AVWKDY_ROOT":76,"AVSAT":3067,"AVSAT_ROOT":55,"AVSUN":2311,"AVSUN_ROOT":48,"TOTAL":1752752,"TOTAL_ROOT":1324 ,"Route":"F"},
{"Station_name":"Beach 98th St","Latitude":40.585307,"Longitude":-73.820558,"AVWKDY":701,"AVWKDY_ROOT":26,"AVSAT":273,"AVSAT_ROOT":17,"AVSUN":212,"AVSUN_ROOT":15,"TOTAL":204734,"TOTAL_ROOT":452 ,"Route":"H"},
{"Station_name":"Beach 105th St","Latitude":40.583209,"Longitude":-73.827559,"AVWKDY":243,"AVWKDY_ROOT":16,"AVSAT":88,"AVSAT_ROOT":9,"AVSUN":68,"AVSUN_ROOT":8,"TOTAL":70324,"TOTAL_ROOT":265 ,"Route":"H"},
{"Station_name":"Lefferts Blvd","Latitude":40.685951,"Longitude":-73.825798,"AVWKDY":7373,"AVWKDY_ROOT":86,"AVSAT":4100,"AVSAT_ROOT":64,"AVSUN":2899,"AVSUN_ROOT":54,"TOTAL":2258782,"TOTAL_ROOT":1503 ,"Route":"A"},
{"Station_name":"Pelham Bay Park","Latitude":40.852462,"Longitude":-73.828121,"AVWKDY":5254,"AVWKDY_ROOT":72,"AVSAT":2495,"AVSAT_ROOT":50,"AVSUN":1940,"AVSUN_ROOT":44,"TOTAL":1579313,"TOTAL_ROOT":1257 ,"Route":"6"},
{"Station_name":"Howard Beach","Latitude":40.660476,"Longitude":-73.830301,"AVWKDY":3512,"AVWKDY_ROOT":59,"AVSAT":2044,"AVSAT_ROOT":45,"AVSUN":1883,"AVSUN_ROOT":43,"TOTAL":1115611,"TOTAL_ROOT":1056 ,"Route":"A"},
{"Station_name":"Flushing-Main St","Latitude":40.7596,"Longitude":-73.83003,"AVWKDY":55087,"AVWKDY_ROOT":235,"AVSAT":33750,"AVSAT_ROOT":184,"AVSUN":25694,"AVSUN_ROOT":160,"TOTAL":17270683,"TOTAL_ROOT":4156 ,"Route":"7"},
{"Station_name":"Kew Gardens-Union Turnpike","Latitude":40.714441,"Longitude":-73.831008,"AVWKDY":26289,"AVWKDY_ROOT":162,"AVSAT":11607,"AVSAT_ROOT":108,"AVSUN":8299,"AVSUN_ROOT":91,"TOTAL":7774734,"TOTAL_ROOT":2788 ,"Route":"E"},
{"Station_name":"121st St","Latitude":40.700492,"Longitude":-73.828294,"AVWKDY":1753,"AVWKDY_ROOT":42,"AVSAT":1055,"AVSAT_ROOT":32,"AVSUN":792,"AVSUN_ROOT":28,"TOTAL":547283,"TOTAL_ROOT":740 ,"Route":"J"},
{"Station_name":"Buhre Av","Latitude":40.84681,"Longitude":-73.832569,"AVWKDY":2385,"AVWKDY_ROOT":49,"AVSAT":973,"AVSAT_ROOT":31,"AVSUN":661,"AVSUN_ROOT":26,"TOTAL":696159,"TOTAL_ROOT":834 ,"Route":"6"},
{"Station_name":"Aqueduct Racetrack","Latitude":40.672131,"Longitude":-73.835812,"AVWKDY":84,"AVWKDY_ROOT":9,"AVSAT":135,"AVSAT_ROOT":12,"AVSUN":97,"AVSUN_ROOT":10,"TOTAL":34960,"TOTAL_ROOT":187 ,"Route":"A"},
{"Station_name":"Eastchester-Dyre Av","Latitude":40.8883,"Longitude":-73.830834,"AVWKDY":3417,"AVWKDY_ROOT":58,"AVSAT":1374,"AVSAT_ROOT":37,"AVSUN":835,"AVSUN_ROOT":29,"TOTAL":990129,"TOTAL_ROOT":995 ,"Route":"5"},
{"Station_name":"111th St-Greenwood Av","Latitude":40.684331,"Longitude":-73.832163,"AVWKDY":2702,"AVWKDY_ROOT":52,"AVSAT":1268,"AVSAT_ROOT":36,"AVSUN":881,"AVSUN_ROOT":30,"TOTAL":804808,"TOTAL_ROOT":897 ,"Route":"A"},
{"Station_name":"111th St","Latitude":40.697418,"Longitude":-73.836345,"AVWKDY":2226,"AVWKDY_ROOT":47,"AVSAT":1213,"AVSAT_ROOT":35,"AVSUN":905,"AVSUN_ROOT":30,"TOTAL":681993,"TOTAL_ROOT":826 ,"Route":"J"},
{"Station_name":"Rockaway Park-Beach 116th","Latitude":40.580903,"Longitude":-73.835592,"AVWKDY":956,"AVWKDY_ROOT":31,"AVSAT":668,"AVSAT_ROOT":26,"AVSUN":551,"AVSUN_ROOT":23,"TOTAL":309968,"TOTAL_ROOT":557 ,"Route":"H"},
{"Station_name":"Middletown Rd","Latitude":40.843863,"Longitude":-73.836322,"AVWKDY":1365,"AVWKDY_ROOT":37,"AVSAT":513,"AVSAT_ROOT":23,"AVSUN":354,"AVSUN_ROOT":19,"TOTAL":394430,"TOTAL_ROOT":628 ,"Route":"6"},
{"Station_name":"75th Av","Latitude":40.718331,"Longitude":-73.837324,"AVWKDY":3725,"AVWKDY_ROOT":61,"AVSAT":1900,"AVSAT_ROOT":44,"AVSUN":1428,"AVSUN_ROOT":38,"TOTAL":1129511,"TOTAL_ROOT":1063 ,"Route":"E"},
{"Station_name":"104th St-Oxford Av","Latitude":40.681711,"Longitude":-73.837683,"AVWKDY":1850,"AVWKDY_ROOT":43,"AVSAT":961,"AVSAT_ROOT":31,"AVSUN":677,"AVSUN_ROOT":26,"TOTAL":560238,"TOTAL_ROOT":748 ,"Route":"A"},
{"Station_name":"Baychester Av","Latitude":40.878663,"Longitude":-73.838591,"AVWKDY":3229,"AVWKDY_ROOT":57,"AVSAT":1438,"AVSAT_ROOT":38,"AVSUN":1019,"AVSUN_ROOT":32,"TOTAL":956529,"TOTAL_ROOT":978 ,"Route":"5"},
{"Station_name":"Westchester Square-East Tremont Av","Latitude":40.839892,"Longitude":-73.842952,"AVWKDY":4749,"AVWKDY_ROOT":69,"AVSAT":2213,"AVSAT_ROOT":47,"AVSUN":1472,"AVSUN_ROOT":38,"TOTAL":1409566,"TOTAL_ROOT":1187 ,"Route":"6"},
{"Station_name":"Forest Hills-71st Av","Latitude":40.721691,"Longitude":-73.844521,"AVWKDY":25920,"AVWKDY_ROOT":161,"AVSAT":14640,"AVSAT_ROOT":121,"AVSUN":10629,"AVSUN_ROOT":103,"TOTAL":7971741,"TOTAL_ROOT":2823 ,"Route":"E"},
{"Station_name":"Rockaway Blvd","Latitude":40.680429,"Longitude":-73.843853,"AVWKDY":6211,"AVWKDY_ROOT":79,"AVSAT":3790,"AVSAT_ROOT":62,"AVSUN":2759,"AVSUN_ROOT":53,"TOTAL":1934736,"TOTAL_ROOT":1391 ,"Route":"A"},
{"Station_name":"104th St-102nd St","Latitude":40.695178,"Longitude":-73.84433,"AVWKDY":2266,"AVWKDY_ROOT":48,"AVSAT":1309,"AVSAT_ROOT":36,"AVSUN":970,"AVSUN_ROOT":31,"TOTAL":701132,"TOTAL_ROOT":837 ,"Route":"J"},
{"Station_name":"Mets - Willets Point","Latitude":40.754622,"Longitude":-73.845625,"AVWKDY":3347,"AVWKDY_ROOT":58,"AVSAT":4385,"AVSAT_ROOT":66,"AVSUN":4654,"AVSUN_ROOT":68,"TOTAL":1362851,"TOTAL_ROOT":1167 ,"Route":"7"},
{"Station_name":"Gun Hill Rd","Latitude":40.869526,"Longitude":-73.846384,"AVWKDY":5141,"AVWKDY_ROOT":72,"AVSAT":2441,"AVSAT_ROOT":49,"AVSUN":1651,"AVSUN_ROOT":41,"TOTAL":1532449,"TOTAL_ROOT":1238 ,"Route":"5"},
{"Station_name":"Zerega Av","Latitude":40.836488,"Longitude":-73.847036,"AVWKDY":1789,"AVWKDY_ROOT":42,"AVSAT":699,"AVSAT_ROOT":26,"AVSUN":502,"AVSUN_ROOT":22,"TOTAL":520826,"TOTAL_ROOT":722 ,"Route":"6"},
{"Station_name":"Wakefield-241st St","Latitude":40.903125,"Longitude":-73.85062,"AVWKDY":3344,"AVWKDY_ROOT":58,"AVSAT":2074,"AVSAT_ROOT":46,"AVSUN":1483,"AVSUN_ROOT":39,"TOTAL":1045011,"TOTAL_ROOT":1022 ,"Route":"2"},
{"Station_name":"Woodhaven Blvd","Latitude":40.693879,"Longitude":-73.851576,"AVWKDY":3128,"AVWKDY_ROOT":56,"AVSAT":1760,"AVSAT_ROOT":42,"AVSUN":1240,"AVSUN_ROOT":35,"TOTAL":959802,"TOTAL_ROOT":980 ,"Route":"J"},
{"Station_name":"88th St-Boyd Av","Latitude":40.679843,"Longitude":-73.85147,"AVWKDY":2449,"AVWKDY_ROOT":49,"AVSAT":1007,"AVSAT_ROOT":32,"AVSUN":702,"AVSUN_ROOT":26,"TOTAL":716486,"TOTAL_ROOT":846 ,"Route":"A"},
{"Station_name":"Castle Hill Av","Latitude":40.834255,"Longitude":-73.851222,"AVWKDY":6089,"AVWKDY_ROOT":78,"AVSAT":3120,"AVSAT_ROOT":56,"AVSUN":2191,"AVSUN_ROOT":47,"TOTAL":1840586,"TOTAL_ROOT":1357 ,"Route":"6"},
{"Station_name":"67th Av","Latitude":40.726523,"Longitude":-73.852719,"AVWKDY":8500,"AVWKDY_ROOT":92,"AVSAT":3924,"AVSAT_ROOT":63,"AVSUN":2867,"AVSUN_ROOT":54,"TOTAL":2533905,"TOTAL_ROOT":1592 ,"Route":"M"},
{"Station_name":"238th St-Nereid Av","Latitude":40.898379,"Longitude":-73.854376,"AVWKDY":2720,"AVWKDY_ROOT":52,"AVSAT":1181,"AVSAT_ROOT":34,"AVSUN":795,"AVSUN_ROOT":28,"TOTAL":798970,"TOTAL_ROOT":894 ,"Route":"2"},
{"Station_name":"111th St","Latitude":40.75173,"Longitude":-73.855334,"AVWKDY":8656,"AVWKDY_ROOT":93,"AVSAT":6730,"AVSAT_ROOT":82,"AVSUN":5637,"AVSUN_ROOT":75,"TOTAL":2880255,"TOTAL_ROOT":1697 ,"Route":"7"},
{"Station_name":"Pelham Parkway","Latitude":40.858985,"Longitude":-73.855359,"AVWKDY":2373,"AVWKDY_ROOT":49,"AVSAT":675,"AVSAT_ROOT":26,"AVSUN":449,"AVSUN_ROOT":21,"TOTAL":665085,"TOTAL_ROOT":816 ,"Route":"5"},
{"Station_name":"233rd St","Latitude":40.893193,"Longitude":-73.857473,"AVWKDY":4276,"AVWKDY_ROOT":65,"AVSAT":2079,"AVSAT_ROOT":46,"AVSUN":1514,"AVSUN_ROOT":39,"TOTAL":1283596,"TOTAL_ROOT":1133 ,"Route":"2"},
{"Station_name":"80th St-Hudson St","Latitude":40.679371,"Longitude":-73.858992,"AVWKDY":3582,"AVWKDY_ROOT":60,"AVSAT":1608,"AVSAT_ROOT":40,"AVSUN":1186,"AVSUN_ROOT":34,"TOTAL":1064286,"TOTAL_ROOT":1032 ,"Route":"A"},
{"Station_name":"225th St","Latitude":40.888022,"Longitude":-73.860341,"AVWKDY":2962,"AVWKDY_ROOT":54,"AVSAT":1552,"AVSAT_ROOT":39,"AVSUN":1156,"AVSUN_ROOT":34,"TOTAL":901909,"TOTAL_ROOT":950 ,"Route":"2"},
{"Station_name":"63rd Drive-Rego Park","Latitude":40.729846,"Longitude":-73.861604,"AVWKDY":15516,"AVWKDY_ROOT":125,"AVSAT":9709,"AVSAT_ROOT":99,"AVSUN":7294,"AVSUN_ROOT":85,"TOTAL":4877084,"TOTAL_ROOT":2208 ,"Route":"M"},
{"Station_name":"Morris Park","Latitude":40.854364,"Longitude":-73.860495,"AVWKDY":1543,"AVWKDY_ROOT":39,"AVSAT":603,"AVSAT_ROOT":25,"AVSUN":362,"AVSUN_ROOT":19,"TOTAL":445159,"TOTAL_ROOT":667 ,"Route":"5"},
{"Station_name":"Forest Parkway-85th St","Latitude":40.692435,"Longitude":-73.86001,"AVWKDY":3183,"AVWKDY_ROOT":56,"AVSAT":1873,"AVSAT_ROOT":43,"AVSUN":1350,"AVSUN_ROOT":37,"TOTAL":986167,"TOTAL_ROOT":993 ,"Route":"J"},
{"Station_name":"103rd St","Latitude":40.749865,"Longitude":-73.8627,"AVWKDY":15333,"AVWKDY_ROOT":124,"AVSAT":12400,"AVSAT_ROOT":111,"AVSUN":9887,"AVSUN_ROOT":99,"TOTAL":5120456,"TOTAL_ROOT":2263 ,"Route":"7"},
{"Station_name":"Parkchester-East 177th St","Latitude":40.833226,"Longitude":-73.860816,"AVWKDY":12836,"AVWKDY_ROOT":113,"AVSAT":7761,"AVSAT_ROOT":88,"AVSUN":5593,"AVSUN_ROOT":75,"TOTAL":3994737,"TOTAL_ROOT":1999 ,"Route":"6"},
{"Station_name":"Grant Av","Latitude":40.677044,"Longitude":-73.86505,"AVWKDY":5770,"AVWKDY_ROOT":76,"AVSAT":3722,"AVSAT_ROOT":61,"AVSUN":2723,"AVSUN_ROOT":52,"TOTAL":1821005,"TOTAL_ROOT":1349 ,"Route":"A"},
{"Station_name":"Gun Hill Rd","Latitude":40.87785,"Longitude":-73.866256,"AVWKDY":4291,"AVWKDY_ROOT":66,"AVSAT":3341,"AVSAT_ROOT":58,"AVSUN":2364,"AVSUN_ROOT":49,"TOTAL":1407781,"TOTAL_ROOT":1186 ,"Route":"2"},
{"Station_name":"219th St","Latitude":40.883895,"Longitude":-73.862633,"AVWKDY":2413,"AVWKDY_ROOT":49,"AVSAT":1160,"AVSAT_ROOT":34,"AVSUN":873,"AVSUN_ROOT":30,"TOTAL":725271,"TOTAL_ROOT":852 ,"Route":"2"},
{"Station_name":"Burke Av","Latitude":40.871356,"Longitude":-73.867164,"AVWKDY":2947,"AVWKDY_ROOT":54,"AVSAT":1598,"AVSAT_ROOT":40,"AVSUN":1157,"AVSUN_ROOT":34,"TOTAL":901035,"TOTAL_ROOT":949 ,"Route":"2"},
{"Station_name":"Allerton Av","Latitude":40.865462,"Longitude":-73.867352,"AVWKDY":4556,"AVWKDY_ROOT":67,"AVSAT":2840,"AVSAT_ROOT":53,"AVSUN":2033,"AVSUN_ROOT":45,"TOTAL":1427038,"TOTAL_ROOT":1195 ,"Route":"2"},
{"Station_name":"Pelham Parkway","Latitude":40.857192,"Longitude":-73.867615,"AVWKDY":6345,"AVWKDY_ROOT":80,"AVSAT":3796,"AVSAT_ROOT":62,"AVSUN":2936,"AVSUN_ROOT":54,"TOTAL":1984764,"TOTAL_ROOT":1409 ,"Route":"2"},
{"Station_name":"Bronx Park East","Latitude":40.848828,"Longitude":-73.868457,"AVWKDY":1798,"AVWKDY_ROOT":42,"AVSAT":959,"AVSAT_ROOT":31,"AVSUN":714,"AVSUN_ROOT":27,"TOTAL":548956,"TOTAL_ROOT":741 ,"Route":"2"},
{"Station_name":"Elderts Lane-75th St","Latitude":40.691324,"Longitude":-73.867139,"AVWKDY":3103,"AVWKDY_ROOT":56,"AVSAT":1556,"AVSAT_ROOT":39,"AVSUN":1132,"AVSUN_ROOT":34,"TOTAL":936366,"TOTAL_ROOT":968 ,"Route":"J"},
{"Station_name":"St Lawrence Av","Latitude":40.831509,"Longitude":-73.867618,"AVWKDY":3448,"AVWKDY_ROOT":59,"AVSAT":2205,"AVSAT_ROOT":47,"AVSUN":1699,"AVSUN_ROOT":41,"TOTAL":1091196,"TOTAL_ROOT":1045 ,"Route":"6"},
{"Station_name":"East 180th St","Latitude":40.841894,"Longitude":-73.873488,"AVWKDY":4791,"AVWKDY_ROOT":69,"AVSAT":2584,"AVSAT_ROOT":51,"AVSUN":1933,"AVSUN_ROOT":44,"TOTAL":1466813,"TOTAL_ROOT":1211 ,"Route":"2"},
{"Station_name":"Junction Blvd","Latitude":40.749145,"Longitude":-73.869527,"AVWKDY":20005,"AVWKDY_ROOT":141,"AVSAT":15629,"AVSAT_ROOT":125,"AVSUN":12306,"AVSUN_ROOT":111,"TOTAL":6615247,"TOTAL_ROOT":2572 ,"Route":"7"},
{"Station_name":"Woodhaven Blvd","Latitude":40.733106,"Longitude":-73.869229,"AVWKDY":19784,"AVWKDY_ROOT":141,"AVSAT":12964,"AVSAT_ROOT":114,"AVSUN":9383,"AVSUN_ROOT":97,"TOTAL":6254631,"TOTAL_ROOT":2501 ,"Route":"M"},
{"Station_name":"Crescent St","Latitude":40.683194,"Longitude":-73.873785,"AVWKDY":3994,"AVWKDY_ROOT":63,"AVSAT":2364,"AVSAT_ROOT":49,"AVSUN":1743,"AVSUN_ROOT":42,"TOTAL":1242289,"TOTAL_ROOT":1115 ,"Route":"J"},
{"Station_name":"Cypress Hills","Latitude":40.689941,"Longitude":-73.87255,"AVWKDY":1197,"AVWKDY_ROOT":35,"AVSAT":838,"AVSAT_ROOT":29,"AVSUN":633,"AVSUN_ROOT":25,"TOTAL":384611,"TOTAL_ROOT":620 ,"Route":"J"},
{"Station_name":"Euclid Av","Latitude":40.675377,"Longitude":-73.872106,"AVWKDY":8620,"AVWKDY_ROOT":93,"AVSAT":4884,"AVSAT_ROOT":70,"AVSUN":3500,"AVSUN_ROOT":59,"TOTAL":2652161,"TOTAL_ROOT":1629 ,"Route":"A"},
{"Station_name":"Morrison Av-Soundview Av","Latitude":40.829521,"Longitude":-73.874516,"AVWKDY":5607,"AVWKDY_ROOT":75,"AVSAT":3744,"AVSAT_ROOT":61,"AVSUN":2757,"AVSUN_ROOT":53,"TOTAL":1783678,"TOTAL_ROOT":1336 ,"Route":"6"},
{"Station_name":"Grand Av-Newtown","Latitude":40.737015,"Longitude":-73.877223,"AVWKDY":13660,"AVWKDY_ROOT":117,"AVSAT":8415,"AVSAT_ROOT":92,"AVSUN":6233,"AVSUN_ROOT":79,"TOTAL":4275175,"TOTAL_ROOT":2068 ,"Route":"M"},
{"Station_name":"90th St Elmhurst","Latitude":40.748408,"Longitude":-73.876613,"AVWKDY":17089,"AVWKDY_ROOT":131,"AVSAT":14134,"AVSAT_ROOT":119,"AVSUN":11564,"AVSUN_ROOT":108,"TOTAL":5756272,"TOTAL_ROOT":2399 ,"Route":"7"},
{"Station_name":"Norwood-205th St","Latitude":40.874811,"Longitude":-73.878855,"AVWKDY":7439,"AVWKDY_ROOT":86,"AVSAT":4264,"AVSAT_ROOT":65,"AVSUN":3462,"AVSUN_ROOT":59,"TOTAL":2316150,"TOTAL_ROOT":1522 ,"Route":"D"},
{"Station_name":"Woodlawn","Latitude":40.886037,"Longitude":-73.878751,"AVWKDY":4639,"AVWKDY_ROOT":68,"AVSAT":2635,"AVSAT_ROOT":51,"AVSUN":1798,"AVSUN_ROOT":42,"TOTAL":1421650,"TOTAL_ROOT":1192 ,"Route":"4"},
{"Station_name":"Norwood Av","Latitude":40.68141,"Longitude":-73.880039,"AVWKDY":2829,"AVWKDY_ROOT":53,"AVSAT":1609,"AVSAT_ROOT":40,"AVSUN":1166,"AVSUN_ROOT":34,"TOTAL":872507,"TOTAL_ROOT":934 ,"Route":"J"},
{"Station_name":"East Tremont Av-West Farms Sq","Latitude":40.840295,"Longitude":-73.880049,"AVWKDY":5751,"AVWKDY_ROOT":76,"AVSAT":3942,"AVSAT_ROOT":63,"AVSUN":2953,"AVSUN_ROOT":54,"TOTAL":1843274,"TOTAL_ROOT":1358 ,"Route":"2"},
{"Station_name":"Shepherd Av","Latitude":40.67413,"Longitude":-73.88075,"AVWKDY":2402,"AVWKDY_ROOT":49,"AVSAT":1480,"AVSAT_ROOT":38,"AVSUN":1083,"AVSUN_ROOT":33,"TOTAL":751578,"TOTAL_ROOT":867 ,"Route":"A"},
{"Station_name":"Elmhurst Av","Latitude":40.742454,"Longitude":-73.882017,"AVWKDY":11998,"AVWKDY_ROOT":110,"AVSAT":8162,"AVSAT_ROOT":90,"AVSUN":6204,"AVSUN_ROOT":79,"TOTAL":3841617,"TOTAL_ROOT":1960 ,"Route":"M"},
{"Station_name":"New Lots Av","Latitude":40.666235,"Longitude":-73.884079,"AVWKDY":4566,"AVWKDY_ROOT":68,"AVSAT":2710,"AVSAT_ROOT":52,"AVSUN":1968,"AVSUN_ROOT":44,"TOTAL":1420953,"TOTAL_ROOT":1192 ,"Route":"3"},
{"Station_name":"82nd St-Jackson Heights","Latitude":40.747659,"Longitude":-73.883697,"AVWKDY":18712,"AVWKDY_ROOT":137,"AVSAT":15935,"AVSAT_ROOT":126,"AVSUN":13410,"AVSUN_ROOT":116,"TOTAL":6363753,"TOTAL_ROOT":2523 ,"Route":"7"},
{"Station_name":"Mosholu Parkway","Latitude":40.87975,"Longitude":-73.884655,"AVWKDY":7269,"AVWKDY_ROOT":85,"AVSAT":3838,"AVSAT_ROOT":62,"AVSUN":2764,"AVSUN_ROOT":53,"TOTAL":2211341,"TOTAL_ROOT":1487 ,"Route":"4"},
{"Station_name":"Cleveland St","Latitude":40.679947,"Longitude":-73.884639,"AVWKDY":2683,"AVWKDY_ROOT":52,"AVSAT":1602,"AVSAT_ROOT":40,"AVSUN":1167,"AVSUN_ROOT":34,"TOTAL":835133,"TOTAL_ROOT":914 ,"Route":"J"},
{"Station_name":"Whitlock Av","Latitude":40.826525,"Longitude":-73.886283,"AVWKDY":1197,"AVWKDY_ROOT":35,"AVSAT":737,"AVSAT_ROOT":27,"AVSUN":540,"AVSUN_ROOT":23,"TOTAL":374535,"TOTAL_ROOT":612 ,"Route":"6"},
{"Station_name":"Elder Av","Latitude":40.828584,"Longitude":-73.879159,"AVWKDY":5321,"AVWKDY_ROOT":73,"AVSAT":3618,"AVSAT_ROOT":60,"AVSUN":2715,"AVSUN_ROOT":52,"TOTAL":1701506,"TOTAL_ROOT":1304 ,"Route":"6"},
{"Station_name":"174th St","Latitude":40.837288,"Longitude":-73.887734,"AVWKDY":4809,"AVWKDY_ROOT":69,"AVSAT":2965,"AVSAT_ROOT":54,"AVSUN":2196,"AVSUN_ROOT":47,"TOTAL":1506939,"TOTAL_ROOT":1228 ,"Route":"2"},
{"Station_name":"Bedford Park Blvd","Latitude":40.873244,"Longitude":-73.887138,"AVWKDY":5565,"AVWKDY_ROOT":75,"AVSAT":3113,"AVSAT_ROOT":56,"AVSUN":2416,"AVSUN_ROOT":49,"TOTAL":1717530,"TOTAL_ROOT":1311 ,"Route":"B"},
{"Station_name":"Van Siclen Av","Latitude":40.665449,"Longitude":-73.889395,"AVWKDY":2601,"AVWKDY_ROOT":51,"AVSAT":1437,"AVSAT_ROOT":38,"AVSUN":1102,"AVSUN_ROOT":33,"TOTAL":802672,"TOTAL_ROOT":896 ,"Route":"3"},
{"Station_name":"Bedford Park Blvd-Lehman College","Latitude":40.873412,"Longitude":-73.890064,"AVWKDY":4256,"AVWKDY_ROOT":65,"AVSAT":2066,"AVSAT_ROOT":45,"AVSUN":1593,"AVSUN_ROOT":40,"TOTAL":1282122,"TOTAL_ROOT":1132 ,"Route":"4"},
{"Station_name":"Metropolitan Av","Latitude":40.711396,"Longitude":-73.889601,"AVWKDY":3151,"AVWKDY_ROOT":56,"AVSAT":1783,"AVSAT_ROOT":42,"AVSUN":1469,"AVSUN_ROOT":38,"TOTAL":978423,"TOTAL_ROOT":989 ,"Route":"M"},
{"Station_name":"Van Siclen Av","Latitude":40.67271,"Longitude":-73.890358,"AVWKDY":2410,"AVWKDY_ROOT":49,"AVSAT":1592,"AVSAT_ROOT":40,"AVSUN":1138,"AVSUN_ROOT":34,"TOTAL":762661,"TOTAL_ROOT":873 ,"Route":"A"},
{"Station_name":"Broadway-74th St","Latitude":40.746848,"Longitude":-73.891394,"AVWKDY":42415,"AVWKDY_ROOT":206,"AVSAT":30493,"AVSAT_ROOT":175,"AVSUN":23950,"AVSUN_ROOT":155,"TOTAL":13769858,"TOTAL_ROOT":3711 ,"Route":"E"},
{"Station_name":"Hunts Point Av","Latitude":40.820948,"Longitude":-73.890549,"AVWKDY":8618,"AVWKDY_ROOT":93,"AVSAT":4582,"AVSAT_ROOT":68,"AVSUN":3295,"AVSUN_ROOT":57,"TOTAL":2622658,"TOTAL_ROOT":1619 ,"Route":"6"},
{"Station_name":"Van Siclen Av","Latitude":40.678024,"Longitude":-73.891688,"AVWKDY":2117,"AVWKDY_ROOT":46,"AVSAT":1306,"AVSAT_ROOT":36,"AVSUN":1003,"AVSUN_ROOT":32,"TOTAL":665636,"TOTAL_ROOT":816 ,"Route":"J"},
{"Station_name":"Freeman St","Latitude":40.829993,"Longitude":-73.891865,"AVWKDY":2516,"AVWKDY_ROOT":50,"AVSAT":1678,"AVSAT_ROOT":41,"AVSUN":1200,"AVSUN_ROOT":35,"TOTAL":798269,"TOTAL_ROOT":893 ,"Route":"2"},
{"Station_name":"Simpson St","Latitude":40.824073,"Longitude":-73.893064,"AVWKDY":7122,"AVWKDY_ROOT":84,"AVSAT":4986,"AVSAT_ROOT":71,"AVSUN":3344,"AVSUN_ROOT":58,"TOTAL":2267465,"TOTAL_ROOT":1506 ,"Route":"2"},
{"Station_name":"Pennsylvania Av","Latitude":40.664635,"Longitude":-73.894895,"AVWKDY":4967,"AVWKDY_ROOT":70,"AVSAT":3055,"AVSAT_ROOT":55,"AVSUN":2131,"AVSUN_ROOT":46,"TOTAL":1551315,"TOTAL_ROOT":1246 ,"Route":"3"},
{"Station_name":"Kingsbridge Rd","Latitude":40.866978,"Longitude":-73.893509,"AVWKDY":7175,"AVWKDY_ROOT":85,"AVSAT":4501,"AVSAT_ROOT":67,"AVSUN":3475,"AVSUN_ROOT":59,"TOTAL":2262686,"TOTAL_ROOT":1504 ,"Route":"B"},
{"Station_name":"Fisk Av-69th St","Latitude":40.746325,"Longitude":-73.896403,"AVWKDY":5112,"AVWKDY_ROOT":71,"AVSAT":4292,"AVSAT_ROOT":66,"AVSUN":3597,"AVSUN_ROOT":60,"TOTAL":1732078,"TOTAL_ROOT":1316 ,"Route":"7"},
{"Station_name":"Longwood Av","Latitude":40.816104,"Longitude":-73.896435,"AVWKDY":2591,"AVWKDY_ROOT":51,"AVSAT":1610,"AVSAT_ROOT":40,"AVSUN":1111,"AVSUN_ROOT":33,"TOTAL":808127,"TOTAL_ROOT":899 ,"Route":"6"},
{"Station_name":"Liberty Av","Latitude":40.674542,"Longitude":-73.896548,"AVWKDY":3155,"AVWKDY_ROOT":56,"AVSAT":1650,"AVSAT_ROOT":41,"AVSUN":1203,"AVSUN_ROOT":35,"TOTAL":958094,"TOTAL_ROOT":979 ,"Route":"A"},
{"Station_name":"Fresh Pond Rd","Latitude":40.706186,"Longitude":-73.895877,"AVWKDY":3977,"AVWKDY_ROOT":63,"AVSAT":1988,"AVSAT_ROOT":45,"AVSUN":1458,"AVSUN_ROOT":38,"TOTAL":1200058,"TOTAL_ROOT":1095 ,"Route":"M"},
{"Station_name":"Fordham Rd","Latitude":40.861296,"Longitude":-73.897749,"AVWKDY":9750,"AVWKDY_ROOT":99,"AVSAT":7335,"AVSAT_ROOT":86,"AVSUN":5189,"AVSUN_ROOT":72,"TOTAL":3164601,"TOTAL_ROOT":1779 ,"Route":"B"},
{"Station_name":"Intervale Av","Latitude":40.822181,"Longitude":-73.896736,"AVWKDY":2134,"AVWKDY_ROOT":46,"AVSAT":1333,"AVSAT_ROOT":37,"AVSUN":958,"AVSUN_ROOT":31,"TOTAL":668462,"TOTAL_ROOT":818 ,"Route":"2"},
{"Station_name":"Kingsbridge Rd","Latitude":40.86776,"Longitude":-73.897174,"AVWKDY":7904,"AVWKDY_ROOT":89,"AVSAT":4419,"AVSAT_ROOT":66,"AVSUN":3200,"AVSUN_ROOT":57,"TOTAL":2429177,"TOTAL_ROOT":1559 ,"Route":"4"},
{"Station_name":"65th St","Latitude":40.749669,"Longitude":-73.898453,"AVWKDY":3089,"AVWKDY_ROOT":56,"AVSAT":1867,"AVSAT_ROOT":43,"AVSUN":1470,"AVSUN_ROOT":38,"TOTAL":968872,"TOTAL_ROOT":984 ,"Route":"M"},
{"Station_name":"Van Cortlandt Park-242nd St","Latitude":40.889248,"Longitude":-73.898583,"AVWKDY":5276,"AVWKDY_ROOT":73,"AVSAT":3427,"AVSAT_ROOT":59,"AVSUN":2730,"AVSUN_ROOT":52,"TOTAL":1679040,"TOTAL_ROOT":1296 ,"Route":"1"},
{"Station_name":"East 105th St","Latitude":40.650573,"Longitude":-73.899485,"AVWKDY":2649,"AVWKDY_ROOT":51,"AVSAT":1176,"AVSAT_ROOT":34,"AVSUN":851,"AVSUN_ROOT":29,"TOTAL":785548,"TOTAL_ROOT":886 ,"Route":"L"},
{"Station_name":"New Lots Av","Latitude":40.658733,"Longitude":-73.899232,"AVWKDY":2395,"AVWKDY_ROOT":49,"AVSAT":1248,"AVSAT_ROOT":35,"AVSUN":885,"AVSUN_ROOT":30,"TOTAL":726318,"TOTAL_ROOT":852 ,"Route":"L"},
{"Station_name":"East 149th St","Latitude":40.812118,"Longitude":-73.904098,"AVWKDY":3428,"AVWKDY_ROOT":59,"AVSAT":2190,"AVSAT_ROOT":47,"AVSUN":1669,"AVSUN_ROOT":41,"TOTAL":1083833,"TOTAL_ROOT":1041 ,"Route":"6"},
{"Station_name":"238th St","Latitude":40.884667,"Longitude":-73.90087,"AVWKDY":2627,"AVWKDY_ROOT":51,"AVSAT":1641,"AVSAT_ROOT":41,"AVSUN":1232,"AVSUN_ROOT":35,"TOTAL":826023,"TOTAL_ROOT":909 ,"Route":"1"},
{"Station_name":"Alabama Av","Latitude":40.676992,"Longitude":-73.898654,"AVWKDY":1949,"AVWKDY_ROOT":44,"AVSAT":1273,"AVSAT_ROOT":36,"AVSUN":1018,"AVSUN_ROOT":32,"TOTAL":621905,"TOTAL_ROOT":789 ,"Route":"J"},
{"Station_name":"Livonia Av","Latitude":40.664038,"Longitude":-73.900571,"AVWKDY":1542,"AVWKDY_ROOT":39,"AVSAT":890,"AVSAT_ROOT":30,"AVSUN":623,"AVSUN_ROOT":25,"TOTAL":475538,"TOTAL_ROOT":690 ,"Route":"L"},
{"Station_name":"182nd-183rd Sts","Latitude":40.856093,"Longitude":-73.900741,"AVWKDY":4239,"AVWKDY_ROOT":65,"AVSAT":3287,"AVSAT_ROOT":57,"AVSUN":2553,"AVSUN_ROOT":51,"TOTAL":1398521,"TOTAL_ROOT":1183 ,"Route":"B"},
{"Station_name":"Fordham Rd","Latitude":40.862803,"Longitude":-73.901034,"AVWKDY":9170,"AVWKDY_ROOT":96,"AVSAT":6544,"AVSAT_ROOT":81,"AVSUN":4597,"AVSUN_ROOT":68,"TOTAL":2943268,"TOTAL_ROOT":1716 ,"Route":"4"},
{"Station_name":"Junius St","Latitude":40.663515,"Longitude":-73.902447,"AVWKDY":1688,"AVWKDY_ROOT":41,"AVSAT":1067,"AVSAT_ROOT":33,"AVSUN":768,"AVSUN_ROOT":28,"TOTAL":531351,"TOTAL_ROOT":729 ,"Route":"3"},
{"Station_name":"Sutter Av","Latitude":40.669367,"Longitude":-73.901975,"AVWKDY":3024,"AVWKDY_ROOT":55,"AVSAT":1877,"AVSAT_ROOT":43,"AVSUN":1315,"AVSUN_ROOT":36,"TOTAL":945035,"TOTAL_ROOT":972 ,"Route":"L"},
{"Station_name":"Prospect Av","Latitude":40.819585,"Longitude":-73.90177,"AVWKDY":5328,"AVWKDY_ROOT":73,"AVSAT":3232,"AVSAT_ROOT":57,"AVSUN":2486,"AVSUN_ROOT":50,"TOTAL":1669193,"TOTAL_ROOT":1292 ,"Route":"2"},
{"Station_name":"Forest Av","Latitude":40.704423,"Longitude":-73.903077,"AVWKDY":3121,"AVWKDY_ROOT":56,"AVSAT":1566,"AVSAT_ROOT":40,"AVSUN":1155,"AVSUN_ROOT":34,"TOTAL":942974,"TOTAL_ROOT":971 ,"Route":"M"},
{"Station_name":"Canarsie - Rockaway Parkway","Latitude":40.646654,"Longitude":-73.90185,"AVWKDY":10513,"AVWKDY_ROOT":103,"AVSAT":4807,"AVSAT_ROOT":69,"AVSUN":3320,"AVSUN_ROOT":58,"TOTAL":3118706,"TOTAL_ROOT":1766 ,"Route":"L"},
{"Station_name":"Atlantic Av","Latitude":40.675345,"Longitude":-73.903097,"AVWKDY":812,"AVWKDY_ROOT":28,"AVSAT":324,"AVSAT_ROOT":18,"AVSUN":236,"AVSUN_ROOT":15,"TOTAL":237261,"TOTAL_ROOT":487 ,"Route":"L"},
{"Station_name":"Woodside Av-61st St","Latitude":40.74563,"Longitude":-73.902984,"AVWKDY":15216,"AVWKDY_ROOT":123,"AVSAT":10320,"AVSAT_ROOT":102,"AVSUN":8396,"AVSUN_ROOT":92,"TOTAL":4894701,"TOTAL_ROOT":2212 ,"Route":"7"},
{"Station_name":"Wilson Av","Latitude":40.688764,"Longitude":-73.904046,"AVWKDY":2487,"AVWKDY_ROOT":50,"AVSAT":1135,"AVSAT_ROOT":34,"AVSUN":896,"AVSUN_ROOT":30,"TOTAL":746073,"TOTAL_ROOT":864 ,"Route":"L"},
{"Station_name":"Broadway Junction-East New York","Latitude":40.678334,"Longitude":-73.905316,"AVWKDY":7766,"AVWKDY_ROOT":88,"AVSAT":6289,"AVSAT_ROOT":79,"AVSUN":4562,"AVSUN_ROOT":68,"TOTAL":2564744,"TOTAL_ROOT":1601 ,"Route":"A"},
{"Station_name":"183rd St","Latitude":40.858407,"Longitude":-73.903879,"AVWKDY":5121,"AVWKDY_ROOT":72,"AVSAT":3339,"AVSAT_ROOT":58,"AVSUN":2501,"AVSUN_ROOT":50,"TOTAL":1624672,"TOTAL_ROOT":1275 ,"Route":"4"},
{"Station_name":"Halsey St","Latitude":40.695602,"Longitude":-73.904084,"AVWKDY":4690,"AVWKDY_ROOT":68,"AVSAT":1928,"AVSAT_ROOT":44,"AVSUN":1401,"AVSUN_ROOT":37,"TOTAL":1379653,"TOTAL_ROOT":1175 ,"Route":"L"},
{"Station_name":"Bushwick Av","Latitude":40.682829,"Longitude":-73.905249,"AVWKDY":877,"AVWKDY_ROOT":30,"AVSAT":393,"AVSAT_ROOT":20,"AVSUN":296,"AVSUN_ROOT":17,"TOTAL":261751,"TOTAL_ROOT":512 ,"Route":"L"},
{"Station_name":"231st St","Latitude":40.878856,"Longitude":-73.904834,"AVWKDY":8094,"AVWKDY_ROOT":90,"AVSAT":4856,"AVSAT_ROOT":70,"AVSUN":3632,"AVSUN_ROOT":60,"TOTAL":2525111,"TOTAL_ROOT":1589 ,"Route":"1"},
{"Station_name":"Tremont Av","Latitude":40.85041,"Longitude":-73.905227,"AVWKDY":7136,"AVWKDY_ROOT":84,"AVSAT":4453,"AVSAT_ROOT":67,"AVSUN":3383,"AVSUN_ROOT":58,"TOTAL":2243693,"TOTAL_ROOT":1498 ,"Route":"B"},
{"Station_name":"Northern Blvd","Latitude":40.752885,"Longitude":-73.906006,"AVWKDY":6891,"AVWKDY_ROOT":83,"AVSAT":3747,"AVSAT_ROOT":61,"AVSUN":2813,"AVSUN_ROOT":53,"TOTAL":2111509,"TOTAL_ROOT":1453 ,"Route":"M"},
{"Station_name":"Seneca Av","Latitude":40.702762,"Longitude":-73.90774,"AVWKDY":1671,"AVWKDY_ROOT":41,"AVSAT":1039,"AVSAT_ROOT":32,"AVSUN":863,"AVSUN_ROOT":29,"TOTAL":529668,"TOTAL_ROOT":728 ,"Route":"M"},
{"Station_name":"Burnside Av","Latitude":40.853453,"Longitude":-73.907684,"AVWKDY":8851,"AVWKDY_ROOT":94,"AVSAT":5556,"AVSAT_ROOT":75,"AVSUN":3804,"AVSUN_ROOT":62,"TOTAL":2764792,"TOTAL_ROOT":1663 ,"Route":"4"},
{"Station_name":"East 143rd St-St Mary's St","Latitude":40.808719,"Longitude":-73.907657,"AVWKDY":876,"AVWKDY_ROOT":30,"AVSAT":370,"AVSAT_ROOT":19,"AVSUN":235,"AVSUN_ROOT":15,"TOTAL":255783,"TOTAL_ROOT":506 ,"Route":"6"},
{"Station_name":"Jackson Av","Latitude":40.81649,"Longitude":-73.907807,"AVWKDY":4037,"AVWKDY_ROOT":64,"AVSAT":2521,"AVSAT_ROOT":50,"AVSUN":1808,"AVSUN_ROOT":43,"TOTAL":1265164,"TOTAL_ROOT":1125 ,"Route":"2"},
{"Station_name":"Rockaway Av","Latitude":40.662549,"Longitude":-73.908946,"AVWKDY":5130,"AVWKDY_ROOT":72,"AVSAT":3079,"AVSAT_ROOT":55,"AVSUN":2198,"AVSUN_ROOT":47,"TOTAL":1596728,"TOTAL_ROOT":1264 ,"Route":"3"},
{"Station_name":"Chauncey St","Latitude":40.682893,"Longitude":-73.910456,"AVWKDY":1500,"AVWKDY_ROOT":39,"AVSAT":970,"AVSAT_ROOT":31,"AVSUN":686,"AVSUN_ROOT":26,"TOTAL":472913,"TOTAL_ROOT":688 ,"Route":"J"},
{"Station_name":"Marble Hill-225th St","Latitude":40.874561,"Longitude":-73.909831,"AVWKDY":3784,"AVWKDY_ROOT":62,"AVSAT":2471,"AVSAT_ROOT":50,"AVSUN":1949,"AVSUN_ROOT":44,"TOTAL":1205409,"TOTAL_ROOT":1098 ,"Route":"1"},
{"Station_name":"Ditmars Blvd","Latitude":40.775036,"Longitude":-73.912034,"AVWKDY":15265,"AVWKDY_ROOT":124,"AVSAT":8612,"AVSAT_ROOT":93,"AVSUN":6053,"AVSUN_ROOT":78,"TOTAL":4684867,"TOTAL_ROOT":2164 ,"Route":"N"},
{"Station_name":"174-175th Sts","Latitude":40.8459,"Longitude":-73.910136,"AVWKDY":4341,"AVWKDY_ROOT":66,"AVSAT":3080,"AVSAT_ROOT":55,"AVSUN":2363,"AVSUN_ROOT":49,"TOTAL":1403031,"TOTAL_ROOT":1184 ,"Route":"B"},
{"Station_name":"Myrtle Av","Latitude":40.699814,"Longitude":-73.911586,"AVWKDY":12826,"AVWKDY_ROOT":113,"AVSAT":9647,"AVSAT_ROOT":98,"AVSUN":7017,"AVSUN_ROOT":84,"TOTAL":4172431,"TOTAL_ROOT":2043 ,"Route":"L"},
{"Station_name":"Rockaway Av","Latitude":40.67834,"Longitude":-73.911946,"AVWKDY":4086,"AVWKDY_ROOT":64,"AVSAT":2572,"AVSAT_ROOT":51,"AVSUN":1847,"AVSUN_ROOT":43,"TOTAL":1281877,"TOTAL_ROOT":1132 ,"Route":"A"},
{"Station_name":"176th St","Latitude":40.84848,"Longitude":-73.911794,"AVWKDY":4342,"AVWKDY_ROOT":66,"AVSAT":2749,"AVSAT_ROOT":52,"AVSUN":2007,"AVSUN_ROOT":45,"TOTAL":1366489,"TOTAL_ROOT":1169 ,"Route":"4"},
{"Station_name":"Lincoln Av-52nd St","Latitude":40.744149,"Longitude":-73.912549,"AVWKDY":6316,"AVWKDY_ROOT":79,"AVSAT":4484,"AVSAT_ROOT":67,"AVSUN":3543,"AVSUN_ROOT":60,"TOTAL":2045660,"TOTAL_ROOT":1430 ,"Route":"7"},
{"Station_name":"46th St","Latitude":40.756312,"Longitude":-73.913333,"AVWKDY":8854,"AVWKDY_ROOT":94,"AVSAT":5108,"AVSAT_ROOT":71,"AVSUN":3788,"AVSUN_ROOT":62,"TOTAL":2738594,"TOTAL_ROOT":1655 ,"Route":"M"},
{"Station_name":"170th St","Latitude":40.839306,"Longitude":-73.9134,"AVWKDY":5447,"AVWKDY_ROOT":74,"AVSAT":4122,"AVSAT_ROOT":64,"AVSUN":3079,"AVSUN_ROOT":55,"TOTAL":1780736,"TOTAL_ROOT":1334 ,"Route":"B"},
{"Station_name":"Cypress Av","Latitude":40.805368,"Longitude":-73.914042,"AVWKDY":2601,"AVWKDY_ROOT":51,"AVSAT":1520,"AVSAT_ROOT":39,"AVSUN":1138,"AVSUN_ROOT":34,"TOTAL":807611,"TOTAL_ROOT":899 ,"Route":"6"},
{"Station_name":"Mt Eden Av","Latitude":40.844434,"Longitude":-73.914685,"AVWKDY":4581,"AVWKDY_ROOT":68,"AVSAT":2746,"AVSAT_ROOT":52,"AVSUN":2034,"AVSUN_ROOT":45,"TOTAL":1428197,"TOTAL_ROOT":1195 ,"Route":"4"},
{"Station_name":"Halsey St","Latitude":40.68637,"Longitude":-73.916559,"AVWKDY":3465,"AVWKDY_ROOT":59,"AVSAT":2156,"AVSAT_ROOT":46,"AVSUN":1603,"AVSUN_ROOT":40,"TOTAL":1090096,"TOTAL_ROOT":1044 ,"Route":"J"},
{"Station_name":"215th St","Latitude":40.869444,"Longitude":-73.915279,"AVWKDY":1373,"AVWKDY_ROOT":37,"AVSAT":1009,"AVSAT_ROOT":32,"AVSUN":638,"AVSUN_ROOT":25,"TOTAL":439038,"TOTAL_ROOT":663 ,"Route":"1"},
{"Station_name":"Saratoga Av","Latitude":40.661453,"Longitude":-73.916327,"AVWKDY":5155,"AVWKDY_ROOT":72,"AVSAT":2910,"AVSAT_ROOT":54,"AVSUN":2136,"AVSUN_ROOT":46,"TOTAL":1590897,"TOTAL_ROOT":1261 ,"Route":"3"},
{"Station_name":"Astoria Blvd-Hoyt Av","Latitude":40.770258,"Longitude":-73.917843,"AVWKDY":9184,"AVWKDY_ROOT":96,"AVSAT":5560,"AVSAT_ROOT":75,"AVSUN":4323,"AVSUN_ROOT":66,"TOTAL":2878864,"TOTAL_ROOT":1697 ,"Route":"N"},
{"Station_name":"167th St","Latitude":40.833769,"Longitude":-73.918432,"AVWKDY":7549,"AVWKDY_ROOT":87,"AVSAT":5317,"AVSAT_ROOT":73,"AVSUN":4264,"AVSUN_ROOT":65,"TOTAL":2446398,"TOTAL_ROOT":1564 ,"Route":"B"},
{"Station_name":"170th St","Latitude":40.840075,"Longitude":-73.917791,"AVWKDY":6885,"AVWKDY_ROOT":83,"AVSAT":4373,"AVSAT_ROOT":66,"AVSUN":3167,"AVSUN_ROOT":56,"TOTAL":2166104,"TOTAL_ROOT":1472 ,"Route":"4"},
{"Station_name":"149th St-3rd Av","Latitude":40.816109,"Longitude":-73.917757,"AVWKDY":19887,"AVWKDY_ROOT":141,"AVSAT":12118,"AVSAT_ROOT":110,"AVSUN":7990,"AVSUN_ROOT":89,"TOTAL":6157503,"TOTAL_ROOT":2481 ,"Route":"2"},
{"Station_name":"Knickerbocker Av","Latitude":40.698664,"Longitude":-73.919711,"AVWKDY":2627,"AVWKDY_ROOT":51,"AVSAT":1897,"AVSAT_ROOT":44,"AVSUN":1446,"AVSUN_ROOT":38,"TOTAL":851836,"TOTAL_ROOT":923 ,"Route":"M"},
{"Station_name":"Bliss St-46th St","Latitude":40.743132,"Longitude":-73.918435,"AVWKDY":13396,"AVWKDY_ROOT":116,"AVSAT":9879,"AVSAT_ROOT":99,"AVSUN":7851,"AVSUN_ROOT":89,"TOTAL":4378691,"TOTAL_ROOT":2093 ,"Route":"7"},
{"Station_name":"DeKalb Av","Latitude":40.703811,"Longitude":-73.918425,"AVWKDY":7780,"AVWKDY_ROOT":88,"AVSAT":5248,"AVSAT_ROOT":72,"AVSUN":3861,"AVSUN_ROOT":62,"TOTAL":2479825,"TOTAL_ROOT":1575 ,"Route":"L"},
{"Station_name":"207th St","Latitude":40.864614,"Longitude":-73.918819,"AVWKDY":4167,"AVWKDY_ROOT":65,"AVSAT":3080,"AVSAT_ROOT":55,"AVSUN":2349,"AVSUN_ROOT":48,"TOTAL":1358164,"TOTAL_ROOT":1165 ,"Route":"1"},
{"Station_name":"Steinway St","Latitude":40.756879,"Longitude":-73.92074,"AVWKDY":14325,"AVWKDY_ROOT":120,"AVSAT":11108,"AVSAT_ROOT":105,"AVSUN":8255,"AVSUN_ROOT":91,"TOTAL":4700047,"TOTAL_ROOT":2168 ,"Route":"M"},
{"Station_name":"Brook Av","Latitude":40.807566,"Longitude":-73.91924,"AVWKDY":4843,"AVWKDY_ROOT":70,"AVSAT":3509,"AVSAT_ROOT":59,"AVSUN":2722,"AVSUN_ROOT":52,"TOTAL":1573905,"TOTAL_ROOT":1255 ,"Route":"6"},
{"Station_name":"Inwood - 207th St","Latitude":40.868072,"Longitude":-73.919899,"AVWKDY":7603,"AVWKDY_ROOT":87,"AVSAT":4939,"AVSAT_ROOT":70,"AVSUN":3721,"AVSUN_ROOT":61,"TOTAL":2407026,"TOTAL_ROOT":1551 ,"Route":"A"},
{"Station_name":"30 Av-Grand Av","Latitude":40.766779,"Longitude":-73.921479,"AVWKDY":11858,"AVWKDY_ROOT":109,"AVSAT":7933,"AVSAT_ROOT":89,"AVSUN":5986,"AVSUN_ROOT":77,"TOTAL":3780433,"TOTAL_ROOT":1944 ,"Route":"N"},
{"Station_name":"167th St","Latitude":40.835537,"Longitude":-73.9214,"AVWKDY":7500,"AVWKDY_ROOT":87,"AVSAT":4857,"AVSAT_ROOT":70,"AVSUN":3650,"AVSUN_ROOT":60,"TOTAL":2375002,"TOTAL_ROOT":1541 ,"Route":"4"},
{"Station_name":"Ralph Av","Latitude":40.678822,"Longitude":-73.920786,"AVWKDY":3864,"AVWKDY_ROOT":62,"AVSAT":2590,"AVSAT_ROOT":51,"AVSUN":1909,"AVSUN_ROOT":44,"TOTAL":1229837,"TOTAL_ROOT":1109 ,"Route":"A"},
{"Station_name":"Gates Av","Latitude":40.68963,"Longitude":-73.92227,"AVWKDY":2790,"AVWKDY_ROOT":53,"AVSAT":1873,"AVSAT_ROOT":43,"AVSUN":1398,"AVSUN_ROOT":37,"TOTAL":889505,"TOTAL_ROOT":943 ,"Route":"J"},
{"Station_name":"138th St-3rd Ave","Latitude":40.810476,"Longitude":-73.926138,"AVWKDY":4926,"AVWKDY_ROOT":70,"AVSAT":3286,"AVSAT_ROOT":57,"AVSUN":2609,"AVSUN_ROOT":51,"TOTAL":1575887,"TOTAL_ROOT":1255 ,"Route":"6"},
{"Station_name":"Sutter Av","Latitude":40.664717,"Longitude":-73.92261,"AVWKDY":6356,"AVWKDY_ROOT":80,"AVSAT":3812,"AVSAT_ROOT":62,"AVSUN":2713,"AVSUN_ROOT":52,"TOTAL":1976281,"TOTAL_ROOT":1406 ,"Route":"3"},
{"Station_name":"Lowery St-40th St","Latitude":40.743781,"Longitude":-73.924016,"AVWKDY":10133,"AVWKDY_ROOT":101,"AVSAT":6402,"AVSAT_ROOT":80,"AVSUN":4860,"AVSUN_ROOT":70,"TOTAL":3194535,"TOTAL_ROOT":1787 ,"Route":"7"},
{"Station_name":"Broadway","Latitude":40.76182,"Longitude":-73.925508,"AVWKDY":11141,"AVWKDY_ROOT":106,"AVSAT":7261,"AVSAT_ROOT":85,"AVSUN":5551,"AVSUN_ROOT":75,"TOTAL":3542286,"TOTAL_ROOT":1882 ,"Route":"N"},
{"Station_name":"Dyckman St","Latitude":40.860531,"Longitude":-73.925536,"AVWKDY":6351,"AVWKDY_ROOT":80,"AVSAT":4524,"AVSAT_ROOT":67,"AVSUN":3603,"AVSUN_ROOT":60,"TOTAL":2063127,"TOTAL_ROOT":1436 ,"Route":"1"},
{"Station_name":"Central Av","Latitude":40.697857,"Longitude":-73.927397,"AVWKDY":1292,"AVWKDY_ROOT":36,"AVSAT":782,"AVSAT_ROOT":28,"AVSUN":613,"AVSUN_ROOT":25,"TOTAL":405463,"TOTAL_ROOT":637 ,"Route":"M"},
{"Station_name":"Yankee Stadium-161st St","Latitude":40.827994,"Longitude":-73.925831,"AVWKDY":20829,"AVWKDY_ROOT":144,"AVSAT":14389,"AVSAT_ROOT":120,"AVSUN":10870,"AVSUN_ROOT":104,"TOTAL":6660715,"TOTAL_ROOT":2581 ,"Route":"B"},
{"Station_name":"Dyckman St-200th St","Latitude":40.865491,"Longitude":-73.927271,"AVWKDY":5992,"AVWKDY_ROOT":77,"AVSAT":4066,"AVSAT_ROOT":64,"AVSUN":3167,"AVSUN_ROOT":56,"TOTAL":1919364,"TOTAL_ROOT":1385 ,"Route":"A"},
{"Station_name":"36th St","Latitude":40.752039,"Longitude":-73.928781,"AVWKDY":3496,"AVWKDY_ROOT":59,"AVSAT":1325,"AVSAT_ROOT":36,"AVSUN":733,"AVSUN_ROOT":27,"TOTAL":1000007,"TOTAL_ROOT":1000 ,"Route":"M"},
{"Station_name":"149th St-Grand Concourse","Latitude":40.818375,"Longitude":-73.927351,"AVWKDY":9474,"AVWKDY_ROOT":97,"AVSAT":4908,"AVSAT_ROOT":70,"AVSUN":3382,"AVSUN_ROOT":58,"TOTAL":2861071,"TOTAL_ROOT":1691 ,"Route":"2"},
{"Station_name":"36 Av-Washington Av","Latitude":40.756804,"Longitude":-73.929575,"AVWKDY":6080,"AVWKDY_ROOT":78,"AVSAT":4008,"AVSAT_ROOT":63,"AVSUN":3173,"AVSUN_ROOT":56,"TOTAL":1941024,"TOTAL_ROOT":1393 ,"Route":"N"},
{"Station_name":"191st St","Latitude":40.855225,"Longitude":-73.929412,"AVWKDY":6512,"AVWKDY_ROOT":81,"AVSAT":4005,"AVSAT_ROOT":63,"AVSUN":3217,"AVSUN_ROOT":57,"TOTAL":2055249,"TOTAL_ROOT":1434 ,"Route":"1"},
{"Station_name":"138th St","Latitude":40.813224,"Longitude":-73.929849,"AVWKDY":2259,"AVWKDY_ROOT":48,"AVSAT":1256,"AVSAT_ROOT":35,"AVSUN":986,"AVSUN_ROOT":31,"TOTAL":695696,"TOTAL_ROOT":834 ,"Route":"4"},
{"Station_name":"Kosciusko St","Latitude":40.693342,"Longitude":-73.928814,"AVWKDY":2475,"AVWKDY_ROOT":50,"AVSAT":1431,"AVSAT_ROOT":38,"AVSUN":1058,"AVSUN_ROOT":33,"TOTAL":766967,"TOTAL_ROOT":876 ,"Route":"J"},
{"Station_name":"Utica Av","Latitude":40.679364,"Longitude":-73.930729,"AVWKDY":12079,"AVWKDY_ROOT":110,"AVSAT":7619,"AVSAT_ROOT":87,"AVSUN":5573,"AVSUN_ROOT":75,"TOTAL":3799809,"TOTAL_ROOT":1949 ,"Route":"A"},
{"Station_name":"Utica Av","Latitude":40.668897,"Longitude":-73.932942,"AVWKDY":26443,"AVWKDY_ROOT":163,"AVSAT":14620,"AVSAT_ROOT":121,"AVSUN":10298,"AVSUN_ROOT":101,"TOTAL":8105914,"TOTAL_ROOT":2847 ,"Route":"3"},
{"Station_name":"Jefferson St","Latitude":40.706607,"Longitude":-73.922913,"AVWKDY":3947,"AVWKDY_ROOT":63,"AVSAT":2494,"AVSAT_ROOT":50,"AVSUN":1738,"AVSUN_ROOT":42,"TOTAL":1237370,"TOTAL_ROOT":1112 ,"Route":"L"},
{"Station_name":"Morgan Av","Latitude":40.706152,"Longitude":-73.933147,"AVWKDY":2832,"AVWKDY_ROOT":53,"AVSAT":1629,"AVSAT_ROOT":40,"AVSUN":1070,"AVSUN_ROOT":33,"TOTAL":869148,"TOTAL_ROOT":932 ,"Route":"L"},
{"Station_name":"Rawson St-33rd St","Latitude":40.744587,"Longitude":-73.930997,"AVWKDY":11160,"AVWKDY_ROOT":106,"AVSAT":2831,"AVSAT_ROOT":53,"AVSUN":989,"AVSUN_ROOT":31,"TOTAL":3041783,"TOTAL_ROOT":1744 ,"Route":"7"},
{"Station_name":"39 Av-Beebe Av","Latitude":40.752882,"Longitude":-73.932755,"AVWKDY":1613,"AVWKDY_ROOT":40,"AVSAT":849,"AVSAT_ROOT":29,"AVSUN":623,"AVSUN_ROOT":25,"TOTAL":490623,"TOTAL_ROOT":700 ,"Route":"N"},
{"Station_name":"181st St","Latitude":40.849505,"Longitude":-73.933596,"AVWKDY":8829,"AVWKDY_ROOT":94,"AVSAT":6513,"AVSAT_ROOT":81,"AVSUN":4983,"AVSUN_ROOT":71,"TOTAL":2877344,"TOTAL_ROOT":1696 ,"Route":"1"},
{"Station_name":"Myrtle Av","Latitude":40.697207,"Longitude":-73.935657,"AVWKDY":5375,"AVWKDY_ROOT":73,"AVSAT":3635,"AVSAT_ROOT":60,"AVSUN":2742,"AVSUN_ROOT":52,"TOTAL":1717802,"TOTAL_ROOT":1311 ,"Route":"J"},
{"Station_name":"190th St","Latitude":40.859022,"Longitude":-73.93418,"AVWKDY":3833,"AVWKDY_ROOT":62,"AVSAT":2671,"AVSAT_ROOT":52,"AVSUN":2177,"AVSUN_ROOT":47,"TOTAL":1238462,"TOTAL_ROOT":1113 ,"Route":"A"},
{"Station_name":"145th St","Latitude":40.820421,"Longitude":-73.936245,"AVWKDY":2477,"AVWKDY_ROOT":50,"AVSAT":1416,"AVSAT_ROOT":38,"AVSUN":912,"AVSUN_ROOT":30,"TOTAL":757668,"TOTAL_ROOT":870 ,"Route":"3"},
{"Station_name":"Queens Plaza","Latitude":40.748973,"Longitude":-73.937243,"AVWKDY":12156,"AVWKDY_ROOT":110,"AVSAT":4231,"AVSAT_ROOT":65,"AVSUN":2406,"AVSUN_ROOT":49,"TOTAL":3448908,"TOTAL_ROOT":1857 ,"Route":"E"},
{"Station_name":"125th St","Latitude":40.804138,"Longitude":-73.937594,"AVWKDY":20341,"AVWKDY_ROOT":143,"AVSAT":13412,"AVSAT_ROOT":116,"AVSUN":9807,"AVSUN_ROOT":99,"TOTAL":6440074,"TOTAL_ROOT":2538 ,"Route":"4"},
{"Station_name":"Harlem-148th St","Latitude":40.82388,"Longitude":-73.93647,"AVWKDY":2575,"AVWKDY_ROOT":51,"AVSAT":1393,"AVSAT_ROOT":37,"AVSUN":910,"AVSUN_ROOT":30,"TOTAL":781063,"TOTAL_ROOT":884 ,"Route":"3"},
{"Station_name":"155th St","Latitude":40.830135,"Longitude":-73.938209,"AVWKDY":3294,"AVWKDY_ROOT":57,"AVSAT":2066,"AVSAT_ROOT":45,"AVSUN":1545,"AVSUN_ROOT":39,"TOTAL":1037764,"TOTAL_ROOT":1019 ,"Route":"B"},
{"Station_name":"181st St","Latitude":40.851695,"Longitude":-73.937969,"AVWKDY":9134,"AVWKDY_ROOT":96,"AVSAT":6218,"AVSAT_ROOT":79,"AVSUN":4969,"AVSUN_ROOT":70,"TOTAL":2935632,"TOTAL_ROOT":1713 ,"Route":"A"},
{"Station_name":"Queensboro Plaza","Latitude":40.750582,"Longitude":-73.940202,"AVWKDY":8196,"AVWKDY_ROOT":91,"AVSAT":6174,"AVSAT_ROOT":79,"AVSUN":4046,"AVSUN_ROOT":64,"TOTAL":2636511,"TOTAL_ROOT":1624 ,"Route":"N"},
{"Station_name":"168th St - Washington Heights","Latitude":40.840719,"Longitude":-73.939561,"AVWKDY":19423,"AVWKDY_ROOT":139,"AVSAT":11097,"AVSAT_ROOT":105,"AVSUN":8425,"AVSUN_ROOT":92,"TOTAL":6008311,"TOTAL_ROOT":2451 ,"Route":"A"},
{"Station_name":"Montrose Av","Latitude":40.707739,"Longitude":-73.93985,"AVWKDY":4215,"AVWKDY_ROOT":65,"AVSAT":2974,"AVSAT_ROOT":55,"AVSUN":2295,"AVSUN_ROOT":48,"TOTAL":1361833,"TOTAL_ROOT":1167 ,"Route":"L"},
{"Station_name":"163rd St - Amsterdam Av","Latitude":40.836013,"Longitude":-73.939892,"AVWKDY":3508,"AVWKDY_ROOT":59,"AVSAT":2284,"AVSAT_ROOT":48,"AVSUN":1718,"AVSUN_ROOT":41,"TOTAL":1112003,"TOTAL_ROOT":1055 ,"Route":"C"},
{"Station_name":"Kingston-Throop","Latitude":40.679921,"Longitude":-73.940858,"AVWKDY":4894,"AVWKDY_ROOT":70,"AVSAT":3208,"AVSAT_ROOT":57,"AVSUN":2358,"AVSUN_ROOT":49,"TOTAL":1550977,"TOTAL_ROOT":1245 ,"Route":"A"},
{"Station_name":"175th St","Latitude":40.847391,"Longitude":-73.939704,"AVWKDY":11588,"AVWKDY_ROOT":108,"AVSAT":6890,"AVSAT_ROOT":83,"AVSUN":5199,"AVSUN_ROOT":72,"TOTAL":3610217,"TOTAL_ROOT":1900 ,"Route":"A"},
{"Station_name":"Grand St","Latitude":40.711926,"Longitude":-73.94067,"AVWKDY":5317,"AVWKDY_ROOT":73,"AVSAT":2931,"AVSAT_ROOT":54,"AVSUN":2022,"AVSUN_ROOT":45,"TOTAL":1623686,"TOTAL_ROOT":1274 ,"Route":"L"},
{"Station_name":"135th St","Latitude":40.814229,"Longitude":-73.94077,"AVWKDY":10285,"AVWKDY_ROOT":101,"AVSAT":6887,"AVSAT_ROOT":83,"AVSUN":5346,"AVSUN_ROOT":73,"TOTAL":3283877,"TOTAL_ROOT":1812 ,"Route":"2"},
{"Station_name":"116th St","Latitude":40.798629,"Longitude":-73.941617,"AVWKDY":12198,"AVWKDY_ROOT":110,"AVSAT":9013,"AVSAT_ROOT":95,"AVSUN":7039,"AVSUN_ROOT":84,"TOTAL":3983617,"TOTAL_ROOT":1996 ,"Route":"6"},
{"Station_name":"155th St","Latitude":40.830518,"Longitude":-73.941514,"AVWKDY":2205,"AVWKDY_ROOT":47,"AVSAT":1491,"AVSAT_ROOT":39,"AVSUN":1083,"AVSUN_ROOT":33,"TOTAL":702040,"TOTAL_ROOT":838 ,"Route":"C"},
{"Station_name":"21st St","Latitude":40.754203,"Longitude":-73.942836,"AVWKDY":3360,"AVWKDY_ROOT":58,"AVSAT":2330,"AVSAT_ROOT":48,"AVSUN":1701,"AVSUN_ROOT":41,"TOTAL":1075486,"TOTAL_ROOT":1037 ,"Route":"F"},
{"Station_name":"Flushing Av","Latitude":40.70026,"Longitude":-73.941126,"AVWKDY":4729,"AVWKDY_ROOT":69,"AVSAT":3206,"AVSAT_ROOT":57,"AVSUN":2199,"AVSUN_ROOT":47,"TOTAL":1500323,"TOTAL_ROOT":1225 ,"Route":"J"},
{"Station_name":"Kingston Av","Latitude":40.669399,"Longitude":-73.942161,"AVWKDY":5320,"AVWKDY_ROOT":73,"AVSAT":2729,"AVSAT_ROOT":52,"AVSUN":2548,"AVSUN_ROOT":50,"TOTAL":1652636,"TOTAL_ROOT":1286 ,"Route":"3"},
{"Station_name":"23rd St-Ely Av","Latitude":40.747846,"Longitude":-73.946,"AVWKDY":12861,"AVWKDY_ROOT":113,"AVSAT":2948,"AVSAT_ROOT":54,"AVSUN":1803,"AVSUN_ROOT":42,"TOTAL":3529973,"TOTAL_ROOT":1879 ,"Route":"E"},
{"Station_name":"Graham Av","Latitude":40.714565,"Longitude":-73.944053,"AVWKDY":6348,"AVWKDY_ROOT":80,"AVSAT":4316,"AVSAT_ROOT":66,"AVSUN":3275,"AVSUN_ROOT":57,"TOTAL":2030039,"TOTAL_ROOT":1425 ,"Route":"L"},
{"Station_name":"110th St","Latitude":40.79502,"Longitude":-73.94425,"AVWKDY":9362,"AVWKDY_ROOT":97,"AVSAT":6340,"AVSAT_ROOT":80,"AVSUN":4755,"AVSUN_ROOT":69,"TOTAL":2990257,"TOTAL_ROOT":1729 ,"Route":"6"},
{"Station_name":"145th St","Latitude":40.824783,"Longitude":-73.944216,"AVWKDY":16327,"AVWKDY_ROOT":128,"AVSAT":11771,"AVSAT_ROOT":108,"AVSUN":8987,"AVSUN_ROOT":95,"TOTAL":5288463,"TOTAL_ROOT":2300 ,"Route":"A"},
{"Station_name":"157th St","Latitude":40.834041,"Longitude":-73.94489,"AVWKDY":8425,"AVWKDY_ROOT":92,"AVSAT":6316,"AVSAT_ROOT":79,"AVSUN":4831,"AVSUN_ROOT":70,"TOTAL":2757059,"TOTAL_ROOT":1660 ,"Route":"1"},
{"Station_name":"45 Rd-Court House Sq","Latitude":40.747023,"Longitude":-73.945264,"AVWKDY":4328,"AVWKDY_ROOT":66,"AVSAT":3762,"AVSAT_ROOT":61,"AVSUN":2394,"AVSUN_ROOT":49,"TOTAL":1434583,"TOTAL_ROOT":1198 ,"Route":"E"},
{"Station_name":"125th St","Latitude":40.807754,"Longitude":-73.945495,"AVWKDY":10044,"AVWKDY_ROOT":100,"AVSAT":7344,"AVSAT_ROOT":86,"AVSUN":5230,"AVSUN_ROOT":72,"TOTAL":3238556,"TOTAL_ROOT":1800 ,"Route":"2"},
{"Station_name":"Flatbush Av-Brooklyn College","Latitude":40.632836,"Longitude":-73.947642,"AVWKDY":19240,"AVWKDY_ROOT":139,"AVSAT":8774,"AVSAT_ROOT":94,"AVSUN":5862,"AVSUN_ROOT":77,"TOTAL":5700073,"TOTAL_ROOT":2387 ,"Route":"2"},
{"Station_name":"Lorimer St","Latitude":40.703869,"Longitude":-73.947408,"AVWKDY":1922,"AVWKDY_ROOT":44,"AVSAT":1174,"AVSAT_ROOT":34,"AVSUN":967,"AVSUN_ROOT":31,"TOTAL":606643,"TOTAL_ROOT":779 ,"Route":"J"},
{"Station_name":"103rd St","Latitude":40.7906,"Longitude":-73.947478,"AVWKDY":12646,"AVWKDY_ROOT":112,"AVSAT":8108,"AVSAT_ROOT":90,"AVSUN":6182,"AVSUN_ROOT":79,"TOTAL":3999075,"TOTAL_ROOT":2000 ,"Route":"6"},
{"Station_name":"Newkirk Av","Latitude":40.639967,"Longitude":-73.948411,"AVWKDY":8204,"AVWKDY_ROOT":91,"AVSAT":4455,"AVSAT_ROOT":67,"AVSUN":3196,"AVSUN_ROOT":57,"TOTAL":2510682,"TOTAL_ROOT":1585 ,"Route":"2"},
{"Station_name":"135th St","Latitude":40.817894,"Longitude":-73.947649,"AVWKDY":3628,"AVWKDY_ROOT":60,"AVSAT":1905,"AVSAT_ROOT":44,"AVSUN":1413,"AVSUN_ROOT":38,"TOTAL":1103285,"TOTAL_ROOT":1050 ,"Route":"B"},
{"Station_name":"Beverly Rd","Latitude":40.645098,"Longitude":-73.948959,"AVWKDY":4157,"AVWKDY_ROOT":64,"AVSAT":2347,"AVSAT_ROOT":48,"AVSUN":1664,"AVSUN_ROOT":41,"TOTAL":1280964,"TOTAL_ROOT":1132 ,"Route":"2"},
{"Station_name":"21st St","Latitude":40.744065,"Longitude":-73.949724,"AVWKDY":913,"AVWKDY_ROOT":30,"AVSAT":424,"AVSAT_ROOT":21,"AVSUN":297,"AVSUN_ROOT":17,"TOTAL":271923,"TOTAL_ROOT":521 ,"Route":"G"},
{"Station_name":"Hunters Point","Latitude":40.742216,"Longitude":-73.948916,"AVWKDY":5877,"AVWKDY_ROOT":77,"AVSAT":913,"AVSAT_ROOT":30,"AVSUN":488,"AVSUN_ROOT":22,"TOTAL":1570022,"TOTAL_ROOT":1253 ,"Route":"7"},
{"Station_name":"Myrtle-Willoughby Avs","Latitude":40.694568,"Longitude":-73.949046,"AVWKDY":3195,"AVWKDY_ROOT":57,"AVSAT":2006,"AVSAT_ROOT":45,"AVSUN":1455,"AVSUN_ROOT":38,"TOTAL":1002502,"TOTAL_ROOT":1001 ,"Route":"G"},
{"Station_name":"Church Av","Latitude":40.650843,"Longitude":-73.949575,"AVWKDY":10251,"AVWKDY_ROOT":101,"AVSAT":6236,"AVSAT_ROOT":79,"AVSUN":4055,"AVSUN_ROOT":64,"TOTAL":3178843,"TOTAL_ROOT":1783 ,"Route":"2"},
{"Station_name":"116th St","Latitude":40.802098,"Longitude":-73.949625,"AVWKDY":6535,"AVWKDY_ROOT":81,"AVSAT":4708,"AVSAT_ROOT":69,"AVSUN":3661,"AVSUN_ROOT":61,"TOTAL":2120945,"TOTAL_ROOT":1456 ,"Route":"2"},
{"Station_name":"Nostrand Av","Latitude":40.680438,"Longitude":-73.950426,"AVWKDY":13898,"AVWKDY_ROOT":118,"AVSAT":9986,"AVSAT_ROOT":100,"AVSUN":6887,"AVSUN_ROOT":83,"TOTAL":4459344,"TOTAL_ROOT":2112 ,"Route":"A"},
{"Station_name":"Nostrand Av","Latitude":40.669847,"Longitude":-73.950466,"AVWKDY":3965,"AVWKDY_ROOT":63,"AVSAT":2666,"AVSAT_ROOT":52,"AVSUN":1875,"AVSUN_ROOT":43,"TOTAL":1264329,"TOTAL_ROOT":1124 ,"Route":"3"},
{"Station_name":"Winthrop St","Latitude":40.656652,"Longitude":-73.9502,"AVWKDY":6107,"AVWKDY_ROOT":78,"AVSAT":2747,"AVSAT_ROOT":52,"AVSUN":1914,"AVSUN_ROOT":44,"TOTAL":1811033,"TOTAL_ROOT":1346 ,"Route":"2"},
{"Station_name":"Flushing Av","Latitude":40.700377,"Longitude":-73.950234,"AVWKDY":2020,"AVWKDY_ROOT":45,"AVSAT":924,"AVSAT_ROOT":30,"AVSUN":749,"AVSUN_ROOT":27,"TOTAL":605843,"TOTAL_ROOT":778 ,"Route":"G"},
{"Station_name":"Broadway","Latitude":40.706092,"Longitude":-73.950308,"AVWKDY":3223,"AVWKDY_ROOT":57,"AVSAT":1774,"AVSAT_ROOT":42,"AVSUN":1412,"AVSUN_ROOT":38,"TOTAL":994410,"TOTAL_ROOT":997 ,"Route":"G"},
{"Station_name":"President St","Latitude":40.667883,"Longitude":-73.950683,"AVWKDY":3111,"AVWKDY_ROOT":56,"AVSAT":1653,"AVSAT_ROOT":41,"AVSUN":1159,"AVSUN_ROOT":34,"TOTAL":951213,"TOTAL_ROOT":975 ,"Route":"2"},
{"Station_name":"Sterling St","Latitude":40.662742,"Longitude":-73.95085,"AVWKDY":5419,"AVWKDY_ROOT":74,"AVSAT":3499,"AVSAT_ROOT":59,"AVSUN":2397,"AVSUN_ROOT":49,"TOTAL":1706821,"TOTAL_ROOT":1306 ,"Route":"2"},
{"Station_name":"Nassau Av","Latitude":40.724635,"Longitude":-73.951277,"AVWKDY":6875,"AVWKDY_ROOT":83,"AVSAT":3797,"AVSAT_ROOT":62,"AVSUN":2486,"AVSUN_ROOT":50,"TOTAL":2092116,"TOTAL_ROOT":1446 ,"Route":"G"},
{"Station_name":"145th St","Latitude":40.826551,"Longitude":-73.95036,"AVWKDY":7679,"AVWKDY_ROOT":88,"AVSAT":6313,"AVSAT_ROOT":79,"AVSUN":4879,"AVSUN_ROOT":70,"TOTAL":2570212,"TOTAL_ROOT":1603 ,"Route":"1"},
{"Station_name":"96th St","Latitude":40.785672,"Longitude":-73.95107,"AVWKDY":22029,"AVWKDY_ROOT":148,"AVSAT":9374,"AVSAT_ROOT":97,"AVSUN":7009,"AVSUN_ROOT":84,"TOTAL":6497773,"TOTAL_ROOT":2549 ,"Route":"6"},
{"Station_name":"Metropolitan Av","Latitude":40.712792,"Longitude":-73.951418,"AVWKDY":8785,"AVWKDY_ROOT":94,"AVSAT":6059,"AVSAT_ROOT":78,"AVSUN":4593,"AVSUN_ROOT":68,"TOTAL":2814750,"TOTAL_ROOT":1678 ,"Route":"G"},
{"Station_name":"Hewes St","Latitude":40.70687,"Longitude":-73.953431,"AVWKDY":1478,"AVWKDY_ROOT":38,"AVSAT":896,"AVSAT_ROOT":30,"AVSUN":872,"AVSUN_ROOT":30,"TOTAL":473727,"TOTAL_ROOT":688 ,"Route":"J"},
{"Station_name":"125th St","Latitude":40.811109,"Longitude":-73.952343,"AVWKDY":18857,"AVWKDY_ROOT":137,"AVSAT":14105,"AVSAT_ROOT":119,"AVSUN":10368,"AVSUN_ROOT":102,"TOTAL":6131145,"TOTAL_ROOT":2476 ,"Route":"A"},
{"Station_name":"110th St-Central Park North","Latitude":40.799075,"Longitude":-73.951822,"AVWKDY":6298,"AVWKDY_ROOT":79,"AVSAT":4562,"AVSAT_ROOT":68,"AVSUN":3570,"AVSUN_ROOT":60,"TOTAL":2049550,"TOTAL_ROOT":1432 ,"Route":"2"},
{"Station_name":"Roosevelt Island","Latitude":40.759145,"Longitude":-73.95326,"AVWKDY":4431,"AVWKDY_ROOT":67,"AVSAT":2996,"AVSAT_ROOT":55,"AVSUN":2425,"AVSUN_ROOT":49,"TOTAL":1425557,"TOTAL_ROOT":1194 ,"Route":"F"},
{"Station_name":"Bedford-Nostrand Avs","Latitude":40.689627,"Longitude":-73.953522,"AVWKDY":3611,"AVWKDY_ROOT":60,"AVSAT":1855,"AVSAT_ROOT":43,"AVSUN":1379,"AVSUN_ROOT":37,"TOTAL":1095782,"TOTAL_ROOT":1047 ,"Route":"G"},
{"Station_name":"Vernon Blvd-Jackson Av","Latitude":40.742626,"Longitude":-73.953581,"AVWKDY":6156,"AVWKDY_ROOT":78,"AVSAT":2934,"AVSAT_ROOT":54,"AVSUN":2090,"AVSUN_ROOT":46,"TOTAL":1844675,"TOTAL_ROOT":1358 ,"Route":"7"},
{"Station_name":"Greenpoint Av","Latitude":40.731352,"Longitude":-73.954449,"AVWKDY":7818,"AVWKDY_ROOT":88,"AVSAT":4454,"AVSAT_ROOT":67,"AVSUN":2967,"AVSUN_ROOT":54,"TOTAL":2396391,"TOTAL_ROOT":1548 ,"Route":"G"},
{"Station_name":"137th St-City College","Latitude":40.822008,"Longitude":-73.953676,"AVWKDY":12984,"AVWKDY_ROOT":114,"AVSAT":9211,"AVSAT_ROOT":96,"AVSUN":7011,"AVSUN_ROOT":84,"TOTAL":4188337,"TOTAL_ROOT":2047 ,"Route":"1"},
{"Station_name":"Sheepshead Bay","Latitude":40.586896,"Longitude":-73.954155,"AVWKDY":12990,"AVWKDY_ROOT":114,"AVSAT":5670,"AVSAT_ROOT":75,"AVSUN":4171,"AVSUN_ROOT":65,"TOTAL":3841843,"TOTAL_ROOT":1960 ,"Route":"B"},
{"Station_name":"116th St","Latitude":40.805085,"Longitude":-73.954882,"AVWKDY":4325,"AVWKDY_ROOT":66,"AVSAT":2867,"AVSAT_ROOT":54,"AVSUN":2305,"AVSUN_ROOT":48,"TOTAL":1384208,"TOTAL_ROOT":1177 ,"Route":"B"},
{"Station_name":"Neck Rd","Latitude":40.595246,"Longitude":-73.955161,"AVWKDY":3563,"AVWKDY_ROOT":60,"AVSAT":1826,"AVSAT_ROOT":43,"AVSUN":1444,"AVSUN_ROOT":38,"TOTAL":1085044,"TOTAL_ROOT":1042 ,"Route":"B"},
{"Station_name":"86th St","Latitude":40.779492,"Longitude":-73.955589,"AVWKDY":54672,"AVWKDY_ROOT":234,"AVSAT":32970,"AVSAT_ROOT":182,"AVSUN":24048,"AVSUN_ROOT":155,"TOTAL":16996098,"TOTAL_ROOT":4123 ,"Route":"4"},
{"Station_name":"Av U","Latitude":40.5993,"Longitude":-73.955929,"AVWKDY":6921,"AVWKDY_ROOT":83,"AVSAT":4323,"AVSAT_ROOT":66,"AVSUN":3577,"AVSUN_ROOT":60,"TOTAL":2193807,"TOTAL_ROOT":1481 ,"Route":"B"},
{"Station_name":"Franklin Av","Latitude":40.68138,"Longitude":-73.956848,"AVWKDY":4385,"AVWKDY_ROOT":66,"AVSAT":3242,"AVSAT_ROOT":57,"AVSUN":2575,"AVSUN_ROOT":51,"TOTAL":1436567,"TOTAL_ROOT":1199 ,"Route":"A"},
{"Station_name":"Bedford Av","Latitude":40.717304,"Longitude":-73.956872,"AVWKDY":12774,"AVWKDY_ROOT":113,"AVSAT":10162,"AVSAT_ROOT":101,"AVSUN":8093,"AVSUN_ROOT":90,"TOTAL":4246411,"TOTAL_ROOT":2061 ,"Route":"L"},
{"Station_name":"Kings Highway","Latitude":40.60867,"Longitude":-73.957734,"AVWKDY":16766,"AVWKDY_ROOT":129,"AVSAT":7305,"AVSAT_ROOT":85,"AVSUN":6174,"AVSUN_ROOT":79,"TOTAL":5004061,"TOTAL_ROOT":2237 ,"Route":"B"},
{"Station_name":"Franklin Av","Latitude":40.670682,"Longitude":-73.958131,"AVWKDY":11732,"AVWKDY_ROOT":108,"AVSAT":7480,"AVSAT_ROOT":86,"AVSUN":5419,"AVSUN_ROOT":74,"TOTAL":3723729,"TOTAL_ROOT":1930 ,"Route":"1"},
{"Station_name":"Cathedral Parkway-110th St","Latitude":40.800605,"Longitude":-73.958158,"AVWKDY":5259,"AVWKDY_ROOT":73,"AVSAT":3479,"AVSAT_ROOT":59,"AVSUN":2745,"AVSUN_ROOT":52,"TOTAL":1678898,"TOTAL_ROOT":1296 ,"Route":"B"},
{"Station_name":"125th St","Latitude":40.815581,"Longitude":-73.958372,"AVWKDY":6282,"AVWKDY_ROOT":79,"AVSAT":4698,"AVSAT_ROOT":69,"AVSUN":3660,"AVSUN_ROOT":60,"TOTAL":2055499,"TOTAL_ROOT":1434 ,"Route":"1"},
{"Station_name":"Marcy Av","Latitude":40.708359,"Longitude":-73.957757,"AVWKDY":6323,"AVWKDY_ROOT":80,"AVSAT":3535,"AVSAT_ROOT":59,"AVSUN":2980,"AVSUN_ROOT":55,"TOTAL":1967312,"TOTAL_ROOT":1403 ,"Route":"J"},
{"Station_name":"Av M","Latitude":40.617618,"Longitude":-73.959399,"AVWKDY":5492,"AVWKDY_ROOT":74,"AVSAT":1979,"AVSAT_ROOT":44,"AVSUN":1979,"AVSUN_ROOT":44,"TOTAL":1615247,"TOTAL_ROOT":1271 ,"Route":"B"},
{"Station_name":"Brighton Beach","Latitude":40.577621,"Longitude":-73.961376,"AVWKDY":10862,"AVWKDY_ROOT":104,"AVSAT":6549,"AVSAT_ROOT":81,"AVSUN":5856,"AVSUN_ROOT":77,"TOTAL":3443081,"TOTAL_ROOT":1856 ,"Route":"B"},
{"Station_name":"77th St","Latitude":40.77362,"Longitude":-73.959874,"AVWKDY":31913,"AVWKDY_ROOT":179,"AVSAT":15663,"AVSAT_ROOT":125,"AVSUN":11489,"AVSUN_ROOT":107,"TOTAL":9591457,"TOTAL_ROOT":3097 ,"Route":"6"},
{"Station_name":"Classon Av","Latitude":40.688873,"Longitude":-73.96007,"AVWKDY":2774,"AVWKDY_ROOT":53,"AVSAT":1779,"AVSAT_ROOT":42,"AVSUN":1362,"AVSUN_ROOT":37,"TOTAL":877937,"TOTAL_ROOT":937 ,"Route":"G"},
{"Station_name":"Parkside Av","Latitude":40.655292,"Longitude":-73.961495,"AVWKDY":5394,"AVWKDY_ROOT":73,"AVSAT":3772,"AVSAT_ROOT":61,"AVSUN":2965,"AVSUN_ROOT":54,"TOTAL":1743762,"TOTAL_ROOT":1321 ,"Route":"B"},
{"Station_name":"Av J","Latitude":40.625039,"Longitude":-73.960803,"AVWKDY":5878,"AVWKDY_ROOT":77,"AVSAT":2893,"AVSAT_ROOT":54,"AVSUN":2842,"AVSUN_ROOT":53,"TOTAL":1811791,"TOTAL_ROOT":1346 ,"Route":"B"},
{"Station_name":"103rd St","Latitude":40.796092,"Longitude":-73.961454,"AVWKDY":4223,"AVWKDY_ROOT":65,"AVSAT":2852,"AVSAT_ROOT":53,"AVSUN":2354,"AVSUN_ROOT":49,"TOTAL":1360123,"TOTAL_ROOT":1166 ,"Route":"B"},
{"Station_name":"Av H","Latitude":40.62927,"Longitude":-73.961639,"AVWKDY":2523,"AVWKDY_ROOT":50,"AVSAT":1503,"AVSAT_ROOT":39,"AVSUN":1212,"AVSUN_ROOT":35,"TOTAL":790631,"TOTAL_ROOT":889 ,"Route":"B"},
{"Station_name":"Prospect Park","Latitude":40.661614,"Longitude":-73.962246,"AVWKDY":7363,"AVWKDY_ROOT":86,"AVSAT":5298,"AVSAT_ROOT":73,"AVSUN":4148,"AVSUN_ROOT":64,"TOTAL":2397513,"TOTAL_ROOT":1548 ,"Route":"B"},
{"Station_name":"Newkirk Av","Latitude":40.635082,"Longitude":-73.962793,"AVWKDY":9174,"AVWKDY_ROOT":96,"AVSAT":5479,"AVSAT_ROOT":74,"AVSUN":4150,"AVSUN_ROOT":64,"TOTAL":2862955,"TOTAL_ROOT":1692 ,"Route":"B"},
{"Station_name":"Church Av","Latitude":40.650527,"Longitude":-73.962982,"AVWKDY":15883,"AVWKDY_ROOT":126,"AVSAT":10406,"AVSAT_ROOT":102,"AVSUN":7640,"AVSUN_ROOT":87,"TOTAL":5030954,"TOTAL_ROOT":2243 ,"Route":"B"},
{"Station_name":"116th St-Columbia University","Latitude":40.807722,"Longitude":-73.96411,"AVWKDY":14007,"AVWKDY_ROOT":118,"AVSAT":7893,"AVSAT_ROOT":89,"AVSUN":5890,"AVSUN_ROOT":77,"TOTAL":4315048,"TOTAL_ROOT":2077 ,"Route":"1"},
{"Station_name":"Cortelyou Rd","Latitude":40.640927,"Longitude":-73.963891,"AVWKDY":5495,"AVWKDY_ROOT":74,"AVSAT":3445,"AVSAT_ROOT":59,"AVSUN":2720,"AVSUN_ROOT":52,"TOTAL":1737000,"TOTAL_ROOT":1318 ,"Route":"B"},
{"Station_name":"68th St-Hunter College","Latitude":40.768141,"Longitude":-73.96387,"AVWKDY":33856,"AVWKDY_ROOT":184,"AVSAT":13225,"AVSAT_ROOT":115,"AVSUN":9429,"AVSUN_ROOT":97,"TOTAL":9837416,"TOTAL_ROOT":3136 ,"Route":"6"},
{"Station_name":"96th St","Latitude":40.791646,"Longitude":-73.964699,"AVWKDY":7492,"AVWKDY_ROOT":87,"AVSAT":3196,"AVSAT_ROOT":57,"AVSUN":2487,"AVSUN_ROOT":50,"TOTAL":2216182,"TOTAL_ROOT":1489 ,"Route":"B"},
{"Station_name":"Beverly Rd","Latitude":40.644031,"Longitude":-73.964492,"AVWKDY":2765,"AVWKDY_ROOT":53,"AVSAT":1686,"AVSAT_ROOT":41,"AVSUN":1334,"AVSUN_ROOT":37,"TOTAL":869742,"TOTAL_ROOT":933 ,"Route":"B"},
{"Station_name":"Clinton-Washington Avs","Latitude":40.688089,"Longitude":-73.966839,"AVWKDY":3813,"AVWKDY_ROOT":62,"AVSAT":2497,"AVSAT_ROOT":50,"AVSUN":1811,"AVSUN_ROOT":43,"TOTAL":1204231,"TOTAL_ROOT":1097 ,"Route":"G"},
{"Station_name":"Cathedral Parkway-110th St","Latitude":40.803967,"Longitude":-73.966847,"AVWKDY":13037,"AVWKDY_ROOT":114,"AVSAT":9866,"AVSAT_ROOT":99,"AVSUN":7736,"AVSUN_ROOT":88,"TOTAL":4280205,"TOTAL_ROOT":2069 ,"Route":"1"},
{"Station_name":"Lexington Av","Latitude":40.764627,"Longitude":-73.96611,"AVWKDY":3827,"AVWKDY_ROOT":62,"AVSAT":2730,"AVSAT_ROOT":52,"AVSUN":2180,"AVSUN_ROOT":47,"TOTAL":1239510,"TOTAL_ROOT":1113 ,"Route":"F"},
{"Station_name":"Clinton & Washington Avs","Latitude":40.683263,"Longitude":-73.965838,"AVWKDY":4377,"AVWKDY_ROOT":66,"AVSAT":2849,"AVSAT_ROOT":53,"AVSUN":2091,"AVSUN_ROOT":46,"TOTAL":1383247,"TOTAL_ROOT":1176 ,"Route":"C"},
{"Station_name":"59th St","Latitude":40.762526,"Longitude":-73.967967,"AVWKDY":56591,"AVWKDY_ROOT":238,"AVSAT":31931,"AVSAT_ROOT":179,"AVSUN":21635,"AVSUN_ROOT":147,"TOTAL":17300862,"TOTAL_ROOT":4159 ,"Route":"N"},
{"Station_name":"Ocean Parkway","Latitude":40.576312,"Longitude":-73.968501,"AVWKDY":2844,"AVWKDY_ROOT":53,"AVSAT":1755,"AVSAT_ROOT":42,"AVSUN":1599,"AVSUN_ROOT":40,"TOTAL":907353,"TOTAL_ROOT":953 ,"Route":"Q"},
{"Station_name":"103rd St","Latitude":40.799446,"Longitude":-73.968379,"AVWKDY":12445,"AVWKDY_ROOT":112,"AVSAT":8680,"AVSAT_ROOT":93,"AVSUN":6752,"AVSUN_ROOT":82,"TOTAL":4012609,"TOTAL_ROOT":2003 ,"Route":"1"},
{"Station_name":"86th St","Latitude":40.785868,"Longitude":-73.968916,"AVWKDY":9460,"AVWKDY_ROOT":97,"AVSAT":4105,"AVSAT_ROOT":64,"AVSUN":3206,"AVSUN_ROOT":57,"TOTAL":2804933,"TOTAL_ROOT":1675 ,"Route":"B"},
{"Station_name":"Eastern Parkway-Brooklyn Museum","Latitude":40.671987,"Longitude":-73.964375,"AVWKDY":4460,"AVWKDY_ROOT":67,"AVSAT":3436,"AVSAT_ROOT":59,"AVSUN":2489,"AVSUN_ROOT":50,"TOTAL":1458428,"TOTAL_ROOT":1208 ,"Route":"2"},
{"Station_name":"Grand Army Plaza","Latitude":40.675235,"Longitude":-73.971046,"AVWKDY":8254,"AVWKDY_ROOT":91,"AVSAT":4678,"AVSAT_ROOT":68,"AVSUN":3685,"AVSUN_ROOT":61,"TOTAL":2567916,"TOTAL_ROOT":1602 ,"Route":"2"},
{"Station_name":"Lexington Av-53rd St","Latitude":40.757552,"Longitude":-73.969055,"AVWKDY":69871,"AVWKDY_ROOT":264,"AVSAT":20035,"AVSAT_ROOT":142,"AVSUN":13624,"AVSUN_ROOT":117,"TOTAL":19603483,"TOTAL_ROOT":4428 ,"Route":"E"},
{"Station_name":"81st St - Museum of Natural History","Latitude":40.781433,"Longitude":-73.972143,"AVWKDY":9852,"AVWKDY_ROOT":99,"AVSAT":6912,"AVSAT_ROOT":83,"AVSUN":5450,"AVSUN_ROOT":74,"TOTAL":3181389,"TOTAL_ROOT":1784 ,"Route":"B"},
{"Station_name":"96th St","Latitude":40.793919,"Longitude":-73.972323,"AVWKDY":32246,"AVWKDY_ROOT":180,"AVSAT":22780,"AVSAT_ROOT":151,"AVSUN":17870,"AVSUN_ROOT":134,"TOTAL":10421716,"TOTAL_ROOT":3228 ,"Route":"1"},
{"Station_name":"Kings Highway","Latitude":40.603217,"Longitude":-73.972361,"AVWKDY":3731,"AVWKDY_ROOT":61,"AVSAT":2215,"AVSAT_ROOT":47,"AVSUN":1941,"AVSUN_ROOT":44,"TOTAL":1176295,"TOTAL_ROOT":1085 ,"Route":"F"},
{"Station_name":"5th Av","Latitude":40.764811,"Longitude":-73.973347,"AVWKDY":15608,"AVWKDY_ROOT":125,"AVSAT":7422,"AVSAT_ROOT":86,"AVSUN":5547,"AVSUN_ROOT":74,"TOTAL":4681025,"TOTAL_ROOT":2164 ,"Route":"N"},
{"Station_name":"Bergen St","Latitude":40.680829,"Longitude":-73.975098,"AVWKDY":3748,"AVWKDY_ROOT":61,"AVSAT":1997,"AVSAT_ROOT":45,"AVSUN":1607,"AVSUN_ROOT":40,"TOTAL":1150448,"TOTAL_ROOT":1073 ,"Route":"2"},
{"Station_name":"Av U","Latitude":40.596063,"Longitude":-73.973357,"AVWKDY":2371,"AVWKDY_ROOT":49,"AVSAT":1161,"AVSAT_ROOT":34,"AVSUN":970,"AVSUN_ROOT":31,"TOTAL":720386,"TOTAL_ROOT":849 ,"Route":"F"},
{"Station_name":"Av P","Latitude":40.608944,"Longitude":-73.973022,"AVWKDY":2989,"AVWKDY_ROOT":55,"AVSAT":1513,"AVSAT_ROOT":39,"AVSUN":1379,"AVSUN_ROOT":37,"TOTAL":919610,"TOTAL_ROOT":959 ,"Route":"F"},
{"Station_name":"Av N","Latitude":40.61514,"Longitude":-73.974197,"AVWKDY":3508,"AVWKDY_ROOT":59,"AVSAT":1459,"AVSAT_ROOT":38,"AVSUN":1347,"AVSUN_ROOT":37,"TOTAL":1046714,"TOTAL_ROOT":1023 ,"Route":"F"},
{"Station_name":"Av X","Latitude":40.58962,"Longitude":-73.97425,"AVWKDY":3102,"AVWKDY_ROOT":56,"AVSAT":1384,"AVSAT_ROOT":37,"AVSUN":1146,"AVSUN_ROOT":34,"TOTAL":928461,"TOTAL_ROOT":964 ,"Route":"F"},
{"Station_name":"Neptune Av-Van Siclen","Latitude":40.581011,"Longitude":-73.974574,"AVWKDY":1852,"AVWKDY_ROOT":43,"AVSAT":745,"AVSAT_ROOT":27,"AVSUN":586,"AVSUN_ROOT":24,"TOTAL":544204,"TOTAL_ROOT":738 ,"Route":"F"},
{"Station_name":"Bay Parkway-22nd Av","Latitude":40.620769,"Longitude":-73.975264,"AVWKDY":1367,"AVWKDY_ROOT":37,"AVSAT":723,"AVSAT_ROOT":27,"AVSUN":643,"AVSUN_ROOT":25,"TOTAL":422274,"TOTAL_ROOT":650 ,"Route":"F"},
{"Station_name":"Fort Hamilton Parkway","Latitude":40.650782,"Longitude":-73.975776,"AVWKDY":3974,"AVWKDY_ROOT":63,"AVSAT":2192,"AVSAT_ROOT":47,"AVSUN":1621,"AVSUN_ROOT":40,"TOTAL":1218642,"TOTAL_ROOT":1104 ,"Route":"F"},
{"Station_name":"Lafayette Av","Latitude":40.686113,"Longitude":-73.973946,"AVWKDY":3930,"AVWKDY_ROOT":63,"AVSAT":2661,"AVSAT_ROOT":52,"AVSUN":2001,"AVSUN_ROOT":45,"TOTAL":1253523,"TOTAL_ROOT":1120 ,"Route":"C"},
{"Station_name":"Fulton St","Latitude":40.687119,"Longitude":-73.975375,"AVWKDY":2334,"AVWKDY_ROOT":48,"AVSAT":1060,"AVSAT_ROOT":33,"AVSUN":757,"AVSUN_ROOT":28,"TOTAL":692588,"TOTAL_ROOT":832 ,"Route":"G"},
{"Station_name":"5th Av-53rd St","Latitude":40.760167,"Longitude":-73.975224,"AVWKDY":31141,"AVWKDY_ROOT":176,"AVSAT":4033,"AVSAT_ROOT":64,"AVSUN":2527,"AVSUN_ROOT":50,"TOTAL":8278472,"TOTAL_ROOT":2877 ,"Route":"E"},
{"Station_name":"72nd St","Latitude":40.775594,"Longitude":-73.97641,"AVWKDY":6737,"AVWKDY_ROOT":82,"AVSAT":4339,"AVSAT_ROOT":66,"AVSUN":3876,"AVSUN_ROOT":62,"TOTAL":2165933,"TOTAL_ROOT":1472 ,"Route":"B"},
{"Station_name":"Av I","Latitude":40.625322,"Longitude":-73.976127,"AVWKDY":2758,"AVWKDY_ROOT":53,"AVSAT":1115,"AVSAT_ROOT":33,"AVSUN":1157,"AVSUN_ROOT":34,"TOTAL":826442,"TOTAL_ROOT":909 ,"Route":"F"},
{"Station_name":"86th St","Latitude":40.788644,"Longitude":-73.976218,"AVWKDY":18421,"AVWKDY_ROOT":136,"AVSAT":11087,"AVSAT_ROOT":105,"AVSUN":8935,"AVSUN_ROOT":95,"TOTAL":5781073,"TOTAL_ROOT":2404 ,"Route":"1"},
{"Station_name":"18th Av","Latitude":40.629755,"Longitude":-73.976971,"AVWKDY":3964,"AVWKDY_ROOT":63,"AVSAT":2092,"AVSAT_ROOT":46,"AVSUN":2076,"AVSUN_ROOT":46,"TOTAL":1238326,"TOTAL_ROOT":1113 ,"Route":"F"},
{"Station_name":"57th St","Latitude":40.763972,"Longitude":-73.97745,"AVWKDY":6336,"AVWKDY_ROOT":80,"AVSAT":2709,"AVSAT_ROOT":52,"AVSUN":1986,"AVSUN_ROOT":45,"TOTAL":1861664,"TOTAL_ROOT":1364 ,"Route":"F"},
{"Station_name":"Atlantic Av-Barclays Ctr","Latitude":40.684359,"Longitude":-73.977666,"AVWKDY":22378,"AVWKDY_ROOT":150,"AVSAT":11720,"AVSAT_ROOT":108,"AVSUN":9039,"AVSUN_ROOT":95,"TOTAL":6824355,"TOTAL_ROOT":2612 ,"Route":"B"},
{"Station_name":"West 8th St","Latitude":40.576127,"Longitude":-73.975939,"AVWKDY":2200,"AVWKDY_ROOT":47,"AVSAT":2025,"AVSAT_ROOT":45,"AVSUN":1977,"AVSUN_ROOT":44,"TOTAL":783586,"TOTAL_ROOT":885 ,"Route":"F"},
{"Station_name":"Grand Central-42nd St","Latitude":40.751776,"Longitude":-73.976848,"AVWKDY":143036,"AVWKDY_ROOT":378,"AVSAT":46074,"AVSAT_ROOT":215,"AVSUN":34773,"AVSUN_ROOT":186,"TOTAL":40800094,"TOTAL_ROOT":6387 ,"Route":"7"},
{"Station_name":"Ditmas Av","Latitude":40.636119,"Longitude":-73.978172,"AVWKDY":4712,"AVWKDY_ROOT":69,"AVSAT":2442,"AVSAT_ROOT":49,"AVSUN":2230,"AVSUN_ROOT":47,"TOTAL":1456372,"TOTAL_ROOT":1207 ,"Route":"F"},
{"Station_name":"86th St","Latitude":40.592721,"Longitude":-73.97823,"AVWKDY":1599,"AVWKDY_ROOT":40,"AVSAT":1014,"AVSAT_ROOT":32,"AVSUN":777,"AVSUN_ROOT":28,"TOTAL":504878,"TOTAL_ROOT":711 ,"Route":"N"},
{"Station_name":"Av U","Latitude":40.597473,"Longitude":-73.979137,"AVWKDY":2190,"AVWKDY_ROOT":47,"AVSAT":1355,"AVSAT_ROOT":37,"AVSUN":1079,"AVSUN_ROOT":33,"TOTAL":690175,"TOTAL_ROOT":831 ,"Route":"N"},
{"Station_name":"Church Av","Latitude":40.644041,"Longitude":-73.979678,"AVWKDY":9192,"AVWKDY_ROOT":96,"AVSAT":5904,"AVSAT_ROOT":77,"AVSUN":4714,"AVSUN_ROOT":69,"TOTAL":2920039,"TOTAL_ROOT":1709 ,"Route":"F"},
{"Station_name":"Prospect Park-15 St","Latitude":40.660365,"Longitude":-73.979493,"AVWKDY":5507,"AVWKDY_ROOT":74,"AVSAT":3423,"AVSAT_ROOT":59,"AVSUN":2600,"AVSUN_ROOT":51,"TOTAL":1729841,"TOTAL_ROOT":1315 ,"Route":"F"},
{"Station_name":"57th St","Latitude":40.764664,"Longitude":-73.980658,"AVWKDY":26646,"AVWKDY_ROOT":163,"AVSAT":13989,"AVSAT_ROOT":118,"AVSUN":10629,"AVSUN_ROOT":103,"TOTAL":8123781,"TOTAL_ROOT":2850 ,"Route":"N"},
{"Station_name":"79th St","Latitude":40.783934,"Longitude":-73.979917,"AVWKDY":16063,"AVWKDY_ROOT":127,"AVSAT":11094,"AVSAT_ROOT":105,"AVSUN":8934,"AVSUN_ROOT":95,"TOTAL":5182170,"TOTAL_ROOT":2276 ,"Route":"1"},
{"Station_name":"Kings Highway","Latitude":40.603923,"Longitude":-73.980353,"AVWKDY":3030,"AVWKDY_ROOT":55,"AVSAT":1789,"AVSAT_ROOT":42,"AVSUN":1442,"AVSUN_ROOT":38,"TOTAL":947757,"TOTAL_ROOT":974 ,"Route":"N"},
{"Station_name":"47-50th Sts Rockefeller Center","Latitude":40.758663,"Longitude":-73.981329,"AVWKDY":61678,"AVWKDY_ROOT":248,"AVSAT":20518,"AVSAT_ROOT":143,"AVSUN":14056,"AVSUN_ROOT":119,"TOTAL":17591014,"TOTAL_ROOT":4194 ,"Route":"B"},
{"Station_name":"7th Av","Latitude":40.762862,"Longitude":-73.981637,"AVWKDY":13307,"AVWKDY_ROOT":115,"AVSAT":4427,"AVSAT_ROOT":67,"AVSUN":3440,"AVSUN_ROOT":59,"TOTAL":3816125,"TOTAL_ROOT":1953 ,"Route":"B"},
{"Station_name":"Stillwell Av","Latitude":40.577422,"Longitude":-73.981233,"AVWKDY":10756,"AVWKDY_ROOT":104,"AVSAT":9809,"AVSAT_ROOT":99,"AVSUN":8639,"AVSUN_ROOT":93,"TOTAL":3763352,"TOTAL_ROOT":1940 ,"Route":"D"},
{"Station_name":"7th Av","Latitude":40.666271,"Longitude":-73.980305,"AVWKDY":10846,"AVWKDY_ROOT":104,"AVSAT":6715,"AVSAT_ROOT":82,"AVSUN":5238,"AVSUN_ROOT":72,"TOTAL":3411415,"TOTAL_ROOT":1847 ,"Route":"F"},
{"Station_name":"59th St-Columbus Circle","Latitude":40.768247,"Longitude":-73.981929,"AVWKDY":52802,"AVWKDY_ROOT":230,"AVSAT":29751,"AVSAT_ROOT":172,"AVSUN":23253,"AVSUN_ROOT":152,"TOTAL":16324078,"TOTAL_ROOT":4040 ,"Route":"A"},
{"Station_name":"33rd St","Latitude":40.746081,"Longitude":-73.982076,"AVWKDY":28434,"AVWKDY_ROOT":169,"AVSAT":10226,"AVSAT_ROOT":101,"AVSUN":7059,"AVSUN_ROOT":84,"TOTAL":8178813,"TOTAL_ROOT":2860 ,"Route":"6"},
{"Station_name":"7th Av","Latitude":40.67705,"Longitude":-73.972367,"AVWKDY":7709,"AVWKDY_ROOT":88,"AVSAT":5596,"AVSAT_ROOT":75,"AVSUN":4884,"AVSUN_ROOT":70,"TOTAL":2530853,"TOTAL_ROOT":1591 ,"Route":"B"},
{"Station_name":"Bay Parkway-22nd Av","Latitude":40.611815,"Longitude":-73.981848,"AVWKDY":4034,"AVWKDY_ROOT":64,"AVSAT":2341,"AVSAT_ROOT":48,"AVSUN":1871,"AVSUN_ROOT":43,"TOTAL":1256959,"TOTAL_ROOT":1121 ,"Route":"N"},
{"Station_name":"72nd St","Latitude":40.778453,"Longitude":-73.98197,"AVWKDY":31331,"AVWKDY_ROOT":177,"AVSAT":23685,"AVSAT_ROOT":154,"AVSUN":19578,"AVSUN_ROOT":140,"TOTAL":10328830,"TOTAL_ROOT":3214 ,"Route":"1"},
{"Station_name":"66th St-Lincoln Center","Latitude":40.77344,"Longitude":-73.982209,"AVWKDY":21467,"AVWKDY_ROOT":147,"AVSAT":12788,"AVSAT_ROOT":113,"AVSUN":9173,"AVSUN_ROOT":96,"TOTAL":6663749,"TOTAL_ROOT":2581 ,"Route":"1"},
{"Station_name":"42nd St","Latitude":40.754222,"Longitude":-73.984569,"AVWKDY":44486,"AVWKDY_ROOT":211,"AVSAT":16651,"AVSAT_ROOT":129,"AVSUN":10829,"AVSUN_ROOT":104,"TOTAL":12822010,"TOTAL_ROOT":3581 ,"Route":"B"},
{"Station_name":"Nevins St","Latitude":40.688246,"Longitude":-73.980492,"AVWKDY":12884,"AVWKDY_ROOT":114,"AVSAT":8522,"AVSAT_ROOT":92,"AVSUN":4414,"AVSUN_ROOT":66,"TOTAL":3977784,"TOTAL_ROOT":1994 ,"Route":"2"},
{"Station_name":"1st Av","Latitude":40.730953,"Longitude":-73.981628,"AVWKDY":14425,"AVWKDY_ROOT":120,"AVSAT":9105,"AVSAT_ROOT":95,"AVSUN":7387,"AVSUN_ROOT":86,"TOTAL":4574737,"TOTAL_ROOT":2139 ,"Route":"L"},
{"Station_name":"Union St","Latitude":40.677316,"Longitude":-73.98311,"AVWKDY":5069,"AVWKDY_ROOT":71,"AVSAT":2845,"AVSAT_ROOT":53,"AVSUN":2205,"AVSUN_ROOT":47,"TOTAL":1564847,"TOTAL_ROOT":1251 ,"Route":"R"},
{"Station_name":"49th St","Latitude":40.759901,"Longitude":-73.984139,"AVWKDY":23124,"AVWKDY_ROOT":152,"AVSAT":11539,"AVSAT_ROOT":107,"AVSUN":8174,"AVSUN_ROOT":90,"TOTAL":6956349,"TOTAL_ROOT":2637 ,"Route":"N"},
{"Station_name":"50th St","Latitude":40.761728,"Longitude":-73.983849,"AVWKDY":26731,"AVWKDY_ROOT":163,"AVSAT":11688,"AVSAT_ROOT":108,"AVSUN":9227,"AVSUN_ROOT":96,"TOTAL":7945115,"TOTAL_ROOT":2819 ,"Route":"1"},
{"Station_name":"28th St","Latitude":40.74307,"Longitude":-73.984264,"AVWKDY":21991,"AVWKDY_ROOT":148,"AVSAT":8275,"AVSAT_ROOT":91,"AVSUN":5888,"AVSUN_ROOT":77,"TOTAL":6366076,"TOTAL_ROOT":2523 ,"Route":"6"},
{"Station_name":"Bay 50th St","Latitude":40.588841,"Longitude":-73.983765,"AVWKDY":2439,"AVWKDY_ROOT":49,"AVSAT":961,"AVSAT_ROOT":31,"AVSUN":717,"AVSUN_ROOT":27,"TOTAL":712530,"TOTAL_ROOT":844 ,"Route":"D"},
{"Station_name":"20th Av","Latitude":40.61741,"Longitude":-73.985026,"AVWKDY":3139,"AVWKDY_ROOT":56,"AVSAT":1481,"AVSAT_ROOT":38,"AVSUN":1182,"AVSUN_ROOT":34,"TOTAL":944065,"TOTAL_ROOT":972 ,"Route":"N"},
{"Station_name":"Hoyt & Schermerhorn","Latitude":40.688484,"Longitude":-73.985001,"AVWKDY":8783,"AVWKDY_ROOT":94,"AVSAT":4739,"AVSAT_ROOT":69,"AVSUN":2721,"AVSUN_ROOT":52,"TOTAL":2637290,"TOTAL_ROOT":1624 ,"Route":"A"},
{"Station_name":"Hoyt St","Latitude":40.690545,"Longitude":-73.985065,"AVWKDY":6623,"AVWKDY_ROOT":81,"AVSAT":3681,"AVSAT_ROOT":61,"AVSUN":1845,"AVSUN_ROOT":43,"TOTAL":1983805,"TOTAL_ROOT":1408 ,"Route":"2"},
{"Station_name":"50th St","Latitude":40.762456,"Longitude":-73.985984,"AVWKDY":16036,"AVWKDY_ROOT":127,"AVSAT":7962,"AVSAT_ROOT":89,"AVSUN":6307,"AVSUN_ROOT":79,"TOTAL":4862746,"TOTAL_ROOT":2205 ,"Route":"C"},
{"Station_name":"23rd St","Latitude":40.739864,"Longitude":-73.986599,"AVWKDY":30265,"AVWKDY_ROOT":174,"AVSAT":9890,"AVSAT_ROOT":99,"AVSUN":6787,"AVSUN_ROOT":82,"TOTAL":8600995,"TOTAL_ROOT":2933 ,"Route":"6"},
{"Station_name":"DeKalb Av","Latitude":40.690635,"Longitude":-73.981824,"AVWKDY":14984,"AVWKDY_ROOT":122,"AVSAT":8352,"AVSAT_ROOT":91,"AVSUN":5377,"AVSUN_ROOT":73,"TOTAL":4555544,"TOTAL_ROOT":2134 ,"Route":"B"},
{"Station_name":"Times Square-42nd St","Latitude":40.754672,"Longitude":-73.986754,"AVWKDY":161409,"AVWKDY_ROOT":402,"AVSAT":108725,"AVSAT_ROOT":330,"AVSUN":87227,"AVSUN_ROOT":295,"TOTAL":51817684,"TOTAL_ROOT":7198 ,"Route":"A"},
{"Station_name":"York St","Latitude":40.699743,"Longitude":-73.986885,"AVWKDY":3538,"AVWKDY_ROOT":59,"AVSAT":1906,"AVSAT_ROOT":44,"AVSUN":1410,"AVSUN_ROOT":38,"TOTAL":1081694,"TOTAL_ROOT":1040 ,"Route":"F"},
{"Station_name":"3rd Av","Latitude":40.732849,"Longitude":-73.986122,"AVWKDY":3991,"AVWKDY_ROOT":63,"AVSAT":2891,"AVSAT_ROOT":54,"AVSUN":2312,"AVSUN_ROOT":48,"TOTAL":1300193,"TOTAL_ROOT":1140 ,"Route":"L"},
{"Station_name":"25th Av","Latitude":40.597704,"Longitude":-73.986829,"AVWKDY":3898,"AVWKDY_ROOT":62,"AVSAT":1587,"AVSAT_ROOT":40,"AVSUN":1202,"AVSUN_ROOT":35,"TOTAL":1144425,"TOTAL_ROOT":1070 ,"Route":"D"},
{"Station_name":"Jay St - Borough Hall","Latitude":40.692338,"Longitude":-73.987342,"AVWKDY":29031,"AVWKDY_ROOT":170,"AVSAT":12122,"AVSAT_ROOT":110,"AVSUN":7294,"AVSUN_ROOT":85,"TOTAL":8433757,"TOTAL_ROOT":2904 ,"Route":"A"},
{"Station_name":"34th St","Latitude":40.749567,"Longitude":-73.98795,"AVWKDY":113922,"AVWKDY_ROOT":338,"AVSAT":63952,"AVSAT_ROOT":253,"AVSUN":42380,"AVSUN_ROOT":206,"TOTAL":34800309,"TOTAL_ROOT":5899 ,"Route":"B"},
{"Station_name":"Delancey St","Latitude":40.718611,"Longitude":-73.988114,"AVWKDY":14124,"AVWKDY_ROOT":119,"AVSAT":9373,"AVSAT_ROOT":97,"AVSUN":7432,"AVSUN_ROOT":86,"TOTAL":4513142,"TOTAL_ROOT":2124 ,"Route":"F"},
{"Station_name":"2nd Av","Latitude":40.723402,"Longitude":-73.989938,"AVWKDY":11715,"AVWKDY_ROOT":108,"AVSAT":8680,"AVSAT_ROOT":93,"AVSUN":7148,"AVSUN_ROOT":85,"TOTAL":3845891,"TOTAL_ROOT":1961 ,"Route":"F"},
{"Station_name":"9th St","Latitude":40.670847,"Longitude":-73.988302,"AVWKDY":8672,"AVWKDY_ROOT":93,"AVSAT":5707,"AVSAT_ROOT":76,"AVSUN":4165,"AVSUN_ROOT":65,"TOTAL":2743284,"TOTAL_ROOT":1656 ,"Route":"F"},
{"Station_name":"28th St","Latitude":40.69218,"Longitude":-73.985942,"AVWKDY":7379,"AVWKDY_ROOT":86,"AVSAT":4164,"AVSAT_ROOT":65,"AVSUN":2557,"AVSUN_ROOT":51,"TOTAL":2240432,"TOTAL_ROOT":1497 ,"Route":"A"},
{"Station_name":"18th Av","Latitude":40.620671,"Longitude":-73.990414,"AVWKDY":3565,"AVWKDY_ROOT":60,"AVSAT":2530,"AVSAT_ROOT":50,"AVSUN":2034,"AVSUN_ROOT":45,"TOTAL":1156288,"TOTAL_ROOT":1075 ,"Route":"N"},
{"Station_name":"23rd St","Latitude":40.741303,"Longitude":-73.989344,"AVWKDY":12589,"AVWKDY_ROOT":112,"AVSAT":5173,"AVSAT_ROOT":72,"AVSUN":3742,"AVSUN_ROOT":61,"TOTAL":3685543,"TOTAL_ROOT":1920 ,"Route":"N"},
{"Station_name":"Court St","Latitude":40.6941,"Longitude":-73.991777,"AVWKDY":35250,"AVWKDY_ROOT":188,"AVSAT":12950,"AVSAT_ROOT":114,"AVSUN":8985,"AVSUN_ROOT":95,"TOTAL":10154126,"TOTAL_ROOT":3187 ,"Route":"R"},
{"Station_name":"High St","Latitude":40.699337,"Longitude":-73.990531,"AVWKDY":5137,"AVWKDY_ROOT":72,"AVSAT":3254,"AVSAT_ROOT":57,"AVSUN":2506,"AVSUN_ROOT":50,"TOTAL":1621599,"TOTAL_ROOT":1273 ,"Route":"A"},
{"Station_name":"East Broadway","Latitude":40.713715,"Longitude":-73.990173,"AVWKDY":13566,"AVWKDY_ROOT":116,"AVSAT":8127,"AVSAT_ROOT":90,"AVSUN":7390,"AVSUN_ROOT":86,"TOTAL":4307356,"TOTAL_ROOT":2075 ,"Route":"F"},
{"Station_name":"Bergen St","Latitude":40.755983,"Longitude":-73.986229,"AVWKDY":8404,"AVWKDY_ROOT":92,"AVSAT":5464,"AVSAT_ROOT":74,"AVSUN":4315,"AVSUN_ROOT":66,"TOTAL":2670029,"TOTAL_ROOT":1634 ,"Route":"A"},
{"Station_name":"14th St-Union Square","Latitude":40.692404,"Longitude":-73.990151,"AVWKDY":82939,"AVWKDY_ROOT":288,"AVSAT":53106,"AVSAT_ROOT":230,"AVSUN":38582,"AVSUN_ROOT":196,"TOTAL":26068141,"TOTAL_ROOT":5106 ,"Route":"R"},
{"Station_name":"34th St","Latitude":40.750373,"Longitude":-73.991057,"AVWKDY":86727,"AVWKDY_ROOT":294,"AVSAT":44214,"AVSAT_ROOT":210,"AVSUN":33790,"AVSUN_ROOT":184,"TOTAL":26331838,"TOTAL_ROOT":5131 ,"Route":"1"},
{"Station_name":"Astor Place","Latitude":40.730054,"Longitude":-73.99107,"AVWKDY":20013,"AVWKDY_ROOT":141,"AVSAT":13715,"AVSAT_ROOT":117,"AVSUN":10557,"AVSUN_ROOT":103,"TOTAL":6408554,"TOTAL_ROOT":2532 ,"Route":"6"},
{"Station_name":"Grand St","Latitude":40.711926,"Longitude":-73.94067,"AVWKDY":18019,"AVWKDY_ROOT":134,"AVSAT":14995,"AVSAT_ROOT":122,"AVSUN":12925,"AVSUN_ROOT":114,"TOTAL":6120697,"TOTAL_ROOT":2474 ,"Route":"S"},
{"Station_name":"8th St","Latitude":40.730328,"Longitude":-73.992629,"AVWKDY":12888,"AVWKDY_ROOT":114,"AVSAT":9712,"AVSAT_ROOT":99,"AVSUN":7609,"AVSUN_ROOT":87,"TOTAL":4220951,"TOTAL_ROOT":2054 ,"Route":"N"},
{"Station_name":"23rd St","Latitude":40.742878,"Longitude":-73.992821,"AVWKDY":20621,"AVWKDY_ROOT":144,"AVSAT":8584,"AVSAT_ROOT":93,"AVSUN":5956,"AVSUN_ROOT":77,"TOTAL":6028814,"TOTAL_ROOT":2455 ,"Route":"F"},
{"Station_name":"Bowery","Latitude":40.72028,"Longitude":-73.993915,"AVWKDY":1151,"AVWKDY_ROOT":34,"AVSAT":812,"AVSAT_ROOT":28,"AVSUN":674,"AVSUN_ROOT":26,"TOTAL":374381,"TOTAL_ROOT":612 ,"Route":"J"},
{"Station_name":"Prospect Av","Latitude":40.665414,"Longitude":-73.992872,"AVWKDY":4973,"AVWKDY_ROOT":71,"AVSAT":3068,"AVSAT_ROOT":55,"AVSUN":2273,"AVSUN_ROOT":48,"TOTAL":1557172,"TOTAL_ROOT":1248 ,"Route":"R"},
{"Station_name":"Clark St","Latitude":40.697466,"Longitude":-73.993086,"AVWKDY":4020,"AVWKDY_ROOT":63,"AVSAT":2955,"AVSAT_ROOT":54,"AVSUN":2331,"AVSUN_ROOT":48,"TOTAL":1312498,"TOTAL_ROOT":1146 ,"Route":"2"},
{"Station_name":"28th St","Latitude":40.747215,"Longitude":-73.993365,"AVWKDY":12237,"AVWKDY_ROOT":111,"AVSAT":4711,"AVSAT_ROOT":69,"AVSUN":2867,"AVSUN_ROOT":54,"TOTAL":3521210,"TOTAL_ROOT":1876 ,"Route":"1"},
{"Station_name":"34th St","Latitude":40.752287,"Longitude":-73.993391,"AVWKDY":76651,"AVWKDY_ROOT":277,"AVSAT":31426,"AVSAT_ROOT":177,"AVSUN":25882,"AVSUN_ROOT":161,"TOTAL":22637540,"TOTAL_ROOT":4758 ,"Route":"A"},
{"Station_name":"Bay Parkway","Latitude":40.601875,"Longitude":-73.993728,"AVWKDY":5986,"AVWKDY_ROOT":77,"AVSAT":2787,"AVSAT_ROOT":53,"AVSUN":2241,"AVSUN_ROOT":47,"TOTAL":1799643,"TOTAL_ROOT":1342 ,"Route":"D"},
{"Station_name":"Fort Hamilton Parkway","Latitude":40.640914,"Longitude":-73.994304,"AVWKDY":3727,"AVWKDY_ROOT":61,"AVSAT":1818,"AVSAT_ROOT":43,"AVSUN":1544,"AVSUN_ROOT":39,"TOTAL":1134934,"TOTAL_ROOT":1065 ,"Route":"D"},
{"Station_name":"50th St","Latitude":40.63626,"Longitude":-73.994791,"AVWKDY":3324,"AVWKDY_ROOT":58,"AVSAT":1123,"AVSAT_ROOT":34,"AVSUN":1279,"AVSUN_ROOT":36,"TOTAL":980036,"TOTAL_ROOT":990 ,"Route":"D"},
{"Station_name":"Carroll St","Latitude":40.680303,"Longitude":-73.995048,"AVWKDY":8856,"AVWKDY_ROOT":94,"AVSAT":5186,"AVSAT_ROOT":72,"AVSUN":3653,"AVSUN_ROOT":60,"TOTAL":2733229,"TOTAL_ROOT":1653 ,"Route":"F"},
{"Station_name":"9th Av","Latitude":40.646292,"Longitude":-73.994324,"AVWKDY":4826,"AVWKDY_ROOT":69,"AVSAT":2178,"AVSAT_ROOT":47,"AVSUN":1704,"AVSUN_ROOT":41,"TOTAL":1443383,"TOTAL_ROOT":1201 ,"Route":"D"},
{"Station_name":"55th St","Latitude":40.631435,"Longitude":-73.995476,"AVWKDY":2329,"AVWKDY_ROOT":48,"AVSAT":778,"AVSAT_ROOT":28,"AVSUN":898,"AVSUN_ROOT":30,"TOTAL":686402,"TOTAL_ROOT":828 ,"Route":"D"},
{"Station_name":"Bleecker St","Latitude":40.725915,"Longitude":-73.994659,"AVWKDY":28191,"AVWKDY_ROOT":168,"AVSAT":19530,"AVSAT_ROOT":140,"AVSUN":14576,"AVSUN_ROOT":121,"TOTAL":9021857,"TOTAL_ROOT":3004 ,"Route":"B"},
{"Station_name":"23rd St","Latitude":40.744081,"Longitude":-73.995657,"AVWKDY":14591,"AVWKDY_ROOT":121,"AVSAT":8321,"AVSAT_ROOT":91,"AVSUN":6374,"AVSUN_ROOT":80,"TOTAL":4507936,"TOTAL_ROOT":2123 ,"Route":"1"},
{"Station_name":"Spring St","Latitude":40.722301,"Longitude":-73.997141,"AVWKDY":9103,"AVWKDY_ROOT":95,"AVSAT":6813,"AVSAT_ROOT":83,"AVSUN":4969,"AVSUN_ROOT":70,"TOTAL":2953540,"TOTAL_ROOT":1719 ,"Route":"6"},
{"Station_name":"Smith-9th St","Latitude":40.67358,"Longitude":-73.995959,"AVWKDY":3474,"AVWKDY_ROOT":59,"AVSAT":2323,"AVSAT_ROOT":48,"AVSUN":1747,"AVSUN_ROOT":42,"TOTAL":1105885,"TOTAL_ROOT":1052 ,"Route":"F"},
{"Station_name":"New Utrecht Av","Latitude":40.624842,"Longitude":-73.996353,"AVWKDY":3977,"AVWKDY_ROOT":63,"AVSAT":2903,"AVSAT_ROOT":54,"AVSUN":2258,"AVSUN_ROOT":48,"TOTAL":1293021,"TOTAL_ROOT":1137 ,"Route":"D"},
{"Station_name":"Prince St","Latitude":40.724329,"Longitude":-73.997702,"AVWKDY":8989,"AVWKDY_ROOT":95,"AVSAT":7888,"AVSAT_ROOT":89,"AVSUN":5745,"AVSUN_ROOT":76,"TOTAL":3024876,"TOTAL_ROOT":1739 ,"Route":"N"},
{"Station_name":"18th St","Latitude":40.74104,"Longitude":-73.997871,"AVWKDY":8586,"AVWKDY_ROOT":93,"AVSAT":4110,"AVSAT_ROOT":64,"AVSUN":3040,"AVSUN_ROOT":55,"TOTAL":2572880,"TOTAL_ROOT":1604 ,"Route":"1"},
{"Station_name":"14th St","Latitude":40.738228,"Longitude":-73.996209,"AVWKDY":42048,"AVWKDY_ROOT":205,"AVSAT":25881,"AVSAT_ROOT":161,"AVSUN":20521,"AVSUN_ROOT":143,"TOTAL":13215582,"TOTAL_ROOT":3635 ,"Route":"F"},
{"Station_name":"20th Av","Latitude":40.604556,"Longitude":-73.998168,"AVWKDY":4159,"AVWKDY_ROOT":64,"AVSAT":2064,"AVSAT_ROOT":45,"AVSUN":1724,"AVSUN_ROOT":42,"TOTAL":1266071,"TOTAL_ROOT":1125 ,"Route":"D"},
{"Station_name":"25th St","Latitude":40.660397,"Longitude":-73.998091,"AVWKDY":3380,"AVWKDY_ROOT":58,"AVSAT":2215,"AVSAT_ROOT":47,"AVSUN":1668,"AVSUN_ROOT":41,"TOTAL":1073103,"TOTAL_ROOT":1036 ,"Route":"R"},
{"Station_name":"23rd St","Latitude":40.745906,"Longitude":-73.998041,"AVWKDY":18024,"AVWKDY_ROOT":134,"AVSAT":9390,"AVSAT_ROOT":97,"AVSUN":6676,"AVSUN_ROOT":82,"TOTAL":5461246,"TOTAL_ROOT":2337 ,"Route":"C"},
{"Station_name":"71st St","Latitude":40.619589,"Longitude":-73.998864,"AVWKDY":4207,"AVWKDY_ROOT":65,"AVSAT":1586,"AVSAT_ROOT":40,"AVSUN":1168,"AVSUN_ROOT":34,"TOTAL":1222810,"TOTAL_ROOT":1106 ,"Route":"D"},
{"Station_name":"79th St","Latitude":40.613501,"Longitude":-74.00061,"AVWKDY":4732,"AVWKDY_ROOT":69,"AVSAT":1777,"AVSAT_ROOT":42,"AVSUN":1385,"AVSUN_ROOT":37,"TOTAL":1377616,"TOTAL_ROOT":1174 ,"Route":"D"},
{"Station_name":"City Hall","Latitude":40.713282,"Longitude":-74.006978,"AVWKDY":8927,"AVWKDY_ROOT":94,"AVSAT":3170,"AVSAT_ROOT":56,"AVSUN":2080,"AVSUN_ROOT":46,"TOTAL":2555465,"TOTAL_ROOT":1599 ,"Route":"R"},
{"Station_name":"Canal St","Latitude":40.718803,"Longitude":-74.000193,"AVWKDY":39561,"AVWKDY_ROOT":199,"AVSAT":35884,"AVSAT_ROOT":189,"AVSUN":28599,"AVSUN_ROOT":169,"TOTAL":13578273,"TOTAL_ROOT":3685 ,"Route":"J"},
{"Station_name":"West 4th St","Latitude":40.732338,"Longitude":-74.000495,"AVWKDY":37820,"AVWKDY_ROOT":194,"AVSAT":29059,"AVSAT_ROOT":170,"AVSUN":23017,"AVSUN_ROOT":152,"TOTAL":12450239,"TOTAL_ROOT":3528 ,"Route":"A"},
{"Station_name":"18th Av","Latitude":40.607954,"Longitude":-73.976971,"AVWKDY":4291,"AVWKDY_ROOT":66,"AVSAT":1941,"AVSAT_ROOT":44,"AVSUN":1458,"AVSUN_ROOT":38,"TOTAL":1278318,"TOTAL_ROOT":1131 ,"Route":"F"},
{"Station_name":"8th Av","Latitude":40.739777,"Longitude":-74.002578,"AVWKDY":26662,"AVWKDY_ROOT":163,"AVSAT":14219,"AVSAT_ROOT":119,"AVSUN":11113,"AVSUN_ROOT":105,"TOTAL":8159405,"TOTAL_ROOT":2856 ,"Route":"A"},
{"Station_name":"Christopher St","Latitude":40.733422,"Longitude":-74.002906,"AVWKDY":12327,"AVWKDY_ROOT":111,"AVSAT":10109,"AVSAT_ROOT":101,"AVSUN":8657,"AVSUN_ROOT":93,"TOTAL":4159712,"TOTAL_ROOT":2040 ,"Route":"1"},
{"Station_name":"Spring St","Latitude":40.726227,"Longitude":-74.003739,"AVWKDY":9371,"AVWKDY_ROOT":97,"AVSAT":4036,"AVSAT_ROOT":64,"AVSUN":2867,"AVSUN_ROOT":54,"TOTAL":2756454,"TOTAL_ROOT":1660 ,"Route":"C"},
{"Station_name":"36th St","Latitude":40.655144,"Longitude":-74.003549,"AVWKDY":9266,"AVWKDY_ROOT":96,"AVSAT":5823,"AVSAT_ROOT":76,"AVSUN":3844,"AVSUN_ROOT":62,"TOTAL":2884490,"TOTAL_ROOT":1698 ,"Route":"N"},
{"Station_name":"Houston St","Latitude":40.728251,"Longitude":-74.005367,"AVWKDY":14668,"AVWKDY_ROOT":121,"AVSAT":4432,"AVSAT_ROOT":67,"AVSUN":3272,"AVSUN_ROOT":57,"TOTAL":4149401,"TOTAL_ROOT":2037 ,"Route":"1"},
{"Station_name":"Canal St","Latitude":40.720824,"Longitude":-74.005229,"AVWKDY":17392,"AVWKDY_ROOT":132,"AVSAT":7831,"AVSAT_ROOT":88,"AVSUN":5643,"AVSUN_ROOT":75,"TOTAL":5152150,"TOTAL_ROOT":2270 ,"Route":"A"},
{"Station_name":"Chambers St","Latitude":40.713243,"Longitude":-74.003401,"AVWKDY":34696,"AVWKDY_ROOT":186,"AVSAT":9482,"AVSAT_ROOT":97,"AVSUN":6167,"AVSUN_ROOT":79,"TOTAL":9671286,"TOTAL_ROOT":3110 ,"Route":"J"},
{"Station_name":"Canal St","Latitude":40.722854,"Longitude":-74.006277,"AVWKDY":6337,"AVWKDY_ROOT":80,"AVSAT":3063,"AVSAT_ROOT":55,"AVSUN":2178,"AVSUN_ROOT":47,"TOTAL":1895864,"TOTAL_ROOT":1377 ,"Route":"1"},
{"Station_name":"Fort Hamilton Parkway","Latitude":40.631386,"Longitude":-74.005351,"AVWKDY":4325,"AVWKDY_ROOT":66,"AVSAT":2237,"AVSAT_ROOT":47,"AVSUN":1667,"AVSUN_ROOT":41,"TOTAL":1313755,"TOTAL_ROOT":1146 ,"Route":"N"},
{"Station_name":"Franklin St","Latitude":40.719318,"Longitude":-74.006886,"AVWKDY":7001,"AVWKDY_ROOT":84,"AVSAT":2267,"AVSAT_ROOT":48,"AVSUN":1736,"AVSUN_ROOT":42,"TOTAL":1997511,"TOTAL_ROOT":1413 ,"Route":"1"},
{"Station_name":"Broadway-Nassau","Latitude":40.710197,"Longitude":-74.007691,"AVWKDY":62192,"AVWKDY_ROOT":249,"AVSAT":18782,"AVSAT_ROOT":137,"AVSUN":12347,"AVSUN_ROOT":111,"TOTAL":17517708,"TOTAL_ROOT":4185 ,"Route":"A"},
{"Station_name":"Park Place","Latitude":40.713051,"Longitude":-74.008811,"AVWKDY":1942,"AVWKDY_ROOT":44,"AVSAT":1273,"AVSAT_ROOT":36,"AVSUN":966,"AVSUN_ROOT":31,"TOTAL":617390,"TOTAL_ROOT":786 ,"Route":"A"},
{"Station_name":"Wall St","Latitude":40.706821,"Longitude":-74.0091,"AVWKDY":27192,"AVWKDY_ROOT":165,"AVSAT":3139,"AVSAT_ROOT":56,"AVSUN":2097,"AVSUN_ROOT":46,"TOTAL":7195174,"TOTAL_ROOT":2682 ,"Route":"2"},
{"Station_name":"45th St","Latitude":40.648939,"Longitude":-74.010006,"AVWKDY":6469,"AVWKDY_ROOT":80,"AVSAT":4710,"AVSAT_ROOT":69,"AVSUN":3819,"AVSUN_ROOT":62,"TOTAL":2112871,"TOTAL_ROOT":1454 ,"Route":"R"},
{"Station_name":"Chambers St","Latitude":40.715478,"Longitude":-74.009266,"AVWKDY":15697,"AVWKDY_ROOT":125,"AVSAT":5856,"AVSAT_ROOT":77,"AVSUN":3881,"AVSUN_ROOT":62,"TOTAL":4518907,"TOTAL_ROOT":2126 ,"Route":"1"},
{"Station_name":"8th Av","Latitude":40.635064,"Longitude":-74.011719,"AVWKDY":5958,"AVWKDY_ROOT":77,"AVSAT":3961,"AVSAT_ROOT":63,"AVSUN":3652,"AVSUN_ROOT":60,"TOTAL":1936527,"TOTAL_ROOT":1392 ,"Route":"N"},
{"Station_name":"Broad St","Latitude":40.706476,"Longitude":-74.011056,"AVWKDY":7863,"AVWKDY_ROOT":89,"AVSAT":267,"AVSAT_ROOT":16,"AVSUN":115,"AVSUN_ROOT":11,"TOTAL":2017217,"TOTAL_ROOT":1420 ,"Route":"J"},
{"Station_name":"Cortlandt St","Latitude":40.710668,"Longitude":-74.011029,"AVWKDY":13509,"AVWKDY_ROOT":116,"AVSAT":4887,"AVSAT_ROOT":70,"AVSUN":3356,"AVSUN_ROOT":58,"TOTAL":3890324,"TOTAL_ROOT":1972 ,"Route":"R"},
{"Station_name":"Cortlandt St","Latitude":40.710668,"Longitude":-74.011029,"AVWKDY":18993,"AVWKDY_ROOT":138,"AVSAT":7975,"AVSAT_ROOT":89,"AVSUN":5808,"AVSUN_ROOT":76,"TOTAL":5586383,"TOTAL_ROOT":2364 ,"Route":"R"},
{"Station_name":"Wall St","Latitude":40.707557,"Longitude":-74.011862,"AVWKDY":22955,"AVWKDY_ROOT":152,"AVSAT":4209,"AVSAT_ROOT":65,"AVSUN":2889,"AVSUN_ROOT":54,"TOTAL":6221822,"TOTAL_ROOT":2494 ,"Route":"4"},
{"Station_name":"Chambers St","Latitude":40.714111,"Longitude":-74.008585,"AVWKDY":47599,"AVWKDY_ROOT":218,"AVSAT":15776,"AVSAT_ROOT":126,"AVSUN":9747,"AVSUN_ROOT":99,"TOTAL":13514172,"TOTAL_ROOT":3676 ,"Route":"A"},
{"Station_name":"Rector St","Latitude":40.70722,"Longitude":-74.013342,"AVWKDY":6712,"AVWKDY_ROOT":82,"AVSAT":2063,"AVSAT_ROOT":45,"AVSUN":1497,"AVSUN_ROOT":39,"TOTAL":1903269,"TOTAL_ROOT":1380 ,"Route":"R"},
{"Station_name":"Whitehall St","Latitude":40.703087,"Longitude":-74.012994,"AVWKDY":14249,"AVWKDY_ROOT":119,"AVSAT":4336,"AVSAT_ROOT":66,"AVSUN":3378,"AVSUN_ROOT":58,"TOTAL":4051648,"TOTAL_ROOT":2013 ,"Route":"R"},
{"Station_name":"Rector St","Latitude":40.707513,"Longitude":-74.013783,"AVWKDY":3431,"AVWKDY_ROOT":59,"AVSAT":864,"AVSAT_ROOT":29,"AVSUN":604,"AVSUN_ROOT":25,"TOTAL":953412,"TOTAL_ROOT":976 ,"Route":"1"},
{"Station_name":"53rd St","Latitude":40.645069,"Longitude":-74.014034,"AVWKDY":6945,"AVWKDY_ROOT":83,"AVSAT":4979,"AVSAT_ROOT":71,"AVSUN":3879,"AVSUN_ROOT":62,"TOTAL":2252045,"TOTAL_ROOT":1501 ,"Route":"R"},
{"Station_name":"Bowling Green","Latitude":40.704817,"Longitude":-74.014065,"AVWKDY":30081,"AVWKDY_ROOT":173,"AVSAT":10229,"AVSAT_ROOT":101,"AVSUN":7475,"AVSUN_ROOT":86,"TOTAL":8620774,"TOTAL_ROOT":2936 ,"Route":"4"},
{"Station_name":"South Ferry","Latitude":40.702068,"Longitude":-74.013664,"AVWKDY":10691,"AVWKDY_ROOT":103,"AVSAT":6479,"AVSAT_ROOT":80,"AVSUN":5221,"AVSUN_ROOT":72,"TOTAL":3370511,"TOTAL_ROOT":1836 ,"Route":"R"},
{"Station_name":"59th St","Latitude":40.641362,"Longitude":-74.017881,"AVWKDY":8798,"AVWKDY_ROOT":94,"AVSAT":5346,"AVSAT_ROOT":73,"AVSUN":4054,"AVSUN_ROOT":64,"TOTAL":2753443,"TOTAL_ROOT":1659 ,"Route":"N"},
{"Station_name":"Bay Ridge Av","Latitude":40.634967,"Longitude":-74.023377,"AVWKDY":6901,"AVWKDY_ROOT":83,"AVSAT":3860,"AVSAT_ROOT":62,"AVSUN":2964,"AVSUN_ROOT":54,"TOTAL":2129415,"TOTAL_ROOT":1459 ,"Route":"R"},
{"Station_name":"77th St","Latitude":40.629742,"Longitude":-74.02551,"AVWKDY":4467,"AVWKDY_ROOT":67,"AVSAT":2191,"AVSAT_ROOT":47,"AVSUN":1542,"AVSUN_ROOT":39,"TOTAL":1339993,"TOTAL_ROOT":1158 ,"Route":"R"},
{"Station_name":"86th St","Latitude":40.622687,"Longitude":-74.028398,"AVWKDY":8510,"AVWKDY_ROOT":92,"AVSAT":5463,"AVSAT_ROOT":74,"AVSUN":4060,"AVSUN_ROOT":64,"TOTAL":2682398,"TOTAL_ROOT":1638 ,"Route":"R"},
{"Station_name":"95th St","Latitude":40.616622,"Longitude":-74.030876,"AVWKDY":5116,"AVWKDY_ROOT":72,"AVSAT":2571,"AVSAT_ROOT":51,"AVSUN":1891,"AVSUN_ROOT":43,"TOTAL":1545541,"TOTAL_ROOT":1243 ,"Route":"R"},
{"Station_name":"Lawrence St","Latitude":40.718315,"Longitude":-73.987437,"AVWKDY":7345,"AVWKDY_ROOT":86,"AVSAT":1736,"AVSAT_ROOT":42,"AVSUN":943,"AVSUN_ROOT":31,"TOTAL":2012259,"TOTAL_ROOT":1419 ,"Route":"F"},
{"Station_name":"Aqueduct-North Conduit Av","Latitude":40.668234,"Longitude":-73.834058,"AVWKDY":781,"AVWKDY_ROOT":28,"AVSAT":417,"AVSAT_ROOT":20,"AVSUN":309,"AVSUN_ROOT":18,"TOTAL":238811,"TOTAL_ROOT":489 ,"Route":"A"}

];



