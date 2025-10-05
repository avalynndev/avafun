"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { geistSans } from "@/lib/fonts";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function PrivacyPolicy() {
    return (
        <motion.main
            className={`${geistSans.className} mx-auto max-w-4xl px-4 py-10`}
            initial="initial"
            animate="animate"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
        >
            <motion.div className="mb-6" variants={fadeInUp}>
                <Link href="/">
                    <Button variant="link">← Back Home</Button>
                </Link>
            </motion.div>

            <motion.div className="prose prose-slate dark:prose-invert max-w-none" variants={fadeInUp}>
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

                <p className="text-muted-foreground mb-6">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                        <p>
                            Welcome to Avafun! This Privacy Policy explains how we collect, use, and protect your information
                            when you use our web-based arcade game platform. Avafun is designed to be a fun, interactive
                            gaming experience that respects your privacy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

                        <h3 className="text-xl font-medium mb-3">Local Storage Data</h3>
                        <p className="mb-4">
                            Avafun uses your browser's local storage to enhance your gaming experience:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Game Progress:</strong> High scores, completed levels, and game state</li>
                            <li><strong>Coin Balance:</strong> Your virtual coin count and spending history</li>
                            <li><strong>Preferences:</strong> Theme settings, game configurations, and user preferences</li>
                            <li><strong>Session Data:</strong> Temporary data to maintain game sessions</li>
                        </ul>

                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
                        <p className="mb-4">
                            Your data is primarily stored locally in your browser. This means:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Local Control:</strong> Your game data stays on your device</li>
                            <li><strong>No Registration Required:</strong> You can play without creating an account</li>
                            <li><strong>Privacy First:</strong> We don't collect personal information unless necessary</li>
                            <li><strong>Secure Transmission:</strong> All data is transmitted over HTTPS</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                        <p className="mb-4">
                            Avafun uses the following third-party services:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Vercel:</strong> For hosting and deployment (subject to Vercel's privacy policy)</li>
                         {/*   <li><strong>Analytics:</strong> Anonymous usage statistics for platform improvement</li> */}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
                        <p className="mb-4">You have the following rights regarding your data:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Clear Data:</strong> You can clear your browser's local storage to reset all game data</li>
                            <li><strong>Opt Out:</strong> You can disable JavaScript to prevent data collection</li>
                            <li><strong>Control:</strong> Your game progress and preferences are stored locally on your device</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                        <p>
                            Avafun is designed to be family-friendly and safe for all ages. We do not knowingly collect
                            personal information from children under 13. If you believe we have inadvertently collected
                            such information, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page
                            with an updated "Last updated" date. We encourage you to review this policy periodically
                            for any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <p>
                            If you have any questions about this Privacy Policy or Avafun, please contact us:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>GitHub:</strong> <a href="https://github.com/avalynndev/avafun" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">avalynndev/avafun</a></li>
                            <li><strong>Twitter:</strong> <a href="https://x.com/avalynndev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">@avalynndev</a></li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 p-6 bg-muted rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">🎮 Happy Gaming!</h3>
                    <p className="text-muted-foreground">
                        Thank you for playing Avafun! We're committed to providing a fun, safe, and privacy-respecting
                        gaming experience. Enjoy your games and may the coins be ever in your favor! 🪙
                    </p>
                </div>
            </motion.div>
        </motion.main>
    );
}
