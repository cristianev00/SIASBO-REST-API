import {Router} from 'express';
import {listaMeteo, listaHidro, listaHidroMeteo,
    listaCalidad, listaVar, listaMedDiaria, listaMedDiariaMes, listaObtencion,
    listaMedMensuales, listaMedMinutales, listaMedMinutalesVariable,
    listaMedMensualesVariableMed, listaMedDiariaVariableMed} from '../controllers/simheb.controller.js';


const router = Router ();
/**
 * @swagger
 * /simheb/listaMetereologico:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve la lista de estaciones metereológicas con información importante sobre el código de estación, nombre y localización"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                     example: MMAAST003
 *                   nombre:
 *                     type: string
 *                     example: CH-ME-Corma  
 *                   latitud:
 *                     type: number
 *                     example: -20.237265
 *                   longitud:
 *                     type: number
 *                     example: -65.043657
 *                   uri:
 *                     type: string
 *                     example: simheb.estaciones.116
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaHidrologico:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve la lista de estaciones hidrológicas con información importante sobre el código de estación, nombre y localización"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                     example: MMAAST004
 *                   nombre:
 *                     type: string
 *                     example: CH-HI-El Tranque  
 *                   latitud:
 *                     type: number
 *                     example: -20.809086
 *                   longitud:
 *                     type: number
 *                     example: -64.946668
 *                   uri:
 *                     type: string
 *                     example: simheb.estaciones.114
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaHidrometereologico:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve la lista de estaciones hidrometeorológicas con información importante sobre el código de estación, nombre y localización"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                     example: MMAAST011
 *                   nombre:
 *                     type: string
 *                     example: CH-HM-Paticonga  
 *                   latitud:
 *                     type: number
 *                     example: -20.189956
 *                   longitud:
 *                     type: number
 *                     example: -65.172464
 *                   uri:
 *                     type: string
 *                     example: simheb.estaciones.121
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaCalidadDeAgua:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve la lista de estaciones de calidad de agua con información importante sobre el código de estación, nombre y localización"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                     example: MMAAST079
 *                   nombre:
 *                     type: string
 *                     example: TJ-CA-Tomatitas  
 *                   latitud:
 *                     type: number
 *                     example: -21.310093
 *                   longitud:
 *                     type: number
 *                     example: -64.796716
 *                   uri:
 *                     type: string
 *                     example: simheb.estaciones.189
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaVariablesUnidades:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve la lista de las variables de medición con información importante sobre su código y unidad de medida"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                     example: PBM
 *                   codigo_descripcion:
 *                     type: string
 *                     example: Presión barométrica máxima  
 *                   unidad:
 *                     type: string
 *                     example: mbar
 *                   unidad_nombre:
 *                     type: string
 *                     example: Milibares
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaProcesosDeObtencion:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve la lista de los procesos de obtención de los datos"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                     example: ORIGI
 *                   descripcion:
 *                     type: string
 *                     example: Dato medido o agregado directamente desde dato medido  
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaMedDiaria/estacion/{id}/anio/{anio}:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve una lista de mediciones diarias de cada mes del año solicitado"
 *     parameters:
 *      - name: id
 *        in: path
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica
 *        required: true
 *      - name: anio
 *        in: path
 *        description: El año de donde se recolectará los datos de medición diaria
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo_obtencion:
 *                     type: string
 *                     example: AGREG
 *                   obtencion_descripcion:
 *                     type: string
 *                     example: Dato obtenido desde un proceso de agregación
 *                   codigo_de_variable:
 *                     type: string
 *                     example: PC
 *                   variable_descripcion:
 *                     type: string
 *                     example: Precipitación acumulada
 *                   unidades:
 *                     type: string
 *                     example: mm
 *                   unidades_nombre:
 *                     type: string
 *                     example: Milímetros
 *                   valor_1:
 *                     type: number
 *                     example: 0
 *                   valor_2:
 *                     type: number
 *                     example: 0
 *                   valor_3:
 *                     type: number
 *                     example: 0
 *                   valor_4:
 *                     type: number
 *                     example: 0
 *                   valor_5:
 *                     type: number
 *                     example: 0
 *                   valor_6:
 *                     type: number
 *                     example: 0
 *                   valor_7:
 *                     type: number
 *                     example: 0
 *                   valor_8:
 *                     type: number
 *                     example: 0
 *                   valor_9:
 *                     type: number
 *                     example: 0
 *                   valor_10:
 *                     type: number
 *                     example: 0
 *                   valor_11:
 *                     type: number
 *                     example: 0
 *                   valor_12:
 *                     type: number
 *                     example: 0
 *                   valor_13:
 *                     type: number
 *                     example: 0
 *                   valor_14:
 *                     type: number
 *                     example: 0
 *                   valor_15:
 *                     type: number
 *                     example: 0
 *                   valor_16:
 *                     type: number
 *                     example: 0
 *                   valor_17:
 *                     type: number
 *                     example: 0
 *                   valor_18:
 *                     type: number
 *                     example: 0
 *                   valor_19:
 *                     type: number
 *                     example: 0
 *                   valor_20:
 *                     type: number
 *                     example: 0
 *                   valor_21:
 *                     type: number
 *                     example: 0
 *                   valor_22:
 *                     type: number
 *                     example: 0
 *                   valor_23:
 *                     type: number
 *                     example: 0
 *                   valor_24:
 *                     type: number
 *                     example: 0
 *                   valor_25:
 *                     type: number
 *                     example: 0
 *                   valor_26:
 *                     type: number
 *                     example: 0
 *                   valor_27:
 *                     type: number
 *                     example: 0
 *                   valor_28:
 *                     type: number
 *                     example: 0
 *                   valor_29:
 *                     type: number
 *                     example: 0
 *                   valor_30:
 *                     type: number
 *                     example: 0
 *                   valor_31:
 *                     type: number
 *                     example: 0
 *                   fecha:
 *                     type: timestamp
 *                     example: 2022-11-01T04:00:00.000Z
 *       404:
 *         description: Not Found, El año no es un dato válido, No existe una estación con el código ingresado
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaMedDiariaPorVariable/estacion/{id}/variable/{med}/anio/{anio}:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve una lista de mediciones diarias del año y la variable de medición seleccionadas"
 *     parameters:
 *      - name: id
 *        in: path
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica
 *        required: true
 *      - name: med
 *        in: path
 *        description: El código de la variable de medición
 *        required: true
 *      - name: anio
 *        in: path
 *        description: El año de donde se recolectará los datos de medición diaria
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo_obtencion:
 *                     type: string
 *                     example: AGREG
 *                   obtencion_descripcion:
 *                     type: string
 *                     example: Dato obtenido desde un proceso de agregación
 *                   codigo_de_variable:
 *                     type: string
 *                     example: PC
 *                   variable_descripcion:
 *                     type: string
 *                     example: Precipitación acumulada
 *                   unidades:
 *                     type: string
 *                     example: mm
 *                   unidades_nombre:
 *                     type: string
 *                     example: Milímetros
 *                   valor_1:
 *                     type: number
 *                     example: 0
 *                   valor_2:
 *                     type: number
 *                     example: 0
 *                   valor_3:
 *                     type: number
 *                     example: 0
 *                   valor_4:
 *                     type: number
 *                     example: 0
 *                   valor_5:
 *                     type: number
 *                     example: 0
 *                   valor_6:
 *                     type: number
 *                     example: 0
 *                   valor_7:
 *                     type: number
 *                     example: 0
 *                   valor_8:
 *                     type: number
 *                     example: 0
 *                   valor_9:
 *                     type: number
 *                     example: 0
 *                   valor_10:
 *                     type: number
 *                     example: 0
 *                   valor_11:
 *                     type: number
 *                     example: 0
 *                   valor_12:
 *                     type: number
 *                     example: 0
 *                   valor_13:
 *                     type: number
 *                     example: 0
 *                   valor_14:
 *                     type: number
 *                     example: 0
 *                   valor_15:
 *                     type: number
 *                     example: 0
 *                   valor_16:
 *                     type: number
 *                     example: 0
 *                   valor_17:
 *                     type: number
 *                     example: 0
 *                   valor_18:
 *                     type: number
 *                     example: 0
 *                   valor_19:
 *                     type: number
 *                     example: 0
 *                   valor_20:
 *                     type: number
 *                     example: 0
 *                   valor_21:
 *                     type: number
 *                     example: 0
 *                   valor_22:
 *                     type: number
 *                     example: 0
 *                   valor_23:
 *                     type: number
 *                     example: 0
 *                   valor_24:
 *                     type: number
 *                     example: 0
 *                   valor_25:
 *                     type: number
 *                     example: 0
 *                   valor_26:
 *                     type: number
 *                     example: 0
 *                   valor_27:
 *                     type: number
 *                     example: 0
 *                   valor_28:
 *                     type: number
 *                     example: 0
 *                   valor_29:
 *                     type: number
 *                     example: 0
 *                   valor_30:
 *                     type: number
 *                     example: 0
 *                   valor_31:
 *                     type: number
 *                     example: 0
 *                   fecha:
 *                     type: timestamp
 *                     example: 2022-11-01T04:00:00.000Z
 *       404:
 *         description: Not Found, El año no es un dato válido, No existe una estación con el código ingresado, No existe el código de variable de medición
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaMedDiaria/estacion/{id}/mes/{mes}/anio/{anio}:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve una lista de mediciones diarias de una estacion específica según el mes y año introducidos"
 *     parameters:
 *      - name: id
 *        in: path
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica
 *        required: true
 *      - name: mes
 *        in: path
 *        description: El mes de medición
 *        required: true
 *      - name: anio
 *        in: path
 *        description: El año de donde se recolectará los datos de medición diaria
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo_obtencion:
 *                     type: string
 *                     example: AGREG
 *                   obtencion_descripcion:
 *                     type: string
 *                     example: Dato obtenido desde un proceso de agregación
 *                   codigo_de_variable:
 *                     type: string
 *                     example: PC
 *                   variable_descripcion:
 *                     type: string
 *                     example: Precipitación acumulada
 *                   unidades:
 *                     type: string
 *                     example: mm
 *                   unidades_nombre:
 *                     type: string
 *                     example: Milímetros
 *                   valor_1:
 *                     type: number
 *                     example: 0
 *                   valor_2:
 *                     type: number
 *                     example: 0
 *                   valor_3:
 *                     type: number
 *                     example: 0
 *                   valor_4:
 *                     type: number
 *                     example: 0
 *                   valor_5:
 *                     type: number
 *                     example: 0
 *                   valor_6:
 *                     type: number
 *                     example: 0
 *                   valor_7:
 *                     type: number
 *                     example: 0
 *                   valor_8:
 *                     type: number
 *                     example: 0
 *                   valor_9:
 *                     type: number
 *                     example: 0
 *                   valor_10:
 *                     type: number
 *                     example: 0
 *                   valor_11:
 *                     type: number
 *                     example: 0
 *                   valor_12:
 *                     type: number
 *                     example: 0
 *                   valor_13:
 *                     type: number
 *                     example: 0
 *                   valor_14:
 *                     type: number
 *                     example: 0
 *                   valor_15:
 *                     type: number
 *                     example: 0
 *                   valor_16:
 *                     type: number
 *                     example: 0
 *                   valor_17:
 *                     type: number
 *                     example: 0
 *                   valor_18:
 *                     type: number
 *                     example: 0
 *                   valor_19:
 *                     type: number
 *                     example: 0
 *                   valor_20:
 *                     type: number
 *                     example: 0
 *                   valor_21:
 *                     type: number
 *                     example: 0
 *                   valor_22:
 *                     type: number
 *                     example: 0
 *                   valor_23:
 *                     type: number
 *                     example: 0
 *                   valor_24:
 *                     type: number
 *                     example: 0
 *                   valor_25:
 *                     type: number
 *                     example: 0
 *                   valor_26:
 *                     type: number
 *                     example: 0
 *                   valor_27:
 *                     type: number
 *                     example: 0
 *                   valor_28:
 *                     type: number
 *                     example: 0
 *                   valor_29:
 *                     type: number
 *                     example: 0
 *                   valor_30:
 *                     type: number
 *                     example: 0
 *                   valor_31:
 *                     type: number
 *                     example: 0
 *                   fecha:
 *                     type: timestamp
 *                     example: 2022-11-01T04:00:00.000Z
 *       404:
 *         description: Informacion no disponible en el mes, El año no es un dato válido, No existe una estación con el código ingresado
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaMedMensual/estacion/{id}/anio/{anio}:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve una lista de mediciones mensuales de una estación y año específico"
 *     parameters:
 *      - name: id
 *        in: path
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica
 *        required: true
 *      - name: anio
 *        in: path
 *        description: El año de donde se recolectará los datos de medición mensual
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo_obtencion:
 *                     type: string
 *                     example: AGREG
 *                   obtencion_descripcion:
 *                     type: string
 *                     example: Dato obtenido desde un proceso de agregación
 *                   codigo_de_variable:
 *                     type: string
 *                     example: PC
 *                   variable_descripcion:
 *                     type: string
 *                     example: Precipitación acumulada
 *                   unidades:
 *                     type: string
 *                     example: mm
 *                   unidades_nombre:
 *                     type: string
 *                     example: Milímetros
 *                   valor_1:
 *                     type: number
 *                     example: 0
 *                   valor_2:
 *                     type: number
 *                     example: 0
 *                   valor_3:
 *                     type: number
 *                     example: 0
 *                   valor_4:
 *                     type: number
 *                     example: 0
 *                   valor_5:
 *                     type: number
 *                     example: 0
 *                   valor_6:
 *                     type: number
 *                     example: 0
 *                   valor_7:
 *                     type: number
 *                     example: 0
 *                   valor_8:
 *                     type: number
 *                     example: 0
 *                   valor_9:
 *                     type: number
 *                     example: 0
 *                   valor_10:
 *                     type: number
 *                     example: 0
 *                   valor_11:
 *                     type: number
 *                     example: 0
 *                   valor_12:
 *                     type: number
 *                     example: 0
 *       404:
 *         description: Informacion no disponible en los 12 meses del año seleccionado, El año no es un dato válido, No existe una estación con el código ingresado
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaMedMensualPorVariable/estacion/{id}/variable/{med}/anio/{anio}:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve una lista de mediciones mensuales de una estación, año específico y variable de medición"
 *     parameters:
 *      - name: id
 *        in: path
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica
 *        required: true
 *      - name: med
 *        in: path
 *        description: El código de la varible de medición
 *        required: true
 *      - name: anio
 *        in: path
 *        description: El año de donde se recolectará los datos de medición mensual
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo_obtencion:
 *                     type: string
 *                     example: AGREG
 *                   obtencion_descripcion:
 *                     type: string
 *                     example: Dato obtenido desde un proceso de agregación
 *                   codigo_de_variable:
 *                     type: string
 *                     example: PC
 *                   variable_descripcion:
 *                     type: string
 *                     example: Precipitación acumulada
 *                   unidades:
 *                     type: string
 *                     example: mm
 *                   unidades_nombre:
 *                     type: string
 *                     example: Milímetros
 *                   valor_1:
 *                     type: number
 *                     example: 0
 *                   valor_2:
 *                     type: number
 *                     example: 0
 *                   valor_3:
 *                     type: number
 *                     example: 0
 *                   valor_4:
 *                     type: number
 *                     example: 0
 *                   valor_5:
 *                     type: number
 *                     example: 0
 *                   valor_6:
 *                     type: number
 *                     example: 0
 *                   valor_7:
 *                     type: number
 *                     example: 0
 *                   valor_8:
 *                     type: number
 *                     example: 0
 *                   valor_9:
 *                     type: number
 *                     example: 0
 *                   valor_10:
 *                     type: number
 *                     example: 0
 *                   valor_11:
 *                     type: number
 *                     example: 0
 *                   valor_12:
 *                     type: number
 *                     example: 0
 *       404:
 *         description: Informacion no disponible en los 12 meses del año seleccionado, El año no es un dato válido, No existe una estación con el código ingresado
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /simheb/listaMedMinutal/estacion/{id}/fechaInicio/{dia1}/{mes1}/{anio1}/fechaFin/{dia2}/{mes2}/{anio2}:
 *   get:
 *     tags:
 *       - SIMHEB
 *     description: "Devuelve una lista de mediciones minutales de una estación y fecha específica"
 *     parameters:
 *      - name: id
 *        in: path
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica
 *        required: true
 *      - name: dia1
 *        in: path
 *        description: El día de la fecha inicio
 *        required: true
 *      - name: mes1
 *        in: path
 *        description: El mes de la fecha de inicio
 *        required: true
 *      - name: anio1
 *        in: path
 *        description: El año de la fecha inicio
 *        required: true
 *      - name: dia2
 *        in: path
 *        description: El día de la fecha fin
 *        required: true
 *      - name: mes2
 *        in: path
 *        description: El mes de la fecha fin
 *        required: true
 *      - name: anio2
 *        in: path
 *        description: El año de la fecha fin
 *        required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo_obtencion:
 *                     type: string
 *                     example: AGREG
 *                   obtencion_descripcion:
 *                     type: string
 *                     example: Dato obtenido desde un proceso de agregación
 *                   codigo_de_variable:
 *                     type: string
 *                     example: PC
 *                   variable_descripcion:
 *                     type: string
 *                     example: Precipitación acumulada
 *                   unidades:
 *                     type: string
 *                     example: mm
 *                   unidades_nombre:
 *                     type: string
 *                     example: Milímetros
 *                   valor_1:
 *                     type: number
 *                     example: 0
 *                   valor_2:
 *                     type: number
 *                     example: 0
 *                   valor_3:
 *                     type: number
 *                     example: 0
 *                   valor_4:
 *                     type: number
 *                     example: 0
 *                   valor_5:
 *                     type: number
 *                     example: 0
 *                   valor_6:
 *                     type: number
 *                     example: 0
 *                   valor_7:
 *                     type: number
 *                     example: 0
 *                   valor_8:
 *                     type: number
 *                     example: 0
 *                   valor_9:
 *                     type: number
 *                     example: 0
 *                   valor_10:
 *                     type: number
 *                     example: 0
 *                   valor_11:
 *                     type: number
 *                     example: 0
 *                   valor_12:
 *                     type: number
 *                     example: 0
 *       404:
 *         description: Informacion no disponible en los 12 meses del año seleccionado, El año no es un dato válido, No existe una estación con el código ingresado
 *       500:
 *         description: Something goes wrong
 */
router.get('/listaMetereologico', listaMeteo);
router.get('/listaHidrologico', listaHidro);
router.get('/listaHidrometereologico', listaHidroMeteo);
router.get('/listaCalidadDeAgua', listaCalidad);
router.get('/listaVariablesUnidades', listaVar);
router.get('/listaProcesosDeObtencion', listaObtencion);
router.get('/listaMedDiaria/estacion/:id/anio/:anio', listaMedDiaria);
router.get('/listaMedDiariaPorVariable/estacion/:id/variable/:med/anio/:anio', listaMedDiariaVariableMed);
router.get('/listaMedDiaria/estacion/:id/mes/:mes/anio/:anio', listaMedDiariaMes);
router.get('/listaMedMensual/estacion/:id/anio/:anio', listaMedMensuales);
router.get('/listaMedMensualPorVariable/estacion/:id/variable/:med/anio/:anio', listaMedMensualesVariableMed);
router.get('/listaMedMinutal/estacion/:id/fechaInicio/:dia1/:mes1/:anio1/fechaFin/:dia2/:mes2/:anio2', listaMedMinutales);
router.get('/listaMedMinutalPorVariable/estacion/:id/variable/:med/fechaInicio/:dia1/:mes1/:anio1/fechaFin/:dia2/:mes2/:anio2', listaMedMinutalesVariable);
export default router;
