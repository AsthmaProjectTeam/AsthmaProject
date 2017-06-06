/**
 * Created by tengzhongwei on 5/25/17.
 */
let Doctor          = require('../../models/doctor'),
    jwt_parser      = require('../../utils/auth'),
    jwt             = require('jsonwebtoken'),
    Question        = require('../../models/question'),
    mongoose        = require('mongoose'),
    Flow            = require('../../models/flow'),
    searchFromNode  = require('../../utils/search_flow');

module.exports = app => {

    /***************** Add next question with condition *******************/
    app.post("/v1/flow/questions", (req, res)=>{
        let flow = new Flow(req.body);
        // Question
        //     .findOne({_id:11},(err, question)=>{
        //         flow.current_q = question;
        //     });
        // Question
        //     .findOne({_id:12},(err,question)=>{
        //         flow.next_q = question;
        // });

        flow.save(err=>{
           if(err) res.status(403).send({err});
            res.status(200).send(flow);
        });
    });

    /***************** Get All Flows*******************/
    app.get("/v1/flow/questions", (req, res)=>{
       Flow
           .find({})
           .populate("current_q","id content")
           .populate("next_q", "id content")
           .exec((err, flows)=>{
                res.status(200).send(flows);
           })
    });

    /***************** Delete All Flows*******************/
    app.delete("/v1/flow/questions", (req, res)=>{
        Flow.remove({},(err)=>{
            if(err) res.status(403).send("err");
            else {
                res.status(200).send("delete success");
            }
        })
    });

    /***************** Get All Flows from current Node *******************/
    app.get("/v1/flow/node",(req, res)=>{
        Flow.find({})
            .populate("current_q","id content options")
            .populate("next_q", "id content options")
            .exec((err, flows)=>{
                if(err){res.status(403).send({err})}
                let f = searchFromNode(11, flows);
                let dic = {};
                for(let node of f){
                    if(node.current_q._id in dic){
                        dic[node.current_q._id]['flow'][node.value]= node.next_q._id;
                    }
                    else {
                        dic[node.current_q._id] = {};
                        dic[node.current_q._id]['self'] = node.current_q;
                        dic[node.current_q._id]['flow'] = {};
                        dic[node.current_q._id]['flow'][node.value]= node.next_q._id;
                    }
                    if(node.next_q){
                        if (!(node.next_q._id in dic)){
                            dic[node.next_q._id]= {};
                            dic[node.next_q._id]['self'] = node.next_q;
                        }
                    }

                }


                res.status(200).send(dic);
            })
    });

};