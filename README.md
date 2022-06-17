# wakeskate-server

 Server/REST API for the Wakeskate web app.

## Introduction

This is a small REST API and server used to process requests for geocoding and weather data.

## Links

- Github - [https://github.com/LanceStasinski/wakeskate-server](https://github.com/LanceStasinski/wakeskate-server)
- Client Source Code - [https://github.com/LanceStasinski/Website-client](https://github.com/LanceStasinski/Website-client)
- Deployed - [https://wakeskate.herokuapp.com/](https://wakeskate.herokuapp.com/)

## Highlights

- Express used as the server framework
- Serves the client application
- Uses a custom algorithm to rate weather conditions based on temperature, wind speeds, and weather conditions
- Weather data from the Open Weather Map API
- Written with TypeScript

## Scripts

- `yarn start-dev` - start development server
- `yarn start` - start local production server
- `build` - compiles TypeScript to JavaScript

## Further Reading

- [Open Weather Map API](https://openweathermap.org/api)
- [Google Maps API](https://mapsplatform.google.com/)
