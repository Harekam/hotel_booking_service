## Prerequisite for running the code locally (Development Environment):
- Node.js v8.9.4
- MongoDb v3.6.3

## Running the server
- Run command: "npm start" or "node server.js"
- Access "localhost:3000" or "http://localhost:3000/documentation" for documentation

## Future Scope / Todos
- For Test cases Mocha / Chai can be used.
- Error logging can be done with kibana and elasticsearch
- For adding new dates/days in inventory, a cron can run on daily basis which will add new day/date for each room.
- Booking management
- Support for multiple hotels.

## Other Details
- https://github.com/Harekam/manager_online_products for details like auto deployment scripts, test scripts etc., can be referred from this project.

## Solution to other points:
- Emphasis to be paid on concurrency handline i.e. handling the scenarios when multiple agents are updating same record at same time .
   - Depends on the business requirement either to lock it or keep the most updated one, right now things are done with Atomicity and most updated one record is kept.
- Scale is another challenge , lest say if this system is to be used by millions of agents for updating hotels data .
   - A lot of factors can be considered in this case, like size of data going in and out of the server, size of database increasing everyday, handling vertical/horizontal scaling. Apart from that, Atomicity and CAP theorem comes into the picture.