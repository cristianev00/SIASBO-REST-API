import {Router} from 'express';
import {pozosDepartamento, pozosParametros, pozosCodigo, pozosCalidad} from '../controllers/siasbo.controller.js';


const router = Router ();
/**
 * @swagger
 * /v1/siasbo/pozos/{departamentoId}:
 *   get:
 *     tags:
 *       - SIASBO
 *     description: "Acceso a datos sobre los pozos por departamento"
 *     parameters:
 *      - name: departamentoId
 *        in: path
 *        schema:
 *               type: integer
 *        description: "Código de departamento {Cochabamba: 1, Beni: 2, La Paz: 3, Potosi: 4, Pando: 5, Oruro: 6, Tarija: 7, Santa Cruz: 8, Chuquisaca: 9}"
 *        required: true
 *      - name: size
 *        in: query
 *        schema:
 *               type: integer
 *               default: 20
 *        description: Tañamo de la página.
 *      - name: page
 *        in: query
 *        schema:
 *               type: integer
 *               default: 1
 *        description: Número de página.
 *      - name: sort
 *        in: query
 *        schema:
 *               type: string
 *               default: ASC
 *        description: Orden de clasificación ASC o DESC.
 *      - name: search
 *        in: query
 *        schema:
 *               type: string
 *        description: Respuesta Parcial con seleccion de atributos.
 *      - name: filter
 *        in: query
 *        schema:
 *               type: string
 *        description: Filtrar respuesta por nombre y valor de atributo Ej. provinciaId=32.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalElements:
 *                   type: integer
 *                 filteredElements:
 *                   type: integer
 *                 numberOfPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 size:
 *                   type: string
 *                 sort:
 *                   type: string
 *                 offset:
 *                   type: integer
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigo:
 *                         type: string
 *                       itemId:
 *                         type: integer
 *                       tipo:
 *                         type: integer
 *                       item_nombre:
 *                         type: string
 *                       departamentoId:
 *                         type: integer
 *                       provinciaId:
 *                         type: integer
 *                       comunidad:
 *                         type: string
 *                       municipioId:
 *                         type: integer
 *                       localidadId:
 *                         type: integer
 *                       localidad:
 *                         type: string
 *                       longitudDec:
 *                         type: string
 *                       latitudDec:
 *                         type: string
 *                       altitud:
 *                         type: string
 *                       utmZona:
 *                         type: string
 *                       acuiferoId:
 *                         type: integer
 *                       epsasId:
 *                         type: integer
 *                       epsasnoregularizadas:
 *                         type: string
 *                       cooperativas:
 *                         type: string
 *                       cuencaId:
 *                         type: integer
 *                       catalogo_cuenca_nombre:
 *                         type: string
 *                       cuencuaestrategicaId:
 *                         type: integer
 *                       catalogo_cuenca_estrategica_nombre:
 *                         type: string
 *                       estado:
 *                         type: string
 *                       codigo_ine:
 *                         type: integer
 *                       dateCreate:
 *                         type: string
 *                       dateUpdate:
 *                         type:  string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /v1/siasbo/parametros:
 *   get:
 *     tags:
 *       - SIASBO
 *     description: "Acceso a datos sobre sobre los parámetros"
 *     parameters:
 *      - name: size
 *        in: query
 *        schema:
 *               type: integer
 *               default: 20
 *        description: Tañamo de la página.
 *      - name: page
 *        in: query
 *        schema:
 *               type: integer
 *               default: 1
 *        description: Número de página.
 *      - name: sort
 *        in: query
 *        schema:
 *               type: string
 *               default: ASC
 *        description: Orden de clasificación ASC o DESC.
 *      - name: search
 *        in: query
 *        schema:
 *               type: string
 *        description: Respuesta Parcial con seleccion de atributos.
 *      - name: filter
 *        in: query
 *        schema:
 *               type: string
 *        description: Filtrar respuesta por nombre y valor de atributo Ej. itemId=1.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalElements:
 *                   type: integer
 *                 filteredElements:
 *                   type: integer
 *                 numberOfPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 size:
 *                   type: string
 *                 sort:
 *                   type: string
 *                 offset:
 *                   type: integer
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: integer
 *                       nombre_compuesto:
 *                         type: string
 *                       activo:
 *                         type: integer
 *                       dateCreate:
 *                         type: string
 *                       dateUpdate:
 *                         type:  string
 *                       calidadparametroId:
 *                         type:  integer
 *                       nombre_parametro:
 *                         type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /v1/siasbo/muestras/{itemCodigo}:
 *   get:
 *     tags:
 *       - SIASBO
 *     description: "Acceso a datos sobre sobre las muestras hechas para control de calidad sobre un pozo "
 *     parameters:
 *      - name: itemCodigo
 *        in: path
 *        schema:
 *               type: string
 *        description: El código de la estación metereológica, hidrológica o hidrometereológica. Ej. 01-02-P-13
 *        required: true
 *      - name: size
 *        in: query
 *        schema:
 *               type: integer
 *               default: 20
 *        description: Tañamo de la página.
 *      - name: page
 *        in: query
 *        schema:
 *               type: integer
 *               default: 1
 *        description: Número de página.
 *      - name: sort
 *        in: query
 *        schema:
 *               type: string
 *               default: ASC
 *        description: Orden de clasificación ASC o DESC.
 *      - name: search
 *        in: query
 *        schema:
 *               type: string
 *        description: Respuesta Parcial con seleccion de atributos.
 *      - name: filter
 *        in: query
 *        schema:
 *               type: string
 *        description: Filtrar respuesta por nombre y valor de atributo Ej. itemId=13.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalElements:
 *                   type: integer
 *                 filteredElements:
 *                   type: integer
 *                 numberOfPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 size:
 *                   type: string
 *                 sort:
 *                   type: string
 *                 offset:
 *                   type: integer
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: integer
 *                       codigo:
 *                         type: string
 *                       monitor_calidad_itemId:
 *                         type: integer
 *                       pozoId:
 *                         type: integer
 *                       codigo_muestra:
 *                         type: string
 *                       fecha_muestreo:
 *                         type: string
 *                       hora_muestreo:
 *                         type: integer
 *                       epocaId:
 *                         type: integer
 *                       entidad:
 *                         type: string
 *                       fecha_analisis:
 *                         type: integer
 *                       nombre_laboratorio:
 *                         type: string
 *                       codigo_laboratorio:
 *                         type: string
 *                       profundidad:
 *                         type: integer
 *                       observaciones:
 *                         type: string
 *                       dateCreate:
 *                         type: string
 *                       dateUpdate:
 *                         type:  string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */

/**
 * @swagger
 * /v1/siasbo/calidad/{itemPozoMonitorCalidad}:
 *   get:
 *     tags:
 *       - SIASBO
 *     description: "Acceso a datos sobre sobre los resultados de calidad del agua de una muestra para un parámetro de calidad"
 *     parameters:
 *      - name: itemPozoMonitorCalidad
 *        in: path
 *        schema:
 *               type: integer
 *        description: Código de identificación de la muestra
 *        required: true
 *      - name: size
 *        in: query
 *        schema:
 *               type: integer
 *               default: 20
 *        description: Tañamo de la página.
 *      - name: page
 *        in: query
 *        schema:
 *               type: integer
 *               default: 1
 *        description: Número de página.
 *      - name: sort
 *        in: query
 *        schema:
 *               type: string
 *               default: ASC
 *        description: Orden de clasificación ASC o DESC.
 *      - name: search
 *        in: query
 *        schema:
 *               type: string
 *        description: Respuesta Parcial con seleccion de atributos.
 *      - name: filter
 *        in: query
 *        schema:
 *               type: string
 *        description: Filtrar respuesta por nombre y valor de atributo Ej. itemId=1.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalElements:
 *                   type: integer
 *                 filteredElements:
 *                   type: integer
 *                 numberOfPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 size:
 *                   type: string
 *                 sort:
 *                   type: string
 *                 offset:
 *                   type: integer
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: integer
 *                       codigo:
 *                         type: string
 *                       fecha_analisis:
 *                         type: integer
 *                       hora_analisis:
 *                         type: integer
 *                       nombre_laboratorio:
 *                         type: string
 *                       itemId_pozo_monitor_calidad:
 *                         type: integer
 *                       calidadId:
 *                         type: integer
 *                       parametroId:
 *                         type: integer
 *                       compuestoId:
 *                         type: integer
 *                       valor:
 *                         type: integer
 *                       observaciones:
 *                         type: string
 *                       dateCreate:
 *                         type: string
 *                       dateUpdate:
 *                         type:  string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Something goes wrong
 */
router.get('/pozos/:departamentoId', pozosDepartamento);
router.get('/parametros', pozosParametros);
router.get('/muestras/:itemCodigo', pozosCodigo);
router.get('/calidad/:itemPozoMonitorCalidad', pozosCalidad);
export default router;
