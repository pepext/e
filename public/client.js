// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  var mymap = L.map('mapid').setView([38.78,0.187], 14.3);

  L.tileLayer('https://api.mapbox.com/styles/v1/pepext/ciyukdiyw006w2sud8lovj90d/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVwZXh0IiwiYSI6ImNpeXVnemE1aTAwMWsycXJyYm5hNDB0MWMifQ.T56Y_P8iMZQ_KTbE0_Wdtg', {
		maxZoom: 28,
		attribution: '',
		id: 'mapbox.streets'
	}).addTo(mymap); // #13.9/38.776091/0.185247/66
  
  /*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 28,
		attribution: '',
		id: 'mapbox.streets'
	}).addTo(mymap);*/
  
  var marker = L.marker([38.774,0.188]).addTo(mymap);
  var circle = L.circle([38.783,0.180], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5
}    ).addTo(mymap);

   var polygon = L.polygon([
    [38.789444,0.180444]
    , [38.789443,0.180445]
     ,[38.789445,0.180446]
     
    ]).addTo(mymap);


  
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    
circle.bindPopup("I am a circle.");
polygon.bindPopup("<b>CTO</b><br>"+dream).openPopup();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});
