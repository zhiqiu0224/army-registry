const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/army');
db.once('open', () => {
    console.log("mongodb connected");
});

const army = require('./model');

//get avatar
router.get('/avatar/uploads/:file', (req, res) => {
    var img = fs.readFileSync(`/Users/zhiqiu/Desktop/JS_FullStack/Projects/army-registry/uploads/${req.params.file}`);
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img, 'binary');
    
});

//get all army
router.get('/soldiers', (req, res) => {
    // console.log(req.query);
    // if (Object.keys(req.query).length === 0) {
    //     console.log("getall");
        
    // } else {
    //     console.log("getpagination");
        
    // }

    army.find({}).populate('superior').exec((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

//get soldiers by page
router.get('/soldiers/:pageNo', (req, res) => {
    army.paginate({}, {populate: 'superior', page: req.params.pageNo, limit: 10}, (err, result) => {
        //console.log(result.docs);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result.docs);
        }
    });
})
// //get one soldier by id
// router.get('/soldiers/:soldierId', (req, res) => {
//     army.findById(req.params.soldierId, (err, result) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             console.log(result);
//             res.status(200).json(result);
//         }
//     })
// });

//get valid superiors in edit page
router.get('/validSuperiors/:soldierId', (req, res) => {
    army.find({}, (err, result) => {
        console.log(result);
        if (err) {
            res.status(500).send(err);
        } else {
            let invalid = [];
            let queue = [];
            queue.push(getNode(req.params.soldierId, result));
            while (queue.length > 0) {
                let node = queue.shift();
                invalid.push(node._id.toString());
                //console.log(node.ds);
                for (let i = 0; i < node.ds.length; i++) {
                    queue.push(getNode(node.ds[i].toString(), result));
                }
            }
            
            let valid = [];
            for (let i = 0; i < result.length; i++) {
                if (!invalid.includes(result[i]._id.toString())) {
                    valid.push(result[i]);
                }
            }
            res.status(200).send(valid);
        }
    })
})

const getNode = (id, list) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i]._id.toString() === id) {
            return list[i];
        }
    }
}

//get linked superior
router.get('/linksup/:id', (req, res) => {
    army.findById(req.params.id).populate('superior').exec((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

//get linked ds
router.post('/linkds', (req, res) => {
    console.log(req.body);
    army.find({'_id': {$in: req.body.ds}}).populate('superior').exec((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (Array.isArray(result)) {
                res.status(200).send(result);
            } else {
                res.status(200).send([result]);
            }
        }
    });
});

//insert one army registry info
router.post('/soldiers', upload.single('avatar'), (req, res) => {
    const data = {
        ...req.body,
        avatar: req.file.path,
    };
    army.create(data, (err, docs) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let newId = docs._id;
            if (req.body.superior) {
                army.findById(req.body.superior, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        let newDS = [...result.ds, newId];
                        army.findByIdAndUpdate(req.body.superior, {ds: newDS}, (err, doc) => {
                            if (err) {
                                res.status(500).send(err);
                            }
                        })
                    }
                })
            }
            res.status(200).send(docs);
        }
    });  
});

//delete one soldier by id
router.delete('/soldiers/:soldierId', (req, res) => {
    army.findById(req.params.soldierId, (err, doc) => {
        if (err) {
            res.status(500).send(err);
        } else {
            //no superior, no ds
            if (!doc.superior && doc.ds.length === 0) {
                army.findByIdAndDelete(req.params.soldierId, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(result);
                    }
                });

            } else if (doc.superior && doc.ds.length === 0) { //has superior, no ds
                //modify superior's ds property first
                army.findById(doc.superior, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        let newDS = result.ds.filter(ele => ele.toString() !== req.params.soldierId);
                        
                        //update superior
                        army.findByIdAndUpdate(doc.superior, {ds: newDS}, (err, result) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                //delete current soldier
                                army.findByIdAndDelete(req.params.soldierId, (err, doc) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        res.status(200).send(doc);
                                    }
                                });
                            }
                        });
                    }
                });

            } else if (!doc.superior && doc.ds.length > 0) { //no superior, has ds
                //modify direct subs' superior property
                for (let i = 0; i < doc.ds.length; i++) {
                    army.findByIdAndUpdate(doc.ds[i], {superior: undefined}, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                    });
                }

                //delete current soldier
                army.findByIdAndDelete(req.params.soldierId, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(result);
                    }
                })

            } else { //has superior, has ds
                //modify direct subs' superior property
                for (let i = 0; i < doc.ds.length; i++) {
                    army.findByIdAndUpdate(doc.ds[i], {superior: doc.superior}, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                    });
                }
                //modify superior's ds property first
                army.findById(doc.superior, (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        let newDS = result.ds.filter(ele => ele.toString() !== req.params.soldierId);
                        let newds = [...newDS, ...doc.ds];
                        
                        //update superior
                        army.findByIdAndUpdate(doc.superior, {ds: newds}, (err, result) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                //delete current soldier
                                army.findByIdAndDelete(req.params.soldierId, (err, doc) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        res.status(200).send(doc);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

//update one army registry info
router.put('/soldiers/:armyId', upload.single('avatar'), (req, res) => {
    const data = {
        ...req.body,
        avatar: req.file.path,
        ds: JSON.parse(req.body.ds)
    };
    console.log(data);
    if (!data.prevSuperior && data.superior) { //no superior previouly, has superior now
        console.log(1);
        army.findById(data.superior, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const newDS = [...result.ds, req.params.armyId];
                army.findByIdAndUpdate(data.superior, {ds: newDS}, (err, doc) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        //update current soilder
                        const newData = Object.keys(data).reduce((object, key) => {
                            if (key !== "prevSuperior") {
                                object[key] = data[key];
                            }
                            return object;
                        }, {});
                        army.findByIdAndUpdate(req.params.armyId, newData, (err, docs) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    }
                });
            }
        });

    } else if (data.prevSuperior && !data.superior) { // has superior previously, no superior now
        console.log(2);
        army.findById(data.prevSuperior, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const newDS = result.ds.filter(ele => req.params.armyId !== ele.toString());
                army.findByIdAndUpdate(data.prevSuperior, {ds: newDS}, (err, doc) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        //update current soilder
                        const newData = Object.keys(data).reduce((object, key) => {
                            if (key !== "prevSuperior") {
                                object[key] = data[key];
                            }
                            return object;
                        }, {});
                        army.findByIdAndUpdate(req.params.armyId, {...newData, superior: undefined}, (err, docs) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    }
                });
            }
        });

    } else if (!data.prevSuperior && !data.superior) {
        army.findByIdAndUpdate(req.params.armyId, data, (err, docs) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(docs);
            }
        });

    } else {
        console.log(3);
        //modify previous superior's ds property
        army.findById(data.prevSuperior, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const newDS = result.ds.filter(ele => req.params.armyId !== ele.toString());
                army.findByIdAndUpdate(data.prevSuperior, {ds: newDS}, (err, doc) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        //modify new superior's ds property
                        army.findById(data.superior, (err, result) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                const newDS = [...result.ds, req.params.armyId];
                                army.findByIdAndUpdate(data.superior, {ds: newDS}, (err, doc) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    } else {
                                        //update current soilder
                                        const newData = Object.keys(data).reduce((object, key) => {
                                            if (key !== "prevSuperior") {
                                                object[key] = data[key];
                                            }
                                            return object;
                                        }, {});
                                        army.findByIdAndUpdate(req.params.armyId, newData, (err, docs) => {
                                            if (err) {
                                                res.status(500).send(err);
                                            } else {
                                                res.status(200).json(docs);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                })
            }
        });
    }
    
    
});



module.exports = router;
