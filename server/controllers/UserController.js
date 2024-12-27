import Users from "../models/UserModel.js";
import Tasks from "../models/TaskModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "21d",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });
  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Email is not valid" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "Password should be at least 8 characters" });

  try {
    const user = await Users.findAll({
      where: { email },
    });

    

    if (user[0]) {
      const { id, name, avatar, gymName } = user[0];
      const match = await bcrypt.compare(password, user[0].password);
      if (!match) return res.status(400).json({ error: "Incorrect password" });

      const token = createToken(id);
      const tasks = await Tasks.findAll({
        where: { assignedTo: user[0].id },
      });
      return res
        .status(200)
        .json({ user: { id, name, email, avatar, gymName }, token, tasks });
    } else {
      return res.status(400).json({ error: "Email not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, gymName, email, password, confPassword } = req.body;

  if (!name || !gymName || !email || !password || !confPassword)
    return res.status(400).json({ error: "All fields are required" });
  if (password !== confPassword)
    return res.status(400).json({ error: "Passwords don't match" });
  if (!validator.isEmail(email))
    return res.status(400).json({ error: "Email is not valid" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "Password should be at least 8 characters" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await Users.create({
      name,
      gymName,
      email,
      password: hashPassword,
    });
    console.log(user);
    const tasks = [
      {
        order: 1,
        label: "Create your MyGym Account",
        completed: true,
        actionUrl: null,
        assignedTo: user.id,
      },
      {
        order: 2,
        label: "Create your first membership",
        completed: false,
        actionUrl: "/manage/memberships",
        assignedTo: user.id,
      },
      {
        order: 3,
        label: "Add your first member",
        completed: false,
        actionUrl: "/manage/members",
        assignedTo: user.id,
      },
      {
        order: 4,
        label: "Add your first classes type",
        completed: false,
        actionUrl: "/manage/programs",
        assignedTo: user.id,
      },
      {
        order: 5,
        label: "Add your first class",
        completed: false,
        actionUrl: "/manage/classes",
        assignedTo: user.id,
      },
    ];

    tasks.forEach(async (task) => {
      await Tasks.create({
        order: task.order,
        label: task.label,
        completed: task.completed,
        actionUrl: task.actionUrl,
        assignedTo: task.assignedTo,
      });
    });

    return res.status(200).json({
      message: "Registration successful!",
      user: { id: user.id, name, email },
    });
  } catch (err) {
    if (err.parent.errno == 1062)
      return res.status(400).json({ error: "Email already used" });
  }
};
