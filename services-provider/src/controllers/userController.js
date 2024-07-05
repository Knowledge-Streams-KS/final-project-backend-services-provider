import userModel from "../models/userModel";

//registration controller
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, address } =
    req.body;

  if (!firstName || !email || !password) {
    return res
      .status(400)
      .json({ message: "First name, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = [
  check("email").isEmail().withMessage("Please include a valid email"),
  check("password").exists().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

// Update User Profile
const updateUserProfile = [
  check("firstName")
    .optional()
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please include a valid email"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phoneNumber, address } =
      req.body;

    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;

      await user.save();
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

export { registerUser, loginUser, updateUserProfile };
