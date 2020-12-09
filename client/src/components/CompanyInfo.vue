<template>
<div id="root">

 <div id="dummyModal" role="dialog" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" class="close" @click.prevent="removeMap(mymap)">&times;</button>
            
          </div>
          <div class="modal-body">

            <div class="card-header" id="company-name">
    <!-- <span>Name</span><br> -->
    <span><img :src="this.companyLogo"  width= "100" height= "100"></span>
    {{this.companyName}}
    <span class="icon"><a :href="this.companyFacebook"><img src="../assets/facebook.png" width= "30" height= "30" ></a></span>
    <span class="icon"><a :href="this.companyTwitter"><img src="../assets/twitter.png" width= "30" height= "30"></a></span>
    <span class="icon"><a :href="this.companyLinkedin"><img src="../assets/linkedin.png" width= "30" height= "30"></a></span>
  </div>

  <div class = "table">

    <table class="table table-hover">

      <tbody>
        <tr>
          <th scope="row">Title</th>
          <td>{{this.companyTitle}}</td>
        </tr>

        <tr>
          <th scope="row">Date Founded</th>
          <td>{{this.companyFounded}}</td>
        </tr>

        <tr>
          <th scope="row">Industry</th>
          <td>{{this.companyIndustry}}</td>
        </tr>

         <tr>
          <th scope="row">Email</th>
          <td>{{this.companyEmail}}</td>
        </tr>

         <tr>
          <th scope="row">Website</th>
          <td>{{this.companyWebsite}}</td>
        </tr>

         <tr>
          <th scope="row">Description</th>
          <td>{{this.companyLongDescription}}</td>
        </tr>

         <tr>
          <th scope="row">Industry</th>
          <td>{{this.companyIndustry}}</td>
        </tr>

         <tr>
          <th scope="row">Company Type</th>
          <td>{{this.companyType}}</td>
        </tr>

         <tr>
          <th scope="row">Address</th>
          <td>{{this.companyAddress}}</td>
        </tr>

      </tbody>

    </table>

  </div>
            <!-- Map -->
            <div id="mapid"></div>

            <!-- Map Error -->
            <div id="error" class="tippy-tooltip honeybee-theme">

              <p><b>No API and APPLICATION_ID key inserted </b></p>
              <p><a target="_blank" href="http://docs.traveltimeplatform.com/overview/getting-keys/">Sign up for an API key</a>
              <p>Place it in API and APPLICATION_ID variables</p>

            </div>

          </div>
        
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-default" @click.prevent="removeMap(mymap)">Close</button>
          </div>
        </div>
      </div>
    </div>


<div class="card text-center">

  <div v-for="company in companydata" :key="company.objectID" >
  <div class="card-header" id="company-name">
    <span><img :src="company.logo"  width= "100" height= "100"></span>
    {{company.company_name}}
    <span class="icon"><a :href="company.facebookUrl"><img src="../assets/facebook.png" width= "30" height= "30" ></a></span>
    <span class="icon"><a :href="company.twitterUrl"><img src="../assets/twitter.png" width= "30" height= "30"></a></span>
    <span class="icon"><a :href="company.linkedinUrl"><img src="../assets/linkedin.png" width= "30" height= "30"></a></span>
  </div>
  <div class="card-body">
    <br>
    
    <h5 class="card-title">{{company.title_}}</h5>
    <p>{{company.Short_description}}</p>
    <div class="box">
      <span class="specialties__parent">Specialties</span><br>
      <span class="specialties">{{company.specialties[0]}}</span>,
    
    <br>
  
    </div>

    <br>
    <a href="#" class="btn btn-primary" @click.prevent="itemClicked(company)">Read More</a>
    </div>
    <br>
    <br>
    <br>
  </div>

</div>


</div>
</template>

<script>

import jsondata from '../../public/front-end_data.json';
import $ from 'jquery';
import L from 'leaflet';

// import { LMap, LTileLayer, LMarker } from 'leaflet';

export default {
    data() {
      return {
        companydata: '',
        companyName: '',
        companyTitle: '',
        companyFounded: '',
        companyIndustry: '',
        companyEmail: '',
        companyWebsite: '',
        companyLongDescription: '',
        companyAddress: '',
        companySpecialities: '',
        companyGeoCoverage: '',
        companyType: '',
        companyFacebook: '',
        companyTwitter: '',
        companyLinkedin: '',
        companyLogo: '',
           
      }
    },

    beforeMount() {
       this.companydata = jsondata
    },

     // Methods
  methods: {

  itemClicked: function(company) {
    this.companyName = company.company_name;
    this.companyTitle = company.title_;
    this.companyFounded = company.founded;
    this.companyIndustry = company.industry;
    this.companyEmail = company.email;
    this.companyWebsite = company.website_;
    this.companyLongDescription = company.Long_description;
    this.companyAddress = company.companyAddress;
    this.companySpecialities = company.specialties;
    this.companyGeoCoverage = company.Geo_coverage;
    this.companyLogo = company.logo;
    this.companyFacebook = company.facebookUrl;
    this.companyLinkedIn = company.linkedinUrl;
    this.companyTwitter = company.twitterUrl;
    this.companyType = company.type;
    
  
    // Leaflet.js Map Implementation
    var locationName = `${this.companyAddress}`;
     
        var APPLICATION_ID = "41e8da28";
        var API_KEY = "34dc6dce9f6c86837572a6980ac1327e";

        let sendGeocodingRequest = function(locationName) {
            return fetch(`https://api.traveltimeapp.com/v4/geocoding/search?query= + ${locationName}`, {
                    method: "GET",
                    credentials: "same-origin", 
                    headers: {
                        "Content-Type": "application/json",
                        "X-Application-Id": APPLICATION_ID,
                        "X-Api-Key": API_KEY,
                        "Accept-Language": "en-US"
                    }

                })
                .then(response => response.json()); // parses JSON response into native Javascript objects 
        }


        ///sending request    
        sendGeocodingRequest(locationName)
        .then(function(data){ drawMarker(data) }) 
        .catch(function(error) {
                if(APPLICATION_ID === "place your app id here" || API_KEY ===  "place your api key here") {
                  document.getElementById("error").style.display = "block";
                }
                console.error(error )
            });
            
            function drawMarker(response) {
            let coordinates = response.features[0].geometry.coordinates;
            
            let latLng = L.latLng([coordinates[1], coordinates[0]]);
            
            let osmUrl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=c19cab8eb4c4498a9ee7cba41ceb73fa'

            let osmTileLayer = L.tileLayer(osmUrl, {
              minZoom: 8,
              maxZoom: 15
            });

            let container = L.DomUtil.get('mapid');
            
            if (container != null) {
              
              container._leaflet_id = null;

              let exactlatlong = Object.values(latLng);
              

              let map = L.map("mapid").addLayer(osmTileLayer);
              
              map.setView(exactlatlong, 11);

              var marker = L.marker(exactlatlong).addTo(map);
            
              map.addLayer(marker)
           

            }
            
          
        }



    
    $('#dummyModal').modal('show');
  },

  }


}
</script>

<style >
.card-text {
    color: red
}
.box {
  position: relative;
}
.card-img-top, .logo {
  position: absolute;
  right: 10px;

  width: 200px;
  height: 200px
}
.specialties {
/* color: blue; */
text-transform: capitalize;

}

.specialties__parent {
/* color: blue; */
 text-decoration: underline;
 font-size: 25px;
}

.card-header {
  background-color: #007bff important!;
  font-size: 40px;
};
#company_name {
  background-color:#007bff;
}

#mapid {
            height: 300px;
            width: 450px;
            padding: 0;
            margin: 0;
        }
        
        #error {
            position: absolute;
            width: 80%;
            margin: 0px;
            z-index: 2000;
            width: 270px;
            border-radius: 5px;
            max-width: 500px;
            font-family: sans-serif;
            font-size: 12px;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 10px;
            display: none;
            text-align: center;
        }

</style>