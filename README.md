
<h1 align='center'>
 Chat app - practice
</h1>

## Tech
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## Goals
Understand the concept enough to try and make a discord-like application

## Exploring
Socket.io, websockets in general, the backend artchitecture of a chat application

## Findings so far
- Websockets start with HTTP requests, which then turn into an open connection to keep real-time connection possible
- Socket.io might be abstracting some of this out but, when sending messages to different 'rooms' the connection is the same

The question to this might be, when scaling and/or you have connections from different parts of the world (in each room) whats the efficiency of this? 
It makes more sense in my head to have different connections for different rooms to allow stable connections. ** This is something i will be looking into.

- Intregating the db with emits is a bit confusing to me

Emitting a message from the frontend in itself is the API call, but when you join a 'room' you need to give (from the backend) a larger amount of messages as a response.
Is using the 'emit' feature on the socket the right way to respond? My gut tells me that a large amount of data transfer isn't ideal through the socket.
A small amount of messages seem fine, but what if we get into the weeds of allowing images? or videos?

<p>
  What I'm trying - Maybe i convert 'joining a room' into a HTTP request? and keep the emitting feature just to when messages are sent?
</p>

### .env file
```
DB_URL=supabase-url
DB_KEY=supabase-key
```
