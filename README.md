# Before
  I am a new user of express framework. As php programmer before, I have too many uncomfortable when I use the express. Such as why I need to set up the route config? What's different between route and controller? Whatever, maybe it's seem not professional, but I just want to use it in my way.
  
# Express Tineeroute
  Tineeroute is a autoroute framework of Express framework. We needn't to write these  ``app.get('/what', whatHandler)`` code anymore. As we seen, we just need to set the path for scanning the route file and wait it done.
  
  And this project is based on stonecircle/express-autoroute project. I modified that to suit my style.
  
# Installatioin

    npm install tineeroute

# Usage

Only things you need to add into the entry file.

    var tineeroute = require('tineeroute');
    tineeroute(app,options);
    
Where app stands for the express app.


====================================
To Be Continue.