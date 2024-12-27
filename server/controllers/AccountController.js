import Users from "../models/UserModel.js";

export const updateAccount = async (req, res) => {
  const { avatar, email } = req.body;
  if (!avatar && !email)
  return res.status(400).json({error: "No fields provided to update"})
  try {
    let newUser = {}
    avatar ? newUser.avatar = avatar : null
    email ? newUser.email = email : null

    const [affectedRows] = await Users.update(newUser,
      {
        where: {
          id: req.userId,
        },
      }
    );

    if (affectedRows > 0)
      return res.status(200).json({
        message: "Account updated successfully!",
      });
    else return res.status(400).json({ error: "Error updating account" });
  } catch (err) {
    console.error("Error updating account:", err);
    res.status(400).json({ error: "Internal server error" });
  }
};
