"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mailOptions } = req.body;
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error);
            }
            else {
                console.log('Email sent: ', info.response);
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.sendEmail = sendEmail;
