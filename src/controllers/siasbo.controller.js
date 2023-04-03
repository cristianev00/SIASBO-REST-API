import {
    dbMysql
} from '../db.js';
import {
    dbPostgres
} from '../db.js';

export const pozosDepartamento = async (req, res) => {

    try {

        let size = 20;
        let page = 1;
        let sort = "ASC";
        let search = false;
        let filterNum = false;
        let searchValue = "";

        //Validacion de size
        if (req.query.size === undefined || req.query.size == 0) {
            size = 20;
        } else {
            if (isNaN(req.query.size)) {
                return res.status(404).json({
                    message: `Size is not a number`
                });
            } else {
                size = req.query.size;
            }
        }
        //validacion de page
        if (req.query.page === undefined || req.query.page == 0) {
            page = 1;
        } else {
            if (isNaN(req.query.page)) {
                return res.status(404).json({
                    message: `Page is not a number`
                });
            } else {
                page = req.query.page;
            }
        }
        //validacion de sort
        if (req.query.sort === undefined) {
            sort = 'ASC';
        } else {
            if (['ASC', 'DESC'].includes(req.query.sort)) {
                sort = req.query.sort;
            } else {
                return res.status(404).json({
                    message: `It is not a valid parameter ${req.query.sort}`
                });
            }
        }
        //validacion departamentoId
        if (isNaN(req.params.departamentoId)) {
            return res.status(404).json({
                message: `It is not a valid parameter ${req.params.departamentoId}`
            });
        }

        let uri = await verificarDepartamento(req.params.departamentoId);

        if (uri == 1) {
            return res.status(404).json({
                message: `There is no ${req.params.departamentoId} departamentoId`
            });
        }

        if (req.query.search !== undefined) {
            searchValue = req.query.search;
            searchValue = searchValue.split(',');
            searchValue = searchValue.map(el => el.trim())
            //console.log(searchValue);
            search = true;
        }

        let sqlTotal = "";

        sqlTotal = `SELECT COUNT(*) AS numberOfElements FROM (mmaya_siasbo.item INNER JOIN mmaya_siasbo.catalogo_cuenca ON mmaya_siasbo.item.cuencaId = mmaya_siasbo.catalogo_cuenca.itemId) INNER JOIN mmaya_siasbo.catalogo_cuenca_estrategica ON mmaya_siasbo.item.cuencaestrategicaId = mmaya_siasbo.catalogo_cuenca_estrategica.itemId
        WHERE item.departamentoId = ${req.params.departamentoId} ORDER BY item.codigo;`;

        const [total] = await dbMysql.query(sqlTotal);
        let totalElements = total[0];
        let valorElements = totalElements.numberOfElements;
        let numberOfPages = Math.ceil(valorElements / size);
        if (page > numberOfPages) {
            return res.status(404).json({
                message: `The last page number is ${numberOfPages}`
            });
        }
        let startLimit = (page - 1) * size;

        let sqlRows = "";

        sqlRows = `SELECT item.codigo, item.itemId, item.tipo, item.nombre as item_nombre, item.departamentoId, item.provinciaId, item.comunidad, item.municipioId, item.localidadId, item.comunidad, item.localidad, item.longitudDec, item.latitudDec, item.altitud, item.utmZona, item.acuiferoId, item.epsasId, item.epsasnoregularizadas, item.cooperativas, item.cuencaId, catalogo_cuenca.nombre as catalogo_cuenca_nombre, item.cuencaestrategicaId, catalogo_cuenca_estrategica.nombre as catalogo_cuenca_estrategica_nombre, item.estado, item.codigo_ine, item.dateCreate, item.dateUpdate
        FROM (mmaya_siasbo.item INNER JOIN mmaya_siasbo.catalogo_cuenca ON mmaya_siasbo.item.cuencaId = mmaya_siasbo.catalogo_cuenca.itemId) INNER JOIN mmaya_siasbo.catalogo_cuenca_estrategica ON mmaya_siasbo.item.cuencaestrategicaId = mmaya_siasbo.catalogo_cuenca_estrategica.itemId
        WHERE item.departamentoId = ${req.params.departamentoId} ORDER BY item.codigo ${sort} LIMIT ${startLimit},${size};`;


        const [rows] = await dbMysql.query(sqlRows);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });


        let filterData, filterSlipt, firstFilter, secondFilter;
        let searchResult;

        if (req.query.filter && !req.query.search) {

            filterSlipt = req.query.filter.split('=');

            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = rows.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;

        } else if (!req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }
                //container[searchValue] = item[`${searchValue}`];
                return container;
            });
        } else if (!req.query.filter && !req.query.search) {
            searchResult = rows;
        } else if (req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }

                return container;
            });

            filterSlipt = req.query.filter.split('=');
            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = searchResult.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;
        }


        const respuesta = {
            totalElements: totalElements.numberOfElements,
            filteredElements: searchResult.length,
            numberOfPages,
            currentPage: parseInt(page),
            size,
            sort,
            offset: startLimit,
            content: searchResult
        }
        res.json(respuesta);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const pozosParametros = async (req, res) => {

    try {
        let size = 20;
        let page = 1;
        let sort = "ASC";
        let search = false;
        let filterNum = false;
        let searchValue = "";

        //Validacion de size
        if (req.query.size === undefined || req.query.size == 0) {
            size = 20;
        } else {
            if (isNaN(req.query.size)) {
                return res.status(404).json({
                    message: `Size is not a number`
                });
            } else {
                size = req.query.size;
            }
        }
        //validacion de page
        if (req.query.page === undefined || req.query.page == 0) {
            page = 1;
        } else {
            if (isNaN(req.query.page)) {
                return res.status(404).json({
                    message: `Page is not a number`
                });
            } else {
                page = req.query.page;
            }
        }
        //validacion de sort
        if (req.query.sort === undefined) {
            sort = 'ASC';
        } else {
            if (['ASC', 'DESC'].includes(req.query.sort)) {
                sort = req.query.sort;
            } else {
                return res.status(404).json({
                    message: `It is not a valid parameter ${req.query.sort}`
                });
            }
        }
        if (req.query.search !== undefined) {
            searchValue = req.query.search;
            searchValue = searchValue.split(',');
            searchValue = searchValue.map(el => el.trim())
            //console.log(searchValue);
            search = true;
        }

        let sqlTotal = "";

        sqlTotal = `SELECT COUNT(*) AS numberOfElements FROM mmaya_siasbo.catalogo_pozo_monitor_calidad_parametro INNER JOIN mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto ON mmaya_siasbo.catalogo_pozo_monitor_calidad_parametro.itemId = mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto.calidadparametroId
           ORDER BY catalogo_pozo_monitor_calidad_compuesto.itemId;`;

        const [total] = await dbMysql.query(sqlTotal);

        let totalElements = total[0];
        let valorElements = totalElements.numberOfElements;
        let numberOfPages = Math.ceil(valorElements / size);
        if (page > numberOfPages) {
            return res.status(404).json({
                message: `The last page number is ${numberOfPages}`
            });
        }
        let startLimit = (page - 1) * size;

        let sqlRows = "";


        sqlRows = `SELECT catalogo_pozo_monitor_calidad_compuesto.itemId, catalogo_pozo_monitor_calidad_compuesto.nombre as nombre_compuesto, catalogo_pozo_monitor_calidad_compuesto.activo, catalogo_pozo_monitor_calidad_compuesto.dateCreate, catalogo_pozo_monitor_calidad_compuesto.dateUpdate, catalogo_pozo_monitor_calidad_compuesto.calidadparametroId, catalogo_pozo_monitor_calidad_parametro.nombre as nombre_parametro, catalogo_pozo_monitor_calidad_compuesto.activo, catalogo_pozo_monitor_calidad_compuesto.dateCreate, catalogo_pozo_monitor_calidad_compuesto.dateUpdate
            FROM mmaya_siasbo.catalogo_pozo_monitor_calidad_parametro INNER JOIN mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto ON mmaya_siasbo.catalogo_pozo_monitor_calidad_parametro.itemId = mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto.calidadparametroId
            ORDER BY catalogo_pozo_monitor_calidad_compuesto.itemId ${sort} LIMIT ${startLimit},${size};`;

        const [rows] = await dbMysql.query(sqlRows);


        if (rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        let filterData, filterSlipt, firstFilter, secondFilter;
        let searchResult;

        if (req.query.filter && !req.query.search) {

            filterSlipt = req.query.filter.split('=');

            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = rows.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;

        } else if (!req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }
                //container[searchValue] = item[`${searchValue}`];
                return container;
            });
        } else if (!req.query.filter && !req.query.search) {
            searchResult = rows;
        } else if (req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }

                return container;
            });

            filterSlipt = req.query.filter.split('=');
            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = searchResult.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;
        }

        const respuesta = {
            totalElements: totalElements.numberOfElements,
            filteredElements: searchResult.length,
            numberOfPages,
            currentPage: parseInt(page),
            size,
            sort,
            offset: startLimit,
            content: searchResult
        }
        res.json(respuesta);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}


export const pozosCodigo = async (req, res) => {

    try {
        let size = 20;
        let page = 1;
        let sort = "ASC";
        let search = false;
        let filterNum = false;
        let searchValue = "";

        //Validacion de size
        if (req.query.size === undefined || req.query.size == 0) {
            size = 20;
        } else {
            if (isNaN(req.query.size)) {
                return res.status(404).json({
                    message: `Size is not a number`
                });
            } else {
                size = req.query.size;
            }
        }
        //validacion de page
        if (req.query.page === undefined || req.query.page == 0) {
            page = 1;
        } else {
            if (isNaN(req.query.page)) {
                return res.status(404).json({
                    message: `Page is not a number`
                });
            } else {
                page = req.query.page;
            }
        }
        //validacion de sort
        if (req.query.sort === undefined) {
            sort = 'ASC';
        } else {
            if (['ASC', 'DESC'].includes(req.query.sort)) {
                sort = req.query.sort;
            } else {
                return res.status(404).json({
                    message: `It is not a valid parameter ${req.query.sort}`
                });
            }
        }
        //validacion itemCodigo

        let uri = await verificarCodigo(req.params.itemCodigo);

        if (uri == 1) {
            return res.status(404).json({
                message: `There is no ${req.params.itemCodigo} itemCodigo`
            });
        }
        if (req.query.search !== undefined) {
            searchValue = req.query.search;
            searchValue = searchValue.split(',');
            searchValue = searchValue.map(el => el.trim())
            //console.log(searchValue);
            search = true;
        }

        let sqlTotal = "";


        sqlTotal = `SELECT COUNT(*) AS numberOfElements
           FROM mmaya_siasbo.item INNER JOIN mmaya_siasbo.item_pozo_monitor_calidad ON mmaya_siasbo.item.itemId = mmaya_siasbo.item_pozo_monitor_calidad.pozoId
           WHERE item.codigo ="${req.params.itemCodigo}" ORDER BY item.itemId, item_pozo_monitor_calidad.fecha_muestreo;`;

        const [total] = await dbMysql.query(sqlTotal);

        let totalElements = total[0];
        let valorElements = totalElements.numberOfElements;
        let numberOfPages = Math.ceil(valorElements / size);
        if (page > numberOfPages) {
            return res.status(404).json({
                message: `The last page number is ${numberOfPages}`
            });
        }
        let startLimit = (page - 1) * size;

        let sqlRows = "";

        sqlRows = `SELECT item.itemId, item.codigo, item_pozo_monitor_calidad.itemId as monitor_calidad_itemId, item_pozo_monitor_calidad.pozoId, item_pozo_monitor_calidad.codigo_muestra, item_pozo_monitor_calidad.fecha_muestreo, item_pozo_monitor_calidad.hora_muestreo, item_pozo_monitor_calidad.epocaId, item_pozo_monitor_calidad.entidad, item_pozo_monitor_calidad.fecha_analisis, item_pozo_monitor_calidad.nombre_laboratorio, item_pozo_monitor_calidad.codigo_laboratorio, item_pozo_monitor_calidad.profundidad, item_pozo_monitor_calidad.observaciones, item_pozo_monitor_calidad.dateCreate, item_pozo_monitor_calidad.dateUpdate
            FROM mmaya_siasbo.item INNER JOIN mmaya_siasbo.item_pozo_monitor_calidad ON mmaya_siasbo.item.itemId = mmaya_siasbo.item_pozo_monitor_calidad.pozoId
            WHERE item.codigo ="${req.params.itemCodigo}" ORDER BY item.itemId, item_pozo_monitor_calidad.fecha_muestreo ${sort} LIMIT ${startLimit},${size};`;

        const [rows] = await dbMysql.query(sqlRows);


        if (rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        let filterData, filterSlipt, firstFilter, secondFilter;
        let searchResult;

        if (req.query.filter && !req.query.search) {

            filterSlipt = req.query.filter.split('=');

            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = rows.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;

        } else if (!req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }
                //container[searchValue] = item[`${searchValue}`];
                return container;
            });
        } else if (!req.query.filter && !req.query.search) {
            searchResult = rows;
        } else if (req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }

                return container;
            });

            filterSlipt = req.query.filter.split('=');
            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = searchResult.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;
        }

        const respuesta = {
            totalElements: totalElements.numberOfElements,
            filteredElements: searchResult.length,
            numberOfPages,
            currentPage: parseInt(page),
            size,
            sort,
            offset: startLimit,
            content: searchResult
        }
        res.json(respuesta);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const pozosCalidad = async (req, res) => {

    try {
        let size = 20;
        let page = 1;
        let sort = "ASC";
        let search = false;
        let filterNum = false;
        let searchValue = "";

        //Validacion de size
        if (req.query.size === undefined || req.query.size == 0) {
            size = 20;
        } else {
            if (isNaN(req.query.size)) {
                return res.status(404).json({
                    message: `Size is not a number`
                });
            } else {
                size = req.query.size;
            }
        }
        //validacion de page
        if (req.query.page === undefined || req.query.page == 0) {
            page = 1;
        } else {
            if (isNaN(req.query.page)) {
                return res.status(404).json({
                    message: `Page is not a number`
                });
            } else {
                page = req.query.page;
            }
        }
        //validacion de sort
        if (req.query.sort === undefined) {
            sort = 'ASC';
        } else {
            if (['ASC', 'DESC'].includes(req.query.sort)) {
                sort = req.query.sort;
            } else {
                return res.status(404).json({
                    message: `It is not a valid parameter ${req.query.sort}`
                });
            }
        }
        //validacion departamentoId
        if (isNaN(req.params.itemPozoMonitorCalidad)) {
            return res.status(404).json({
                message: `It is not a valid parameter ${req.params.departamentoId}`
            });
        }
        if (req.query.search !== undefined) {
            searchValue = req.query.search;
            searchValue = searchValue.split(',');
            searchValue = searchValue.map(el => el.trim())
            //console.log(searchValue);
            search = true;
        }

        let sqlTotal = "";


        sqlTotal = `SELECT COUNT(*) AS numberOfElements
           FROM (mmaya_siasbo.item INNER JOIN mmaya_siasbo.item_pozo_monitor_calidad ON mmaya_siasbo.item.itemId = mmaya_siasbo.item_pozo_monitor_calidad.pozoId) INNER JOIN (mmaya_siasbo.item_pozo_monitor_calidad_dato INNER JOIN mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto ON mmaya_siasbo.item_pozo_monitor_calidad_dato.compuestoId = mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto.itemId) ON mmaya_siasbo.item_pozo_monitor_calidad.itemId = mmaya_siasbo.item_pozo_monitor_calidad_dato.calidadId
           WHERE item_pozo_monitor_calidad.itemId = ${req.params.itemPozoMonitorCalidad} ORDER BY item.itemId, item_pozo_monitor_calidad.fecha_analisis;`;

        const [total] = await dbMysql.query(sqlTotal);

        let totalElements = total[0];
        let valorElements = totalElements.numberOfElements;
        let numberOfPages = Math.ceil(valorElements / size);
        if (page > numberOfPages) {
            return res.status(404).json({
                message: `The last page number is ${numberOfPages}`
            });
        }
        let startLimit = (page - 1) * size;

        let sqlRows = "";

        sqlRows = `SELECT item.itemId, item.codigo, item_pozo_monitor_calidad.fecha_analisis, item_pozo_monitor_calidad.hora_analisis, item_pozo_monitor_calidad.nombre_laboratorio, item_pozo_monitor_calidad.itemId AS itemId_pozo_monitor_calidad, item_pozo_monitor_calidad_dato.calidadId, item_pozo_monitor_calidad_dato.parametroId, item_pozo_monitor_calidad_dato.compuestoId, item_pozo_monitor_calidad_dato.valor, item_pozo_monitor_calidad_dato.observaciones, item_pozo_monitor_calidad_dato.dateCreate, item_pozo_monitor_calidad_dato.dateUpdate
            FROM (mmaya_siasbo.item INNER JOIN mmaya_siasbo.item_pozo_monitor_calidad ON mmaya_siasbo.item.itemId = mmaya_siasbo.item_pozo_monitor_calidad.pozoId) INNER JOIN (mmaya_siasbo.item_pozo_monitor_calidad_dato INNER JOIN mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto ON mmaya_siasbo.item_pozo_monitor_calidad_dato.compuestoId = mmaya_siasbo.catalogo_pozo_monitor_calidad_compuesto.itemId) ON mmaya_siasbo.item_pozo_monitor_calidad.itemId = mmaya_siasbo.item_pozo_monitor_calidad_dato.calidadId
            WHERE item_pozo_monitor_calidad.itemId = ${req.params.itemPozoMonitorCalidad} ORDER BY item.itemId, item_pozo_monitor_calidad.fecha_analisis ${sort} LIMIT ${startLimit},${size};`;

        const [rows] = await dbMysql.query(sqlRows);


        if (rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        let filterData, filterSlipt, firstFilter, secondFilter;
        let searchResult;

        if (req.query.filter && !req.query.search) {

            filterSlipt = req.query.filter.split('=');

            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = rows.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;

        } else if (!req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }
                //container[searchValue] = item[`${searchValue}`];
                return container;
            });
        } else if (!req.query.filter && !req.query.search) {
            searchResult = rows;
        } else if (req.query.filter && search === true) {
            searchResult = rows.map(item => {
                const container = {};
                for (const element of searchValue) {
                    container[element] = item[`${element}`];
                }

                return container;
            });

            filterSlipt = req.query.filter.split('=');
            firstFilter = filterSlipt[0].trim();
            secondFilter = filterSlipt[1].trim();

            filterData = searchResult.filter(el => el[`${firstFilter}`] == secondFilter)

            searchResult = filterData;
        }

        const respuesta = {
            totalElements: totalElements.numberOfElements,
            filteredElements: searchResult.length,
            numberOfPages,
            currentPage: parseInt(page),
            size,
            sort,
            offset: startLimit,
            content: searchResult
        }

        res.json(respuesta);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}


// funcion para verificar lista de departamentos
async function verificarDepartamento(id) {
    let error = 0;
    const [rows] = await dbMysql.query(`SELECT nombre FROM vrhr_territorio.departamento WHERE itemId = ${id};`);

    if (rows.length <= 0) {
        error = 1;
        return error
    }
    return rows[0]

};

// funcion para verificar item codigo
async function verificarCodigo(id) {
    let error = 0;
    const [rows] = await dbMysql.query(`SELECT item.codigo
    FROM mmaya_siasbo.item INNER JOIN mmaya_siasbo.item_pozo_monitor_calidad ON mmaya_siasbo.item.itemId = mmaya_siasbo.item_pozo_monitor_calidad.pozoId
    WHERE item.codigo = "${id}" ORDER BY item.itemId, item_pozo_monitor_calidad.fecha_muestreo;`);

    if (rows.length <= 0) {
        error = 1;
        return error
    }
    return rows[0]

};