import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/:username/:password", async (req, res) => {
    let collection = await db.collection("users");
    let query = { 
        username: req.params.username,
        password: req.params.password
     };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.get("/enrolledStudents/:year/:semester/:subjectId", async (req, res) => {
    let collection = await db.collection("users");

    let query = { 
        enrollments: { 
            $elemMatch : { 
                year: parseInt(req.params.year), 
                semester: parseInt(req.params.semester), 
                classrooms: { 
                    $elemMatch: { 
                        subjectId: new ObjectId(req.params.subjectId) 
                    } 
                }
            } 
        }
     };

    let result = await collection.countDocuments(query);

    if (result === 0) res.send("Not found").status(404);
    else res.send({total: result}).status(200);
});

router.get("/studentsWorkingOnTask/:year/:semester/:taskId", async (req, res) => {
    let collection = await db.collection("users");

    let query = { 
        enrollments: { 
            $elemMatch : { 
                year: parseInt(req.params.year), 
                semester: parseInt(req.params.semester), 
                classrooms: { 
                    $elemMatch: { 
                        tasks: {
                            $elemMatch: {
                                 taskId: new ObjectId(req.params.taskId),
                                 status: "pending" 
                            }
                        }
                    } 
                }
            } 
        }
     };

    let result = await collection.countDocuments(query);

    res.send({ total: result }).status(200);
});

router.get("/studentsWorkingOnSubtask/:year/:semester/:subtaskId", async (req, res) => {
    let collection = await db.collection("users");

    let query = { 
        enrollments: { 
            $elemMatch : { 
                year: parseInt(req.params.year), 
                semester: parseInt(req.params.semester), 
                classrooms: { 
                    $elemMatch: { 
                        tasks: {
                            $elemMatch: {
                                 subtasks: {
                                    $elemMatch: {
                                        subtaskId: new ObjectId(req.params.subtaskId),
                                        status: "pending"
                                    }
                                 }
                            }
                        }
                    } 
                }
            } 
        }
     };

    let result = await collection.countDocuments(query);

    res.send({ total: result }).status(200);
});

router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let query = { username: "test" };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.put("/:username/updateTask", async (req, res) => {
    const filter = {
        username: "oakachach",
    };

    const update = {
        $set: {
            "enrollments.$[i].classrooms.$[j].tasks.$[z].status": req.body.status,
        },
    };

    const arrayFilters = {
        arrayFilters: [
            {
                "i.enrollmentId": new ObjectId(req.body.enrollmentId),
            },
            {
                "j.classroomId": new ObjectId(req.body.classroomId),
            },
            {
                "z.taskId": new ObjectId(req.body.taskId),
            },
        ],
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(filter, update, arrayFilters);

    res.send(result).status(200);
});

router.put("/:username/updateSubtask", async (req, res) => {
    const filter = {
        username: "oakachach",
    };

    const update = {
        $set: {
            "enrollments.$[i].classrooms.$[j].tasks.$[z].subtasks.$[a].status":
                req.body.status,
        },
    };

    const arrayFilters = {
        arrayFilters: [
            {
                "i.enrollmentId": new ObjectId(req.body.enrollmentId),
            },
            {
                "j.classroomId": new ObjectId(req.body.classroomId),
            },
            {
                "z.taskId": new ObjectId(req.body.parentTaskId),
            },
            {
                "a.subtaskId": new ObjectId(req.body.subtaskId),
            },
        ],
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(filter, update, arrayFilters);

    res.send(result).status(200);
});

export default router;
