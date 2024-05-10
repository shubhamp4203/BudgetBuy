const ChatGroup = require("../schemas/chatGroupSchema");

exports.createChatGroup = async (req, res) => {
  const userId1 = req.body.user_id;
  const name1 = req.body.user_name;
  const userId2 = req.body.seller_id;
  const name2 = req.body.seller_name;

  try {
    const existingChatGroup = await ChatGroup.findOne({
      $or: [
        { userId1, userId2 },
        { userId1: userId2, userId2: userId1 },
      ],
    });

    if (existingChatGroup) {
      return res.status(200).json({
        message: "Chat group already exists",
        chatGroup: existingChatGroup,
      });
    }

    const newChatGroup = new ChatGroup({ userId1, name1, userId2, name2 });
    await newChatGroup.save();

    return res
      .status(201)
      .json({ message: "Chat group created", chatGroup: newChatGroup });
  } catch (err) {
    console.error("Error creating ChatGroup:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserGroups = async (req, res) => {
  const userId = req.query.user_id;

  try {
    const groups = await ChatGroup.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    });
    console.log("groups:", groups);
    res.json(groups);
  } catch (err) {
    console.error("Error retrieving user's groups from MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
};
