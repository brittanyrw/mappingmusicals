mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpdHRhbnlydyIsImEiOiJjajhvamE3dDYwM3UyMzNubmdoMnV4cjV3In0.sdA93qNfEKLfUEKrpz86Hg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/brittanyrw/cj9yzhuym82yq2skpp4v7n6kv',
  center: [-73.972080, 40.752226],
  zoom: 12.5
});

  map.on('load', 'tony-musicals', function (e) {

    buildLocationList(e);

    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
    });

    map.on('click', 'tony-musicals', function (e) {
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 11
        });

    });

    map.on('mouseenter', 'tony-musicals', function(e) {
        const data = e.features[0].properties;
        map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML("<h2>" + data.musical + "</h2>" + "<p> Tony " + " " + data.award + " " + data.winYear + "</p>" + "<p>" + data.description + "</p>" + "<p>" + data.setting + "</p>" + "<p>")
            .addTo(map);

    });

     map.on('mouseleave', 'tony-musicals', function () {
        map.getCanvas().style.cursor = '';
    });

     map.addControl(new mapboxgl.NavigationControl());

  });

  function flyToShow(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 14
      });
  }

  function filter() {
    var input = document.getElementsByClassName('item');
    var filter = document.getElementById('search').value.toLowerCase();
    for (i = 0; i < input.length; i++) {
        var currentItem = input[i];
        var currentListingItem = input[i].children[0]
        if (currentListingItem.innerHTML.toLowerCase().indexOf(filter) > -1) {
            currentItem.style.display = "";
        } else {
            currentItem.style.display = "none";
        }
      }
    }
  
  document.getElementById('search').addEventListener('keyup', filter);

  function buildLocationList(data) {
    for (i = 0; i < data.features.length; i++) {
      var currentFeature = data.features[i];
      var prop = currentFeature.properties;

      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = "listing-" + i;

      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.musical;

      var winYear = listing.appendChild(document.createElement('p'));
      winYear.className = 'award';
      winYear.innerHTML = "Tony " + prop.award + ", " + prop.winYear;  

      var description = listing.appendChild(document.createElement('p'));
      description.innerHTML = prop.description;

      link.addEventListener('click', function(e){
        var clickedListing = data.features[this.dataPosition];

        flyToShow(clickedListing);

      });
    }
  }
