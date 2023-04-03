import moment from 'moment';
import redis from 'redis';

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

const WINDOW_SIZE_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT = 105;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

export const customRedisRateLimiter = async (req, res, next) => {
    
  await redisClient.connect();
  try {
    // REvisar los clientes existentes en REDIS
    if (!redisClient) {
      throw new Error('El servidor REDIS no esta disponible!');
      process.exit(1);
    }
    // fetch todos los records del actual Usuario en base de su IP address,  se retorna null si no existe records
    const record = await redisClient.get(req.ip);
    const currentRequestTime = moment();
    console.log(record);
    //  Si no existe records se crea y guarda en REDIS
    if (record == null) {
      let newRecord = [];
      let requestLog = {
        requestTimeStamp: currentRequestTime.unix(),
        requestCount: 1,
      };
      newRecord.push(requestLog);
      await redisClient.set(req.ip, JSON.stringify(newRecord));
      next();
    }else{
    // SI existe record se calcula el número de requests que hizo el usuario
    let data = JSON.parse(record);
    let windowStartTimestamp = moment().subtract(WINDOW_SIZE_IN_HOURS, 'hours').unix();
    let requestsWithinWindow = data.filter((entry) => {
      return entry.requestTimeStamp > windowStartTimestamp;
    });
    console.log('requestsWithinWindow', requestsWithinWindow);
    let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
      return accumulator + entry.requestCount;
    }, 0);
    // Si el numero de requests son mayores o iguales al limite se returna error
    if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
      res.status(429).json({message:`Se excedieron las ${MAX_WINDOW_REQUEST_COUNT} requests dentro del límite de ${WINDOW_SIZE_IN_HOURS} horas!`});
    } else {
      // Si el numero de requests es menor al limite se da paso a una entrada
      let lastRequestLog = data[data.length - 1];
      let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime.subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours').unix();
      //  Si el intervalo no paso desde el ultmo request log se incrementa el contador
      if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
        lastRequestLog.requestCount++;
        data[data.length - 1] = lastRequestLog;
      } else {
        //  Si el intevalo fenecio se crea un timestamp log para el nuevo usuario
        data.push({
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1,
        });
      }
      await redisClient.set(req.ip, JSON.stringify(data));
      next();
    }
    }
    await redisClient.disconnect();
    
  } catch (error) {
    next(error);
    await redisClient.quit();
  }

};