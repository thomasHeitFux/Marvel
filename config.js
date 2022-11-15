import md5 from 'md5';
// Toma los valores de la clave pública y provada desde el archivo .env
import { publicKey, privateKey } from '@env';
// const publicKey='4389b2712e4af592d7d260be9c1fa3ab'
// const privateKey='b1f20902c48927e8be96ee137dd67add40c72c21'

const ts = Date.now();
// Generamos el hash que nos pide la API pasandole como parámetro 
// a la función md5 un string que concatene el ts + privateKey + publicKey
const hash = md5(`${ts}${privateKey}${publicKey}`);

// Exportamos un objeto con los datos necesarios para usar la API
// para que luego podamos importarlo desde cualquier componente
const apiParams = {
  ts,
  apikey: publicKey,
  hash,
	baseURL: 'https://gateway.marvel.com'
};
export default apiParams;