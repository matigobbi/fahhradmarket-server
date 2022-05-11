import "../style.css";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useContext } from "react";                   
import { AuthContext } from "../context/auth.context"; 


const links =   [
  { name: "Home", to: "/App", id: 1 },
  { name: "Log In ", to: "/LogIn", id: 2 },
  { name: "Sign Up", to: "/SignUp", id: 3 },
  { name: "Create a Post", to: "/Create", id: 4 }
];
const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1
    }
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
};
export default function NavBar() {
    const [open, cycleOpen] = useCycle(false, true);
  return (
    <main>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 }
            }}
          >
            <motion.div
              className="container"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {links.map(({ name, to, id }) => (
                <motion.a
                  key={id}
                  href={to}
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {name}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="btn-container">
        <button onClick={cycleOpen}>{open ? "<" : ">"}</button>
      </div>
    </main>
  );
}