/**
 * Created by tengzhongwei on 5/25/17.
 */
function searchFromNode(startNode, flows) {
    let s = new Set();
    s.add(startNode);
    let res = [];
    for(let flow of flows){
        if(s.has(flow.current_q._id) || s.has(flow.next_q._id)){
            res.push(flow);
            s.add(flow.next_q._id);
            s.add(flow.current_q._id);
        }
    }
    return res;
}

module.exports = searchFromNode;