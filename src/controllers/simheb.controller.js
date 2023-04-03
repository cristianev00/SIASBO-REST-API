import {dbMysql} from '../db.js';
import {dbPostgres} from '../db.js';

// Lista de Estaciones Metereologicas
export const listaMeteo = async (req, res) => {
    try{
        const rows = await dbPostgres.query('SELECT codigo, nombre, latitud, longitud, uri FROM "simheb"."estaciones" WHERE tipo_estacion_id = 1 ORDER BY uri;')
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Estaciones Hidrologicas
export const listaHidro = async (req, res) => {
    try{
        const rows = await dbPostgres.query('SELECT codigo, nombre, latitud, longitud, uri FROM "simheb"."estaciones" WHERE tipo_estacion_id = 2 ORDER BY uri;')
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Estaciones Hidrometeorologicas
export const listaHidroMeteo = async (req, res) => {
    try{
        const rows = await dbPostgres.query('SELECT codigo, nombre, latitud, longitud, uri FROM "simheb"."estaciones" WHERE tipo_estacion_id = 3 ORDER BY uri;')
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Estaciones Calidad de Agua
export const listaCalidad = async (req, res) => {
    try{
        const rows = await dbPostgres.query('SELECT codigo, nombre, latitud, longitud, uri FROM "simheb"."estaciones" WHERE tipo_estacion_id = 4 ORDER BY uri;')
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Variables y Unidades
export const listaVar = async (req, res) => {
    try{
        const rows = await dbPostgres.query('SELECT V.codigo , V.descripcion as codigo_descripcion, U.simbolo as unidad, U.nombre as unidad_nombre FROM "simheb"."monitoreo_variables" V JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id;')
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Procesos de Obtención 
export const listaObtencion = async (req, res) => {
    try{
        const rows = await dbPostgres.query('SELECT codigo, descripcion FROM "simheb"."monitoreo_procesos_obtencion";')
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Diarias por año
export const listaMedDiaria = async (req, res) => {
    try{
        if(isNaN(req.params.anio)){
            return res.status(404).json({
                message: 'El año no es un dato válido'
            });
        }
        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);
        const rows = await dbPostgres.query(`SELECT B.codigo as codigo_obtencion, B.descripcion as obtencion_descripcion, V.codigo as codigo_de_variable, 
        V.descripcion as variable_descripcion, U.simbolo as unidades, U.nombre as unidades_nombre, valor_1, valor_2, valor_3, valor_4, valor_5, valor_6,
        valor_7, valor_8, valor_9, valor_10, valor_11, valor_12,
        valor_13, valor_14, valor_15, valor_16, valor_17, valor_18,
        valor_19, valor_20, valor_21, valor_22, valor_23, valor_24,
        valor_25, valor_26, valor_27, valor_28, valor_29, valor_30,
        valor_31,
        CAST(año || '-' || mes || '-01' AS TIMESTAMP WITHOUT TIME ZONE) as fecha
        FROM simheb.monitoreo_series_diarias
        JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
        JOIN "simheb"."monitoreo_procesos_obtencion" B ON proceso_obtencion_id = B.id
        JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
        WHERE
        monitoreo_series_diarias.uri = '${uri.uri}'
        AND proceso_obtencion_id = 6
        AND año = ${req.params.anio}
        AND (
        valor_1 IS NOT NULL OR valor_2 IS NOT NULL OR valor_3 IS NOT NULL
        OR valor_4 IS NOT NULL OR valor_5 IS NOT NULL OR valor_6 IS NOT NULL
        OR valor_7 IS NOT NULL OR valor_8 IS NOT NULL OR valor_9 IS NOT NULL
        OR valor_10 IS NOT NULL OR valor_11 IS NOT NULL OR valor_12 IS NOT NULL
        OR valor_13 IS NOT NULL OR valor_14 IS NOT NULL OR valor_15 IS NOT NULL
        OR valor_16 IS NOT NULL OR valor_17 IS NOT NULL OR valor_18 IS NOT NULL
        OR valor_19 IS NOT NULL OR valor_20 IS NOT NULL OR valor_21 IS NOT NULL
        OR valor_22 IS NOT NULL OR valor_23 IS NOT NULL OR valor_24 IS NOT NULL
        OR valor_25 IS NOT NULL OR valor_26 IS NOT NULL OR valor_27 IS NOT NULL
        OR valor_28 IS NOT NULL OR valor_29 IS NOT NULL OR valor_30 IS NOT NULL
        OR valor_31 IS NOT NULL
        )
        order by fecha desc;`)
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Diarias por año y por variable de medición
export const listaMedDiariaVariableMed = async (req, res) => {
    try{
        if(isNaN(req.params.anio)){
            return res.status(404).json({
                message: 'El año no es un dato válido'
            });
        }
        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);
        let varMed = await verificarVariableMed(req.params.med);

        if(varMed == 1){
            return res.status(404).json({
                message: 'No existe el código de variable de medición'
            });
        }
        const rows = await dbPostgres.query(`SELECT B.codigo as codigo_obtencion, B.descripcion as obtencion_descripcion, V.codigo as codigo_de_variable, 
        V.descripcion as variable_descripcion, U.simbolo as unidades, U.nombre as unidades_nombre, valor_1, valor_2, valor_3, valor_4, valor_5, valor_6,
        valor_7, valor_8, valor_9, valor_10, valor_11, valor_12,
        valor_13, valor_14, valor_15, valor_16, valor_17, valor_18,
        valor_19, valor_20, valor_21, valor_22, valor_23, valor_24,
        valor_25, valor_26, valor_27, valor_28, valor_29, valor_30,
        valor_31,
        CAST(año || '-' || mes || '-01' AS TIMESTAMP WITHOUT TIME ZONE) as fecha
        FROM simheb.monitoreo_series_diarias
        JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
        JOIN "simheb"."monitoreo_procesos_obtencion" B ON proceso_obtencion_id = B.id
        JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
        WHERE
        variable_id = '${varMed.id}' AND monitoreo_series_diarias.uri = '${uri.uri}'
        AND proceso_obtencion_id = 6
        AND año = ${req.params.anio}
        AND (
        valor_1 IS NOT NULL OR valor_2 IS NOT NULL OR valor_3 IS NOT NULL
        OR valor_4 IS NOT NULL OR valor_5 IS NOT NULL OR valor_6 IS NOT NULL
        OR valor_7 IS NOT NULL OR valor_8 IS NOT NULL OR valor_9 IS NOT NULL
        OR valor_10 IS NOT NULL OR valor_11 IS NOT NULL OR valor_12 IS NOT NULL
        OR valor_13 IS NOT NULL OR valor_14 IS NOT NULL OR valor_15 IS NOT NULL
        OR valor_16 IS NOT NULL OR valor_17 IS NOT NULL OR valor_18 IS NOT NULL
        OR valor_19 IS NOT NULL OR valor_20 IS NOT NULL OR valor_21 IS NOT NULL
        OR valor_22 IS NOT NULL OR valor_23 IS NOT NULL OR valor_24 IS NOT NULL
        OR valor_25 IS NOT NULL OR valor_26 IS NOT NULL OR valor_27 IS NOT NULL
        OR valor_28 IS NOT NULL OR valor_29 IS NOT NULL OR valor_30 IS NOT NULL
        OR valor_31 IS NOT NULL
        )
        order by fecha desc;`)
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Not Found'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Diarias por mes
export const listaMedDiariaMes = async (req, res) => {
    try{
        if(isNaN(req.params.anio)){
            return res.status(404).json({
                message: 'El año no es un dato válido'
            });
        };
        if(isNaN(req.params.mes)){
            return res.status(404).json({
                message: 'El mes no es un dato válido'
            });
        }
        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);
        const rows = await dbPostgres.query(`SELECT B.codigo as codigo_obtencion, B.descripcion as obtencion_descripcion, V.codigo as codigo_de_variable, 
        V.descripcion as variable_descripcion, U.simbolo as unidades, U.nombre as unidades_nombre, valor_1, valor_2, valor_3, valor_4, valor_5, valor_6,
        valor_7, valor_8, valor_9, valor_10, valor_11, valor_12,
        valor_13, valor_14, valor_15, valor_16, valor_17, valor_18,
        valor_19, valor_20, valor_21, valor_22, valor_23, valor_24,
        valor_25, valor_26, valor_27, valor_28, valor_29, valor_30,
        valor_31,
        CAST(año || '-' || mes || '-01' AS TIMESTAMP WITHOUT TIME ZONE) as fecha
        FROM simheb.monitoreo_series_diarias
        JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
        JOIN "simheb"."monitoreo_procesos_obtencion" B ON proceso_obtencion_id = B.id
        JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
        WHERE
        monitoreo_series_diarias.uri = '${uri.uri}'
        AND proceso_obtencion_id = 6
        AND año = ${req.params.anio}
        AND mes = ${req.params.mes}
        AND (
        valor_1 IS NOT NULL OR valor_2 IS NOT NULL OR valor_3 IS NOT NULL
        OR valor_4 IS NOT NULL OR valor_5 IS NOT NULL OR valor_6 IS NOT NULL
        OR valor_7 IS NOT NULL OR valor_8 IS NOT NULL OR valor_9 IS NOT NULL
        OR valor_10 IS NOT NULL OR valor_11 IS NOT NULL OR valor_12 IS NOT NULL
        OR valor_13 IS NOT NULL OR valor_14 IS NOT NULL OR valor_15 IS NOT NULL
        OR valor_16 IS NOT NULL OR valor_17 IS NOT NULL OR valor_18 IS NOT NULL
        OR valor_19 IS NOT NULL OR valor_20 IS NOT NULL OR valor_21 IS NOT NULL
        OR valor_22 IS NOT NULL OR valor_23 IS NOT NULL OR valor_24 IS NOT NULL
        OR valor_25 IS NOT NULL OR valor_26 IS NOT NULL OR valor_27 IS NOT NULL
        OR valor_28 IS NOT NULL OR valor_29 IS NOT NULL OR valor_30 IS NOT NULL
        OR valor_31 IS NOT NULL
        )
        order by fecha desc;`)
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Informacion no disponible en el mes'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Mensuales
export const listaMedMensuales = async (req, res) => {
    try{
        if(isNaN(req.params.anio)){
            return res.status(404).json({
                message: 'El año no es un dato válido'
            });
        };
        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);
        const rows = await dbPostgres.query(`
        SELECT B.codigo as codigo_obtencion, B.descripcion as obtencion_descripcion, V.codigo as codigo_de_variable, 
										V.descripcion as variable_descripcion, U.simbolo as unidades, U.nombre as unidades_nombre, 
										valor_1, valor_2, valor_3, valor_4, valor_5, valor_6,
										valor_7, valor_8, valor_9, valor_10, valor_11, valor_12
							FROM simheb.monitoreo_series_mensuales
						  JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
							JOIN "simheb"."monitoreo_procesos_obtencion" B ON proceso_obtencion_id = B.id
							JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
							WHERE
								monitoreo_series_mensuales.uri = '${uri.uri}'
								AND proceso_obtencion_id = 6
								AND año = ${req.params.anio}
								AND (
									valor_1 IS NOT NULL OR valor_2 IS NOT NULL OR valor_3 IS NOT NULL
									OR valor_4 IS NOT NULL OR valor_5 IS NOT NULL OR valor_6 IS NOT NULL
									OR valor_7 IS NOT NULL OR valor_8 IS NOT NULL OR valor_9 IS NOT NULL
									OR valor_10 IS NOT NULL OR valor_11 IS NOT NULL OR valor_12 IS NOT NULL
								);
								
        `)
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Informacion no disponible en los 12 meses del año seleccionado'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Mensuales por Variable
export const listaMedMensualesVariableMed = async (req, res) => {
    try{
        if(isNaN(req.params.anio)){
            return res.status(404).json({
                message: 'El año no es un dato válido'
            });
        };
        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);
        let varMed = await verificarVariableMed(req.params.med);

        if(varMed == 1){
            return res.status(404).json({
                message: 'No existe el código de variable de medición'
            });
        }
        const rows = await dbPostgres.query(`
        SELECT B.codigo as codigo_obtencion, B.descripcion as obtencion_descripcion, V.codigo as codigo_de_variable, 
										V.descripcion as variable_descripcion, U.simbolo as unidades, U.nombre as unidades_nombre, 
										valor_1, valor_2, valor_3, valor_4, valor_5, valor_6,
										valor_7, valor_8, valor_9, valor_10, valor_11, valor_12
							FROM simheb.monitoreo_series_mensuales
						  JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
							JOIN "simheb"."monitoreo_procesos_obtencion" B ON proceso_obtencion_id = B.id
							JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
							WHERE
                                variable_id = '${varMed.id}' AND monitoreo_series_mensuales.uri = '${uri.uri}'
								AND proceso_obtencion_id = 6
								AND año = ${req.params.anio}
								AND (
									valor_1 IS NOT NULL OR valor_2 IS NOT NULL OR valor_3 IS NOT NULL
									OR valor_4 IS NOT NULL OR valor_5 IS NOT NULL OR valor_6 IS NOT NULL
									OR valor_7 IS NOT NULL OR valor_8 IS NOT NULL OR valor_9 IS NOT NULL
									OR valor_10 IS NOT NULL OR valor_11 IS NOT NULL OR valor_12 IS NOT NULL
								);
								
        `)
        
        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Informacion no disponible en los 12 meses del año seleccionado'
        });

        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Minutales
export const listaMedMinutales = async (req, res) => {
    try{

        const date1 = new Date(`${req.params.mes1}/${req.params.dia1}/${req.params.anio1}`);
        const date2 = new Date(`${req.params.mes2}/${req.params.dia2}/${req.params.anio2}`);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if(diffDays > 5){
            return res.status(404).json({
                message: 'No se puede solicitar datos minutales que sobrepasen 5 días'
            });
        };

        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);

        const rows = await dbPostgres.query(`SELECT V.codigo as codigo_de_variable, V.descripcion as variable_descripcion,
        U.simbolo as unidades, U.nombre as unidades_nombre, valor, fecha_hora
        FROM "simheb"."monitoreo_datos_medidos"
        JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
        JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
        WHERE uri = '${uri.uri}' AND fecha_hora BETWEEN '${req.params.anio1}-${req.params.mes1}-${req.params.dia1} 00:00:00' AND '${req.params.anio2}-${req.params.mes2}-${req.params.dia2} 00:00:00'
        AND proceso_obtencion_id = 1 AND valor IS NOT NULL;`);

        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Informacion no disponible en la fecha indicada'
        });
        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// Lista de Mediciones Minutales por variable de medición
export const listaMedMinutalesVariable = async (req, res) => {
    try{

        const date1 = new Date(`${req.params.mes1}/${req.params.dia1}/${req.params.anio1}`);
        const date2 = new Date(`${req.params.mes2}/${req.params.dia2}/${req.params.anio2}`);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if(diffDays > 31){
            return res.status(404).json({
                message: 'No se puede solicitar datos minutales que sobrepasen 10 días'
            });
        };

        let uri = await verificarEstacion(req.params.id);

        if(uri == 1){
            return res.status(404).json({
                message: 'No existe una estación con el código ingresado'
            });
        }
        //console.log(uri);

        let varMed = await verificarVariableMed(req.params.med);

        if(varMed == 1){
            return res.status(404).json({
                message: 'No existe el código de variable de medición'
            });
        }
        //console.log(uri);

        const rows = await dbPostgres.query(`SELECT V.codigo as codigo_de_variable, V.descripcion as variable_descripcion,
        U.simbolo as unidades, U.nombre as unidades_nombre, valor, fecha_hora
        FROM "simheb"."monitoreo_datos_medidos"
        JOIN "simheb"."monitoreo_variables" V ON variable_id = V.id
        JOIN "simheb"."monitoreo_unidades" U ON V.unidad_id = U.id
        WHERE uri = '${uri.uri}' AND variable_id = '${varMed.id}' AND fecha_hora BETWEEN '${req.params.anio1}-${req.params.mes1}-${req.params.dia1} 00:00:00' AND '${req.params.anio2}-${req.params.mes2}-${req.params.dia2} 00:00:00'
        AND proceso_obtencion_id = 1 AND valor IS NOT NULL;`);

        if(rows.rows.length <= 0) return res.status(404).json({
            message: 'Informacion no disponible en la fecha indicada'
        });
        //const rowsJson = Object.assign({}, rows.rows);

        res.json(rows.rows);
    } catch(error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
};
// funcion para verificar el codigo de estacion
async function verificarEstacion(id) {
    let error = 0;
    const rows = await dbPostgres.query(`SELECT uri FROM "simheb"."estaciones" WHERE codigo = '${id}';`);

    if(rows.rows.length <= 0){
        error = 1;
        return error
    }
    return rows.rows[0]

};
// funcion para verificar variable de medición
async function verificarVariableMed(id) {
    let error = 0;
    const rows = await dbPostgres.query(`SELECT id FROM "simheb"."monitoreo_variables" WHERE codigo = '${id}';`);

    if(rows.rows.length <= 0){
        error = 1;
        return error
    }
    return rows.rows[0]

};


