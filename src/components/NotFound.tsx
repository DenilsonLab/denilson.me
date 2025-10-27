import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Power, Home, RefreshCw, Zap } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2 
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50, rotate: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: { 
        duration: 0.8
      }
    }
  }

  const numberVariants = {
    initial: { opacity: 0, scale: 0.5, rotateY: -180 },
    animate: { 
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5
      }
    }
  }

  const ghostVariants = {
    initial: { scale: 0, rotate: 180 },
    animate: { 
      scale: 1,
      rotate: 0
    },
    float: {
      y: [0, -15, 0],
      x: [0, 10, -10, 0],
      rotateY: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  }

  const shake = async () => {
    await controls.start({
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] text-gray-100">
      <motion.div
        className="flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-12">
          {/* Cable izquierdo */}
          <motion.div
            className="absolute -left-8 top-1/2 w-16 h-1 bg-gradient-to-r from-[#58a6ff] to-transparent origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Cable derecho */}
          <motion.div
            className="absolute -right-8 top-1/2 w-16 h-1 bg-gradient-to-l from-[#58a6ff] to-transparent origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Icono de enchufe */}
          <motion.div
            className="relative"
            animate={{
              rotate: [-5, 5, -5],
              x: [-2, 2, -2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Power size={80} className="text-[#58a6ff]" />
          </motion.div>

          {/* Chispas eléctricas */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${50 + (i - 1) * 30}%`,
                top: '50%'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
                y: [-10, 0, -10]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            >
              <Zap className="text-yellow-400 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          ))}

          {/* Círculos de energía */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute top-1/2 left-1/2 w-full h-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-[#58a6ff]/20 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          ))}
        </div>

        <motion.h1 
          className="text-7xl font-bold mb-4 bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] text-transparent bg-clip-text"
          initial={{ scale: 0.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.5 }
          }}
        >
          404
        </motion.h1>

        <motion.p 
          className="text-xl mb-2 text-gray-400"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ¡Ups! Parece que te has perdido en el espacio digital
        </motion.p>

        <motion.p 
          className="text-md mb-8 text-gray-500"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          La página que buscas ha desaparecido en el ciberespacio
        </motion.p>

        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="default"
              onClick={() => navigate("/")}
              className="bg-[#58a6ff] hover:bg-[#58a6ff]/80"
            >
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-gray-700 hover:bg-gray-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Recargar página
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}