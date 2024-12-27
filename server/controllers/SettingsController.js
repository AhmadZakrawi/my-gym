import Users from "../models/UserModel.js";

export const updateSettings = async (req, res) => {
  const { gymName, language } = req.body;
  if (!gymName && !language)
  return res.status(400).json({error: "No fields provided to update"})
  try {
    let newUser = {}
    gymName ? newUser.gymName = gymName : null
    language ? newUser.language = language : null
    const [affectedRows] = await Users.update(newUser,
      {
        where: {
          id: req.userId,
        },
      }
    );

    if (affectedRows > 0)
      return res.status(200).json({
        message: "Settings updated successfully!",
      });
    else return res.status(400).json({ error: "Error updating settings" });
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(400).json({ error: "Internal server error" });
  }
};
