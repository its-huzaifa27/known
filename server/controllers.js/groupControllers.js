import { Group } from "../models/groupModels.js";

// @desc Get all groups
// @route GET /api/groups
// @access private
const getGroups = async (req, res) => {
    const groups = await Group.find({ user_id: req.user.id });
    res.status(200).json(groups);
};

// @desc Create new group
// @route POST /api/groups
// @access private
const createGroup = async (req, res) => {
    const { name, contacts } = req.body;
    
    if (!name || !contacts) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    if (contacts.length < 2) {
        res.status(400);
        throw new Error("A group must have at least 2 contacts!");
    }

    const group = await Group.create({
        name,
        contacts,
        user_id: req.user.id
    });

    res.status(201).json(group);
};

// @desc Update group
// @route PUT /api/groups/:id
// @access private
const updateGroup = async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
        res.status(404);
        throw new Error("Group not found");
    }

    if (group.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user groups");
    }

    const updatedGroup = await Group.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedGroup);
};

// @desc Delete group
// @route DELETE /api/groups/:id
// @access private
const deleteGroup = async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
        res.status(404);
        throw new Error("Group not found");
    }

    if (group.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user groups");
    }

    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json(group);
};

export { getGroups, createGroup, updateGroup, deleteGroup };
