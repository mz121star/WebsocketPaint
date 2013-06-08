/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app),
    io = require('socket.io').listen(server);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
    socket.emit('draw', { hello:'world' });
    socket.on('draw', function (data) {
        console.log(data);
        socket.broadcast.emit('draw', data);
    });
    socket.on('set nickname', function (name) {
        socket.set('nickname', name, function () {

            //socket.broadcast.emit('add user',socket.manager.roomClients);
            socket.emit('add user', socket.manager.roomClients);
            socket.broadcast.emit('add user', socket.manager.roomClients);
            //console.log(socket);
        });
    });
    socket.on("msg", function (data) {
        if (data.id) {
            io.sockets.socket(data.id).emit("msg", socket.store.data.nickname + "<span style='color: green'>对你说：</span>" + data.msg)
        }
        else {
            socket.broadcast.emit("msg", socket.store.data.nickname + "对大家说：" + data.msg);
        }
    });
});