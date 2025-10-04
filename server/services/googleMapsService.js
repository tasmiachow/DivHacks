// This file contains all our logic for interacting with Google Maps APIs.
require('dotenv').config();

const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

/**
 * Geocodes a human-readable address into latitude and longitude.
 */
async function geocodeAddress(address) {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 2000,
    });
    if (response.data.status === 'OK') {
      return response.data.results[0].geometry.location;
    } else {
      console.error(`Geocoding failed for "${address}":`, response.data.status);
      return null;
    }
  } catch (error) {
    console.error(`An error occurred while geocoding "${address}":`, error.message);
    return null;
  }
}

/**
 * Finds nearby places (cafes or restaurants) around a central location.
 */
async function findNearbyPlaces(location, type, radius = 1500) {
  try {
    const response = await client.placesNearby({
      params: {
        location: [location.lat, location.lng],
        radius: radius,
        type: type,
        key: process.env.GOOGLE_MAPS_API_KEY,
        rankby: 'prominence',
      },
      timeout: 2000,
    });
    if (response.data.status === 'OK') {
      return response.data.results.map(place => ({
        name: place.name,
        address: place.vicinity,
        rating: place.rating,
        location: place.geometry.location,
        place_id: place.place_id,
      }));
    } else {
      console.error('Nearby places search failed:', response.data.status);
      return [];
    }
  } catch (error) {
    console.error('An error occurred during nearby places search:', error.message);
    return [];
  }
}

/**
 * Calculates travel times from multiple origins to multiple destinations using public transit.
 */
async function getTravelTimes(origins, destinations) {
  try {
    const response = await client.distancematrix({
      params: {
        origins: origins,
        destinations: destinations,
        mode: 'transit', // This is key for NYC
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 5000, // This can be a slower API call
    });

    if (response.data.status === 'OK') {
      return response.data;
    } else {
      console.error('Distance Matrix request failed:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('An error occurred during Distance Matrix request:', error.message);
    return null;
  }
}

// Export all three functions so we can use them elsewhere
module.exports = { geocodeAddress, findNearbyPlaces, getTravelTimes };