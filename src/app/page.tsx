"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function HomePage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="space-y-32"
    >
      {/* HERO SECTION */}
      <section className="text-center space-y-8 pt-32 relative overflow-hidden">

        {/* animated background glow */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="
              absolute top-24 left-1/2 -translate-x-1/2
              w-[680px] h-[320px]
              bg-gradient-to-r from-indigo-500/20 to-cyan-500/20
              blur-3xl rounded-full
            "
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="
            text-4xl md:text-6xl font-bold
            bg-gradient-to-r from-indigo-600 to-cyan-600
            bg-clip-text text-transparent
          "
        >
          OpsMind AI
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-xl md:text-2xl text-muted-foreground"
        >
          Answers you can trust. Powered by your SOPs.
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="max-w-2xl mx-auto text-muted-foreground"
        >
          OpsMind AI is a context-aware corporate knowledge assistant that
          instantly answers employee questions using official SOP documents,
          with precise source citations and zero hallucinations.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex justify-center gap-4 pt-6"
        >
          <Link
            href="/chat"
            className="
              bg-gradient-to-r from-indigo-600 to-cyan-600
              text-white px-7 py-3 rounded-md
              hover:opacity-90 transition-opacity
            "
          >
            Start Asking
          </Link>

          <Link
            href="/auth/login"
            className="
              border px-7 py-3 rounded-md
              hover:border-indigo-500
              hover:text-indigo-600
              transition-colors
            "
          >
            Admin Login
          </Link>
        </motion.div>
      </section>

      {/* WHAT IT DOES */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Instant SOP Answers",
            desc: "Ask questions in plain English and get immediate, accurate answers sourced directly from company SOPs.",
          },
          {
            title: "Source-Cited Responses",
            desc: "Every answer includes document and page references, so employees always know where the information comes from.",
          },
          {
            title: "No Hallucinations",
            desc: "If the answer is not present in the SOPs, OpsMind AI clearly says “I don’t know.”",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            custom={i}
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="
              border rounded-xl p-6 space-y-3
              bg-white
              hover:shadow-lg
              transition-shadow
            "
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-16">
        <motion.h2
          variants={fadeUp}
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-center"
        >
          How OpsMind AI Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              step: "1",
              title: "Upload SOPs",
              desc: "Admins securely upload and manage SOP documents through the knowledge base.",
            },
            {
              step: "2",
              title: "Semantic Search",
              desc: "Documents are indexed using vector embeddings for precise, context-aware retrieval.",
            },
            {
              step: "3",
              title: "Trusted Answers",
              desc: "Employees receive fast, streaming responses backed by verified SOP sources.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              custom={i}
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <span
                className="
                  text-3xl font-bold
                  bg-gradient-to-r from-indigo-600 to-cyan-600
                  bg-clip-text text-transparent
                "
              >
                {item.step}
              </span>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <motion.section
        variants={fadeUp}
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold">Built for Enterprises</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          OpsMind AI is designed for internal corporate use, with role-based
          access, secure authentication, and complete transparency in every
          response.
        </p>
      </motion.section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center pb-32"
      >
        <h2 className="text-3xl font-bold mb-6">
          Turn SOPs into Answers
        </h2>
        <Link
          href="/chat"
          className="
            bg-gradient-to-r from-indigo-600 to-cyan-600
            text-white px-10 py-4 rounded-md text-lg
            hover:opacity-90 transition-opacity
          "
        >
          Launch OpsMind AI
        </Link>
      </motion.section>
    </motion.div>
  );
}
