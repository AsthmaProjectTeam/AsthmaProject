/**
 * Created by tengzhongwei on 6/12/17.
 */
exports.foo = (req,res,next) => {

    let socket_id = [];
    const io = req.app.get('socketio');
    io.on('connection', socket => {
        console.log("Query: ", socket.handshake.query);
        socket.on('disconnect',()=>{
            console.log("disconnect");
        });
    });
    next();
};