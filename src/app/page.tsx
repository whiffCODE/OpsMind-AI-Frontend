"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function HomePage() {
  return (
    <div className="space-y-28">

      {/* HERO SECTION */}
      <section className="text-center space-y-8 pt-28 relative overflow-hidden">

        {/* subtle background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2
                          w-[600px] h-[300px]
                          bg-gradient-to-r from-indigo-500/20 to-cyan-500/20
                          blur-3xl rounded-full" />
        </div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold
                     bg-gradient-to-r from-indigo-600 to-cyan-600
                     bg-clip-text text-transparent"
        >
          OpsMind AI
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-muted-foreground"
        >
          Answers you can trust. Powered by your SOPs.
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-muted-foreground"
        >
          OpsMind AI is a context-aware corporate knowledge assistant that
          instantly answers employee questions using official SOP documents,
          with precise source citations and zero hallucinations.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          className="flex justify-center gap-4 pt-6"
        >
          <Link
            href="/chat"
            className="bg-gradient-to-r from-indigo-600 to-cyan-600
                       text-white px-6 py-3 rounded-md
                       hover:opacity-90 transition-opacity"
          >
            Start Asking
          </Link>

          <Link
            href="/auth/login"
            className="border px-6 py-3 rounded-md
                       hover:border-indigo-500
                       hover:text-indigo-600
                       transition-colors"
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border rounded-xl p-6 space-y-3
                       hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-14">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-center"
        >
          How OpsMind AI Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <span className="text-3xl font-bold
                               bg-gradient-to-r from-indigo-600 to-cyan-600
                               bg-clip-text text-transparent">
                {item.step}
              </span>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center pb-28"
      >
        <h2 className="text-3xl font-bold mb-6">
          Turn SOPs into Answers
        </h2>
        <Link
          href="/chat"
          className="bg-gradient-to-r from-indigo-600 to-cyan-600
                     text-white px-10 py-4 rounded-md text-lg
                     hover:opacity-90 transition-opacity"
        >
          Launch OpsMind AI
        </Link>
      </motion.section>

    </div>
  );
}
