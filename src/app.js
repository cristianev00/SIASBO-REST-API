import express from 'express';
import employeesRoutes from './routes/employes.routes.js';
import indexRoutes from './routes/index.routes.js';
import simhebRoutes from './routes/simheb.routes.js';
import siasboRoutes from './routes/siasbo.routes.js';
import { customRedisRateLimiter } from './middlewares/rateLimiter.js';

// Documentacion Swagger API

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {title: "Ministerio de Medio Ambiente y Agua - API Plataforma SIARH",
                version: "1.0.0",
                description: "Endpoints de la plataforma SIARH"
            }
    },
    servers: [{ 
        url: "http://localhost:4000"
    }],
    apis: ["src/routes/siasbo.routes.js","src/routes/simheb.routes.js"]
};
const swaggerSpec = swaggerJSDoc(options);

// Init express
const app = express();

app.use(express.json());

// Routes

app.use(indexRoutes);

app.use('/simheb',simhebRoutes);

app.use('/v1/siasbo',siasboRoutes);

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/v1/docs.json', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

//Not page found 
app.use((req, res, next) => {
    res.status(404).json({message:'EndPoint Not Found LOCALhost'});
});

export default app;