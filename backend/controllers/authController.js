const User = require("../models/user");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            ...req.body,
            password: cryptoJs.AES.encrypt(
                req.body.password,
                process.env.CRYPTO_SECRET
            ).toString(),
        });
        res.status(200).json({
            message: "success",
            data: {
                newUser,
            },
        });
    } catch (err) {
        res.status(200).json(err);
    }
};

exports.logIn = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            res.status(404).json({ message: "user not found" });
        }

        const hastPassword = cryptoJs.AES.decrypt(
            user.password,
            process.env.CRYPTO_SECRET
        );

        const password = hastPassword.toString(cryptoJs.enc.Utf8);

        if (password !== req.body.password) {
            res.status(404).json({ message: "incorrect password" });
        } else {
            const token = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "10d",
                }
            );
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({
                message: "success",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    img: user.img,
                },
                token: token,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// exports.verifyToken = (req, res, next) => {
//     const { token } = req.headers;
//     if (token) {
//         const authToken = token.split(" ")[1];
//         jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
//             if (err) {
//                 res.status(401).json({ message: "incorrect jwt" });
//             } else {
//                 req.user = user;
//                 next();
//             }
//         });
//     } else {
//         res.status(401).json({ message: "jwt not provided" });
//     }
// };

// exports.verifyAdmin = (req, res, next) => {
//     this.verifyToken(req, res, () => {
//         if (req.user.isAdmin) {
//             next();
//         } else {
//             res.status(401).json({
//                 message: "only admin can perform this action",
//             });
//         }
//     });
// };

// exports.verifyUser = (req, res, next) => {
//     this.verifyToken(req, res, () => {
//         const { id } = req.params;
//         if (req.user.id === id || req.user.isAdmin) {
//             next();
//         } else {
//             next(
//                 res
//                     .status(401)
//                     .json({
//                         message: "only verified users can perform this action",
//                     })
//             );
//         }
//     });
// };
