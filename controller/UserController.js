import User from "../model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userController = {

    loginController: async (req, res) => {

        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(200).json({
                    message: "Credential Required",
                    success: false,
                })
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(200).json({
                    message: "User not Exist",
                    success: false
                })
            }



            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({
                    message: "Invalid Email or Password",
                    success: false,
                });
            }

            user.password = undefined;

            const accessToken = jwt.sign({ id: user._id, user }, process.env.ACCESS_JWT_SECRET, {
                expiresIn: "2d",
            });



            res.cookie("access_token", accessToken, {
                // maxAge:24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            }).status(200).send({
                message: "Login Success",
                success: true,
                accessToken,
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error in LonginController ${error}`,
            });
        }
    },

    registerController: async (req, res) => {

        try {
            const user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(200).json({
                    message: "User Already Exist",
                    success: false
                })
            }

            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;

            const newUser = new User(req.body);
            await newUser.save();

            return res.status(200).json({
                message: "User Created",
                success: true
            })

        } catch (error) {
            console.log("Error in registration", error)

            res.status(500).send({
                message: `Error in registration ${error.message}`,
            });
        }
    },


    logoutController: async (req, res) => {

        res.clearCookie("access_token")

        return res.status(200).json({
            message: "Successfully Logged out",
            success: true,
        })
    }

}

export default userController