import nodemailer from "nodemailer";
import logger from "./logger.js";
const smtpPort = Number(process.env.SMTP_PORT);
const isConfigured = Boolean(process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS);
const transporter = isConfigured
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort || 587,
        secure: smtpPort === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })
    : null;
export const emailFrom = process.env.EMAIL_FROM ?? "To-Let <no-reply@to-let.local>";
function logFallback(to, resetLink) {
    logger.info(`[DEV] Password reset link for ${to}: ${resetLink}`);
}
export async function sendPasswordResetEmail(to, resetLink) {
    if (!transporter) {
        logFallback(to, resetLink);
        return false;
    }
    try {
        await transporter.sendMail({
            from: emailFrom,
            to,
            subject: "Reset your To-Let password",
            text: `Use this link to reset your password (valid for 15 minutes):\n\n${resetLink}`,
            html: `<p>You requested a password reset for your To-Let account.</p><p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p><p>If you didn't request this, you can safely ignore this email.</p>`,
        });
        return true;
    }
    catch (err) {
        logger.error(`Failed to send password reset email to ${to}`, { error: err });
        logFallback(to, resetLink);
        return false;
    }
}
export async function sendVerificationEmail(to, code) {
    if (!transporter) {
        logger.info(`[DEV] Verification code for ${to}: ${code}`);
        return false;
    }
    try {
        await transporter.sendMail({
            from: emailFrom,
            to,
            subject: "Your To-Let verification code",
            text: `Your verification code is: ${code}\n\nIt expires in 10 minutes. Enter it to verify your email so you can publish listings.`,
            html: `<p>Your To-Let verification code is:</p><h2 style="letter-spacing: 4px;">${code}</h2><p>It expires in 10 minutes. Enter it to verify your email so you can publish listings.</p>`,
        });
        return true;
    }
    catch (err) {
        logger.error(`Failed to send verification email to ${to}`, { error: err });
        logger.info(`[DEV] Verification code for ${to}: ${code}`);
        return false;
    }
}
//# sourceMappingURL=mailer.js.map